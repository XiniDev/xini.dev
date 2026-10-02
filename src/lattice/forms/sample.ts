import { COHERENT } from '../config.ts';
import type { Rng } from './rng.ts';

export type Vec3 = [number, number, number];
export type Segment = [number, number, number, number, number, number];
export type Triangle = [Vec3, Vec3, Vec3];
export type Polygon = [number, number][];

export function cumulative(weights: number[]): number[] {
  const total = weights.reduce((a, b) => a + b, 0);
  let acc = 0;
  return weights.map((w) => (acc += w) / total);
}

export function pick(cum: number[], rng: Rng): number {
  const u = rng();
  let lo = 0;
  let hi = cum.length - 1;
  while (lo < hi) {
    const mid = (lo + hi) >> 1;
    if (cum[mid]! < u) lo = mid + 1;
    else hi = mid;
  }
  return lo;
}

export function fillSegments(
  out: Float32Array,
  start: number,
  count: number,
  segs: Segment[],
  rng: Rng,
  jitter: number,
  zJitter = jitter,
  picked?: Uint32Array,
): void {
  const cum = cumulative(segs.map((s) => Math.hypot(s[3] - s[0], s[4] - s[1], s[5] - s[2])));
  for (let i = 0; i < count; i++) {
    const index = pick(cum, rng);
    const s = segs[index]!;
    const t = rng();
    const j = (start + i) * 3;
    out[j] = s[0] + (s[3] - s[0]) * t + rng.gauss() * jitter;
    out[j + 1] = s[1] + (s[4] - s[1]) * t + rng.gauss() * jitter;
    out[j + 2] = s[2] + (s[5] - s[2]) * t + rng.gauss() * zJitter;
    if (picked) picked[start + i] = index;
  }
}

export function fillClusters(out: Float32Array, start: number, count: number, centres: Vec3[], rng: Rng, sigma: number): void {
  for (let i = 0; i < count; i++) {
    const c = centres[Math.floor(rng() * centres.length)]!;
    const j = (start + i) * 3;
    out[j] = c[0] + rng.gauss() * sigma;
    out[j + 1] = c[1] + rng.gauss() * sigma;
    out[j + 2] = c[2] + rng.gauss() * sigma;
  }
}

const triangleArea = ([a, b, c]: Triangle) => {
  const ax = b[0] - a[0];
  const ay = b[1] - a[1];
  const az = b[2] - a[2];
  const bx = c[0] - a[0];
  const by = c[1] - a[1];
  const bz = c[2] - a[2];
  return Math.hypot(ay * bz - az * by, az * bx - ax * bz, ax * by - ay * bx);
};

export function fillTriangles(out: Float32Array, start: number, count: number, tris: Triangle[], rng: Rng, jitter: number): void {
  const cum = cumulative(tris.map(triangleArea));
  for (let i = 0; i < count; i++) {
    const t = tris[pick(cum, rng)]!;
    let a = rng();
    let b = rng();
    if (a + b > 1) {
      a = 1 - a;
      b = 1 - b;
    }
    const j = (start + i) * 3;
    for (let k = 0; k < 3; k++) {
      out[j + k] = t[0][k]! + (t[1][k]! - t[0][k]!) * a + (t[2][k]! - t[0][k]!) * b + rng.gauss() * jitter;
    }
  }
}

export function inPolygon(x: number, y: number, p: Polygon): boolean {
  let inside = false;
  for (let i = 0, j = p.length - 1; i < p.length; j = i++) {
    const [xi, yi] = p[i]!;
    const [xj, yj] = p[j]!;
    if (yi > y !== yj > y && x < ((xj - xi) * (y - yi)) / (yj - yi) + xi) inside = !inside;
  }
  return inside;
}

export function polygonArea(p: Polygon): number {
  let a = 0;
  for (let i = 0, j = p.length - 1; i < p.length; j = i++) a += (p[j]![0] + p[i]![0]) * (p[j]![1] - p[i]![1]);
  return Math.abs(a / 2);
}

export function fillPolygons(
  out: Float32Array,
  start: number,
  count: number,
  polys: Polygon[],
  rng: Rng,
  zJitter: number,
  maxTries: number,
): void {
  const cum = cumulative(polys.map(polygonArea));
  const boxes = polys.map((p) => {
    const xs = p.map((q) => q[0]);
    const ys = p.map((q) => q[1]);
    return [Math.min(...xs), Math.max(...xs), Math.min(...ys), Math.max(...ys)] as const;
  });
  for (let i = 0; i < count; i++) {
    const index = pick(cum, rng);
    const p = polys[index]!;
    const [x0, x1, y0, y1] = boxes[index]!;
    let x = 0;
    let y = 0;
    let tries = 0;
    do {
      x = x0 + rng() * (x1 - x0);
      y = y0 + rng() * (y1 - y0);
    } while (!inPolygon(x, y, p) && ++tries < maxTries);
    const j = (start + i) * 3;
    out[j] = x;
    out[j + 1] = y;
    out[j + 2] = rng.gauss() * zJitter;
  }
}

export function coherentOrder(positions: Float32Array, rng: Rng): Uint32Array {
  const n = positions.length / 3;
  const key = new Float32Array(n);
  const order = new Uint32Array(n);
  for (let i = 0; i < n; i++) {
    order[i] = i;
    key[i] = positions[i * 3]! + positions[i * 3 + 1]! * COHERENT.yWeight + rng.gauss() * COHERENT.noise;
  }
  return order.sort((a, b) => key[a]! - key[b]!);
}

export function reorder<T extends Float32Array | Uint8Array | Uint16Array>(data: T, order: Uint32Array, stride: number): T {
  const out = new (data.constructor as new (length: number) => T)(data.length);
  for (let i = 0; i < order.length; i++) {
    const from = order[i]! * stride;
    for (let k = 0; k < stride; k++) out[i * stride + k] = data[from + k]!;
  }
  return out;
}

export function coherent(positions: Float32Array, rng: Rng): Float32Array {
  return reorder(positions, coherentOrder(positions, rng), 3);
}
