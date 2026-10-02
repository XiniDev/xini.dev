import { WORDMARK } from '../config.ts';
import { LETTERS, WORDMARK_CENTRE, WORDMARK_SCALE } from './letters.ts';
import type { Rng } from './rng.ts';
import { fillPolygons, fillSegments, type Polygon, type Segment } from './sample.ts';

export function wordmark(n: number, rng: Rng): Float32Array {
  const out = new Float32Array(n * 3);
  const segs: Segment[] = [];
  const polys: Polygon[] = [];
  for (const letter of LETTERS) {
    const p: Polygon = letter.poly.map(([x, y]) => [
      (x + letter.dx - WORDMARK_CENTRE.x) * WORDMARK_SCALE,
      (y - WORDMARK_CENTRE.y) * WORDMARK_SCALE,
    ]);
    polys.push(p);
    for (let i = 0; i < p.length; i++) {
      const a = p[i]!;
      const b = p[(i + 1) % p.length]!;
      segs.push([a[0], a[1], 0, b[0], b[1], 0]);
    }
  }
  const edges = Math.floor(n * WORDMARK.edgeShare);
  fillSegments(out, 0, edges, segs, rng, WORDMARK.edgeJitter, WORDMARK.edgeZJitter);
  fillPolygons(out, edges, n - edges, polys, rng, WORDMARK.fillZJitter, WORDMARK.maxTries);
  return out;
}
