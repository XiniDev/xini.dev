import { NETWORK } from '../config.ts';
import type { Rng } from './rng.ts';
import { fillClusters, fillSegments, type Segment, type Vec3 } from './sample.ts';

export function network(n: number, rng: Rng): Float32Array {
  const out = new Float32Array(n * 3);
  const nodes: Vec3[][] = NETWORK.layers.map((layer, li) =>
    Array.from({ length: layer.count }, (_, i) => {
      const a = (i / layer.count) * Math.PI * 2 + li * NETWORK.layerTwist;
      return [layer.x, Math.cos(a) * layer.radius, Math.sin(a) * layer.radius] as Vec3;
    }),
  );
  const segs: Segment[] = [];
  for (let l = 0; l < nodes.length - 1; l++) {
    for (const a of nodes[l]!) for (const b of nodes[l + 1]!) segs.push([...a, ...b]);
  }
  const nE = Math.floor(n * NETWORK.edgeShare);
  fillSegments(out, 0, nE, segs, rng, NETWORK.edgeJitter);
  fillClusters(out, nE, n - nE, nodes.flat(), rng, NETWORK.nodeSigma);
  return out;
}
