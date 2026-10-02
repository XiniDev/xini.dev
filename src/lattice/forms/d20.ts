import { D20 } from '../config.ts';
import type { Rng } from './rng.ts';
import { fillClusters, fillSegments, fillTriangles, type Segment, type Triangle, type Vec3 } from './sample.ts';

export function d20(n: number, rng: Rng): Float32Array {
  const out = new Float32Array(n * 3);
  const t = (1 + Math.sqrt(5)) / 2;
  const r = D20.circumradius / Math.hypot(1, t);
  const raw: Vec3[] = [
    [-1, t, 0],
    [1, t, 0],
    [-1, -t, 0],
    [1, -t, 0],
    [0, -1, t],
    [0, 1, t],
    [0, -1, -t],
    [0, 1, -t],
    [t, 0, -1],
    [t, 0, 1],
    [-t, 0, -1],
    [-t, 0, 1],
  ];
  const v = raw.map((p) => p.map((c) => c * r) as Vec3);
  const edgeLength = 2 * r;
  const adjacent = (i: number, j: number) =>
    Math.abs(Math.hypot(v[i]![0] - v[j]![0], v[i]![1] - v[j]![1], v[i]![2] - v[j]![2]) - edgeLength) < D20.tolerance;
  const edges: Segment[] = [];
  const faces: Triangle[] = [];
  for (let i = 0; i < 12; i++) {
    for (let j = i + 1; j < 12; j++) {
      if (adjacent(i, j)) edges.push([...v[i]!, ...v[j]!]);
      for (let k = j + 1; k < 12; k++) {
        if (adjacent(i, j) && adjacent(j, k) && adjacent(i, k)) faces.push([v[i]!, v[j]!, v[k]!]);
      }
    }
  }
  const nE = Math.floor(n * D20.edgeShare);
  const nV = Math.floor(n * D20.vertexShare);
  fillSegments(out, 0, nE, edges, rng, D20.edgeJitter);
  fillClusters(out, nE, nV, v, rng, D20.vertexSigma);
  fillTriangles(out, nE + nV, n - nE - nV, faces, rng, D20.faceJitter);
  return out;
}
