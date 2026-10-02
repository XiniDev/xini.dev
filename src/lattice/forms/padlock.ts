import { PADLOCK } from '../config.ts';
import type { Rng } from './rng.ts';
import { fillSegments, type Segment, type Vec3 } from './sample.ts';

export function padlock(n: number, rng: Rng): Float32Array {
  const out = new Float32Array(n * 3);
  const { width: w, height: h, depth: d, bodyY: by } = PADLOCK;
  const x0 = -w / 2;
  const x1 = w / 2;
  const y0 = by - h / 2;
  const y1 = by + h / 2;
  const z0 = -d / 2;
  const z1 = d / 2;
  const c: Vec3[] = [
    [x0, y0, z0],
    [x1, y0, z0],
    [x1, y1, z0],
    [x0, y1, z0],
    [x0, y0, z1],
    [x1, y0, z1],
    [x1, y1, z1],
    [x0, y1, z1],
  ];
  const corners: [number, number][] = [
    [0, 1], [1, 2], [2, 3], [3, 0], [4, 5], [5, 6], [6, 7], [7, 4], [0, 4], [1, 5], [2, 6], [3, 7],
  ];
  const body: Segment[] = corners.map(([a, b]) => [...c[a]!, ...c[b]!] as Segment);

  const sr = PADLOCK.shackleRadius;
  const sy = y1 + PADLOCK.shackleRise;
  const path: Vec3[] = [
    [-sr, y1, 0],
    [-sr, sy, 0],
  ];
  for (let i = 1; i <= PADLOCK.shackleSteps; i++) {
    const a = Math.PI - Math.PI * (i / PADLOCK.shackleSteps);
    path.push([Math.cos(a) * sr, sy + Math.sin(a) * sr, 0]);
  }
  path.push([sr, y1, 0]);
  const shackle: Segment[] = [];
  for (let i = 0; i < path.length - 1; i++) shackle.push([...path[i]!, ...path[i + 1]!]);

  const k = PADLOCK.key;
  const ky = by + k.y;
  const kz = z1 + k.z;
  const key: Segment[] = [];
  for (let i = 0; i < k.steps; i++) {
    const a0 = (i / k.steps) * Math.PI * 2 + k.phase;
    const a1 = ((i + 1) / k.steps) * Math.PI * 2 + k.phase;
    if (a0 > k.gapFrom * Math.PI && a0 < k.gapTo * Math.PI) continue;
    key.push([Math.cos(a0) * k.radius, ky + Math.sin(a0) * k.radius, kz, Math.cos(a1) * k.radius, ky + Math.sin(a1) * k.radius, kz]);
  }
  const s = PADLOCK.slot;
  key.push(
    [-s.inner, ky - s.top, kz, -s.outer, ky - s.bottom, kz],
    [s.inner, ky - s.top, kz, s.outer, ky - s.bottom, kz],
    [-s.outer, ky - s.bottom, kz, s.outer, ky - s.bottom, kz],
  );

  const nB = Math.floor(n * PADLOCK.bodyShare);
  const nF = Math.floor(n * PADLOCK.faceShare);
  const nS = Math.floor(n * PADLOCK.shackleShare);
  fillSegments(out, 0, nB, body, rng, PADLOCK.bodyJitter);
  for (let i = 0; i < nF; i++) {
    const j = (nB + i) * 3;
    out[j] = x0 + rng() * w;
    out[j + 1] = y0 + rng() * h;
    out[j + 2] = z1 + rng.gauss() * PADLOCK.faceZJitter;
  }
  fillSegments(out, nB + nF, nS, shackle, rng, 0);
  for (let i = nB + nF; i < nB + nF + nS; i++) {
    const j = i * 3;
    const a = rng() * Math.PI * 2;
    const tube = PADLOCK.tube + rng.gauss() * PADLOCK.tubeJitter;
    const px = out[j]!;
    const py = out[j + 1]!;
    if (py > sy) {
      const ang = Math.atan2(py - sy, px);
      out[j] = px + Math.cos(ang) * Math.cos(a) * tube;
      out[j + 1] = py + Math.sin(ang) * Math.cos(a) * tube;
    } else {
      out[j] = px + Math.cos(a) * tube;
    }
    out[j + 2] = out[j + 2]! + Math.sin(a) * tube;
  }
  fillSegments(out, nB + nF + nS, n - nB - nF - nS, key, rng, PADLOCK.keyJitter, PADLOCK.keyZJitter);
  return out;
}
