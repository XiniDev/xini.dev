import { CAMERA, FINAL_DIST, LANDING } from './config.ts';
import type { Rng } from './forms/rng.ts';
import { cumulative, fillSegments, pick, type Segment } from './forms/sample.ts';

export type Box = { left: number; top: number; right: number; bottom: number; width: number; height: number };
export type WorldRect = { x0: number; x1: number; y0: number; y1: number };
export type LandingLine = { x0: number; x1: number; y: number; spread: number; weight: number };
export type LandingInput = { cards: { card: WorldRect; thumb?: WorldRect }[]; lines: LandingLine[] };
export type LandingScreen = { pin: Box; cards: { card: Box; thumb?: Box }[]; lines: Box[] };
export type LandingForm = { positions: Float32Array; kind: Uint8Array; owner: Uint16Array };

export const KIND = { cardEdge: 0, thumbEdge: 1, thumbFill: 2, text: 3 } as const;

export const halfHeight = () => FINAL_DIST * Math.tan((CAMERA.fov * Math.PI) / 360);

export function toWorld(r: Box, pin: Box): WorldRect {
  const hh = halfHeight();
  const hw = hh * (pin.width / pin.height);
  return {
    x0: (((r.left - pin.left) / pin.width) * 2 - 1) * hw,
    x1: (((r.right - pin.left) / pin.width) * 2 - 1) * hw,
    y0: -(((r.bottom - pin.top) / pin.height) * 2 - 1) * hh,
    y1: -(((r.top - pin.top) / pin.height) * 2 - 1) * hh,
  };
}

const rectEdges = (w: WorldRect): Segment[] => [
  [w.x0, w.y0, 0, w.x1, w.y0, 0],
  [w.x1, w.y0, 0, w.x1, w.y1, 0],
  [w.x1, w.y1, 0, w.x0, w.y1, 0],
  [w.x0, w.y1, 0, w.x0, w.y0, 0],
];

export function sampleLanding(n: number, input: LandingInput, rng: Rng): LandingForm {
  const positions = new Float32Array(n * 3);
  const kind = new Uint8Array(n);
  const owner = new Uint16Array(n);
  const segs: Segment[] = [];
  const segKind: number[] = [];
  const segOwner: number[] = [];
  const fills: { rect: WorldRect; owner: number }[] = [];

  input.cards.forEach(({ card, thumb }, c) => {
    for (const s of rectEdges(card)) {
      segs.push(s);
      segKind.push(KIND.cardEdge);
      segOwner.push(c);
    }
    if (thumb) {
      for (const s of rectEdges(thumb)) {
        segs.push(s);
        segKind.push(KIND.thumbEdge);
        segOwner.push(c);
      }
      fills.push({ rect: thumb, owner: c });
    }
  });
  if (!segs.length) return { positions, kind, owner };

  const lines = input.lines;
  const nE = lines.length ? Math.floor(n * LANDING.edgeShare) : n - (fills.length ? Math.floor(n * LANDING.fillShare) : 0);
  const nF = fills.length ? Math.floor(n * LANDING.fillShare) : 0;
  const nT = n - nE - nF;

  const picked = new Uint32Array(n);
  fillSegments(positions, 0, nE, segs, rng, LANDING.edgeJitter, LANDING.edgeZJitter, picked);
  for (let i = 0; i < nE; i++) {
    kind[i] = segKind[picked[i]!]!;
    owner[i] = segOwner[picked[i]!]!;
  }

  for (let i = 0; i < nF; i++) {
    const f = fills[Math.floor(rng() * fills.length)]!;
    const j = (nE + i) * 3;
    positions[j] = f.rect.x0 + rng() * (f.rect.x1 - f.rect.x0);
    positions[j + 1] = f.rect.y0 + rng() * (f.rect.y1 - f.rect.y0);
    positions[j + 2] = rng.gauss() * LANDING.fillZJitter;
    kind[nE + i] = KIND.thumbFill;
    owner[nE + i] = f.owner;
  }

  if (nT > 0) {
    const cum = cumulative(lines.map((l) => (l.x1 - l.x0) * l.weight));
    for (let i = 0; i < nT; i++) {
      const index = pick(cum, rng);
      const l = lines[index]!;
      const j = (nE + nF + i) * 3;
      positions[j] = l.x0 + rng() * (l.x1 - l.x0);
      positions[j + 1] = l.y + (rng() - 0.5) * 2 * l.spread;
      positions[j + 2] = rng.gauss() * LANDING.textZJitter;
      kind[nE + nF + i] = KIND.text;
      owner[nE + nF + i] = index;
    }
  }
  return { positions, kind, owner };
}

const plain = (r: DOMRect): Box => ({ left: r.left, top: r.top, right: r.right, bottom: r.bottom, width: r.width, height: r.height });

export function readLanding(pinEl: HTMLElement, featuredEl: HTMLElement): { input: LandingInput; screen: LandingScreen } {
  const pin = plain(pinEl.getBoundingClientRect());
  const input: LandingInput = { cards: [], lines: [] };
  const screen: LandingScreen = { pin, cards: [], lines: [] };

  for (const cardEl of featuredEl.querySelectorAll<HTMLElement>('.fcard')) {
    const card = plain(cardEl.getBoundingClientRect());
    const thumbEl = cardEl.querySelector('.fthumb');
    const thumb = thumbEl && thumbEl.getClientRects().length ? plain(thumbEl.getBoundingClientRect()) : undefined;
    input.cards.push(thumb ? { card: toWorld(card, pin), thumb: toWorld(thumb, pin) } : { card: toWorld(card, pin) });
    screen.cards.push(thumb ? { card, thumb } : { card });

    const walker = document.createTreeWalker(cardEl, NodeFilter.SHOW_TEXT);
    for (let node = walker.nextNode(); node; node = walker.nextNode()) {
      const parent = node.parentElement;
      if (!parent || !node.textContent?.trim()) continue;
      const box = parent.getBoundingClientRect();
      if (box.width <= 1 || box.height <= 1) continue;
      const title = parent.closest('h3') !== null;
      const range = document.createRange();
      range.selectNodeContents(node);
      for (const rect of range.getClientRects()) {
        if (rect.width < LANDING.minLineWidth) continue;
        const w = toWorld(rect, pin);
        input.lines.push({
          x0: w.x0,
          x1: w.x1,
          y: (w.y0 + w.y1) / 2,
          spread: (w.y1 - w.y0) * (title ? LANDING.titleSpread : LANDING.textSpread),
          weight: title ? LANDING.titleWeight : 1,
        });
        screen.lines.push(plain(rect));
      }
    }
  }
  return { input, screen };
}
