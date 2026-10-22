// Shared helpers for the v5.1 checks: the v5 helpers, plus pages at a device pixel ratio, the reference playground,
// the panel's measurements, and image alignment (done in a page, on canvases).
import { readFileSync, mkdirSync } from 'node:fs';
import { BASE, SIZES } from '../v5/lib.mjs';

export { launch, goTo, BASE, SIZES } from '../v5/lib.mjs';
export const REF = `${BASE}reference/hero-6a/index.html`;
export const out = (dir) => { mkdirSync(dir, { recursive: true }); return dir; };

/** the site at a size and pixel ratio, ready and out of the boot, the pointer's sway off */
export async function open(browser, { size = 'desktop', dpr = 1, query = '?skipintro' } = {}) {
  const [width, height] = Array.isArray(size) ? size : SIZES[size];
  const context = await browser.newContext({ viewport: { width, height }, deviceScaleFactor: dpr });
  const page = await context.newPage();
  const errors = [];
  page.on('pageerror', (e) => errors.push(String(e)));
  page.on('console', (m) => { if (m.type() === 'error') errors.push(m.text()); });
  await page.goto(BASE + query, { waitUntil: 'load' });
  await page.waitForFunction(() => window.__xini?.ready && !document.documentElement.classList.contains('booting'), null, { timeout: 60000 });
  await page.evaluate(() => window.__xini.sway(false));
  return { page, context, errors };
}

/** the reference playground (reference/hero-6a/index.html) */
export async function openRef(browser, { size, dpr = 1, query = '?static=1&shot=1' }) {
  const context = await browser.newContext({ viewport: { width: size[0], height: size[1] }, deviceScaleFactor: dpr });
  const page = await context.newPage();
  await page.goto(REF + query, { waitUntil: 'load' });
  await page.waitForFunction(() => document.documentElement.dataset.ready === '1', null, { timeout: 30000 });
  await page.waitForTimeout(300);
  return { page, context };
}

/** wait until nothing animates inside the panel or its leader */
export const settled = (page, timeout = 4000) => page.waitForFunction(() => {
  const h = window.__xini?.hero ?? window.hero;
  return !document.getAnimations().some((a) => { const t = a.effect?.target; return t && (h.root.contains(t) || h.leader.contains(t)); });
}, null, { timeout });

/** the panel's parts on screen (works on the site and on the playground) */
export const measure = (page) => page.evaluate(() => {
  const h = window.__xini?.hero ?? window.hero, r = (e) => { const b = e.getBoundingClientRect(); return [b.left, b.top, b.width, b.height].map((v) => +v.toFixed(2)); };
  const q = (s) => h.root.querySelector(s);
  const parts = {
    frame: r(h.root), label: r(q('.h6__label')), role: r(q('.h6__role')), rule: r(q('.h6__rule')), pwr: r(q('.h6__pwr')), name: r(q('.h6__name-face')),
    lockup: r(q('.h6__lk')), spec: r(q('.h6__spec span:last-child')), runA: r(h.root.querySelectorAll('.h6__run')[0]), runB: r(h.root.querySelectorAll('.h6__run')[1]),
    padTR: r(q('[data-pad="tr"]')), padBL: r(q('[data-pad="bl"]')),
    ...Object.fromEntries([...h.root.querySelectorAll('.h6-corner')].map((g) => [`corner_${g.dataset.c}`, r(g)])),
  };
  const ring = h.leader.querySelector('.h6-leader__ring');
  const d = h.leader.querySelector('.h6-leader__trace').getAttribute('d') || '';
  return { parts, ring: [+ring.getAttribute('cx'), +ring.getAttribute('cy'), +ring.getAttribute('r')], trace: d, k: h.state.k, compact: h.state.compact,
    wrap: h.root.classList.contains('h6--wrap'), hidden: h.root.hasAttribute('hidden'), leaderHidden: h.leader.hasAttribute('hidden') };
});

/** the trace's corner points, from its path (M, L, H, V only) */
export function tracePoints(d) {
  const pts = []; let x = 0, y = 0;
  for (const [, c, a] of d.matchAll(/([MLHV])\s*([-\d.e]+(?:\s+[-\d.e]+)?)/g)) {
    const n = a.trim().split(/\s+/).map(Number);
    if (c === 'M' || c === 'L') [x, y] = n; else if (c === 'H') x = n[0]; else y = n[0];
    pts.push([x, y]);
  }
  return pts;
}

/**
 * Align image B to image A over a region: the shift (dx, dy) of B's content against A's that matches best (mean
 * absolute luminance difference), searched over [-s, s]². Both PNGs the same size. Runs in `page` (any page).
 */
export function align(page, fileA, fileB, region, s = 8, expect = [0, 0]) {
  const A = readFileSync(fileA).toString('base64'), B = readFileSync(fileB).toString('base64');
  return page.evaluate(async ({ A, B, region, s, expect }) => {
    const lum = async (b64) => {
      const im = new Image(); im.src = `data:image/png;base64,${b64}`; await im.decode();
      const c = new OffscreenCanvas(im.width, im.height), g = c.getContext('2d'); g.drawImage(im, 0, 0);
      const d = g.getImageData(0, 0, im.width, im.height).data, L = new Float32Array(im.width * im.height);
      for (let i = 0; i < L.length; i++) L[i] = 0.2126 * d[4 * i] + 0.7152 * d[4 * i + 1] + 0.0722 * d[4 * i + 2];
      return { L, w: im.width, h: im.height };
    };
    const a = await lum(A), b = await lum(B);
    const [x0, y0, w, h] = region.map(Math.round);
    const score = (dx, dy) => {
      let sum = 0, n = 0;
      for (let y = y0; y < y0 + h; y += 2) for (let x = x0; x < x0 + w; x += 2) {
        const xb = x + dx, yb = y + dy;
        if (x < 0 || y < 0 || x >= a.w || y >= a.h || xb < 0 || yb < 0 || xb >= b.w || yb >= b.h) continue;
        sum += Math.abs(a.L[y * a.w + x] - b.L[yb * b.w + xb]); n++;
      }
      return n ? sum / n : Infinity;
    };
    let best = { dx: 0, dy: 0, err: Infinity };
    for (let dy = expect[1] - s; dy <= expect[1] + s; dy++) for (let dx = expect[0] - s; dx <= expect[0] + s; dx++) {
      const e = score(dx, dy); if (e < best.err) best = { dx, dy, err: e };
    }
    return { ...best, atExpect: score(Math.round(expect[0]), Math.round(expect[1])) };
  }, { A, B, region, s, expect });
}
