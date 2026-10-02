import { describe, expect, it } from 'vitest';
import { PerspectiveCamera, Vector3 } from 'three';
import { CAMERA, FINAL_DIST, LANDING, SEED, seedFor } from '../../src/lattice/config.ts';
import { drawnPosition } from '../../src/lattice/displace.ts';
import { d20 } from '../../src/lattice/forms/d20.ts';
import { network } from '../../src/lattice/forms/network.ts';
import { padlock } from '../../src/lattice/forms/padlock.ts';
import { mulberry32 } from '../../src/lattice/forms/rng.ts';
import { coherent } from '../../src/lattice/forms/sample.ts';
import { wordmark } from '../../src/lattice/forms/wordmark.ts';
import { KIND, sampleLanding, toWorld, type Box } from '../../src/lattice/landing.ts';

const N = 18000;

describe('rng', () => {
  it('gives the same sequence for the same seed', () => {
    const a = mulberry32(SEED);
    const b = mulberry32(SEED);
    const seqA = Array.from({ length: 1000 }, () => a());
    expect(Array.from({ length: 1000 }, () => b())).toEqual(seqA);
    expect(seqA.every((v) => v >= 0 && v < 1)).toBe(true);
  });

  it('matches the prototype generator for seed 20261002', () => {
    let seed = 20261002;
    const R = () => {
      seed |= 0;
      seed = (seed + 0x6d2b79f5) | 0;
      let t = Math.imul(seed ^ (seed >>> 15), 1 | seed);
      t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
      return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
    };
    const ours = mulberry32(SEED);
    for (let i = 0; i < 100; i++) expect(ours()).toBe(R());
  });

  it('gives different streams per form', () => {
    expect(mulberry32(seedFor('wordmark'))()).not.toBe(mulberry32(seedFor('d20'))());
  });
});

const forms = [
  { name: 'wordmark', make: wordmark, stream: 'wordmark', box: [3.2, 1.45, 0.6] },
  { name: 'd20', make: d20, stream: 'd20', box: [1.75, 1.75, 1.75] },
  { name: 'network', make: network, stream: 'network', box: [2.3, 1.75, 1.75] },
  { name: 'padlock', make: padlock, stream: 'padlock', box: [1.45, 1.55, 0.55] },
] as const;

describe('form generators', () => {
  it.each(forms)('$name returns exactly N × 3 finite values within its bounding box', ({ make, stream, box }) => {
    const out = make(N, mulberry32(seedFor(stream)));
    expect(out).toBeInstanceOf(Float32Array);
    expect(out.length).toBe(N * 3);
    for (let i = 0; i < out.length; i++) {
      expect(Number.isFinite(out[i])).toBe(true);
      expect(Math.abs(out[i]!)).toBeLessThanOrEqual(box[i % 3]!);
    }
  });

  it.each(forms)('$name is deterministic', ({ make, stream }) => {
    expect(make(2000, mulberry32(seedFor(stream)))).toEqual(make(2000, mulberry32(seedFor(stream))));
  });
});

describe('coherent', () => {
  it('returns a permutation of the input points', () => {
    const input = wordmark(5000, mulberry32(1));
    const output = coherent(input, mulberry32(2));
    const key = (a: Float32Array) =>
      Array.from({ length: a.length / 3 }, (_, i) => `${a[i * 3]},${a[i * 3 + 1]},${a[i * 3 + 2]}`).sort();
    expect(output.length).toBe(input.length);
    expect(key(output)).toEqual(key(input));
  });
});

describe('landing mapping', () => {
  const sizes = [
    [1440, 900],
    [390, 844],
    [1280, 720],
    [844, 390],
  ] as const;
  it.each(sizes)('a rectangle mapped to world space projects back within 0.5px at %i×%i', (w, h) => {
    const pin: Box = { left: 0, top: -2, right: w, bottom: h - 2, width: w, height: h };
    const rect: Box = { left: 47.3, top: 260.5, right: 481.9, bottom: 698.25, width: 434.6, height: 437.75 };
    const world = toWorld(rect, pin);
    const camera = new PerspectiveCamera(CAMERA.fov, w / h, CAMERA.near, CAMERA.far);
    camera.position.set(0, 0, FINAL_DIST);
    camera.lookAt(0, 0, 0);
    camera.updateMatrixWorld();
    const screen = (x: number, y: number) => {
      const v = new Vector3(x, y, 0).project(camera);
      return [pin.left + ((v.x + 1) / 2) * w, pin.top + ((1 - v.y) / 2) * h] as const;
    };
    const [left, top] = screen(world.x0, world.y1);
    const [right, bottom] = screen(world.x1, world.y0);
    expect(Math.abs(left - rect.left)).toBeLessThan(0.5);
    expect(Math.abs(top - rect.top)).toBeLessThan(0.5);
    expect(Math.abs(right - rect.right)).toBeLessThan(0.5);
    expect(Math.abs(bottom - rect.bottom)).toBeLessThan(0.5);
  });

  it('splits points 40% edges, 22% thumbnail fill and 38% text, and tags their owners', () => {
    const card = { x0: -2, x1: -0.5, y0: -1, y1: 1 };
    const thumb = { x0: -1.9, x1: -0.6, y0: 0.2, y1: 0.9 };
    const lines = [
      { x0: -1.9, x1: -0.9, y: 0, spread: 0.03, weight: LANDING.titleWeight },
      { x0: -1.9, x1: -0.6, y: -0.2, spread: 0.02, weight: 1 },
    ];
    const form = sampleLanding(10000, { cards: [{ card, thumb }], lines }, mulberry32(5));
    const count = (k: number) => form.kind.filter((x) => x === k).length;
    expect(count(KIND.cardEdge) + count(KIND.thumbEdge)).toBe(4000);
    expect(count(KIND.thumbFill)).toBe(2200);
    expect(count(KIND.text)).toBe(3800);
    expect([...form.owner].filter((_o, i) => form.kind[i] === KIND.text).every((o) => o === 0 || o === 1)).toBe(true);
  });
});

describe('drawn position (CPU mirror of the vertex shader)', () => {
  const n = 4;
  const fill = (v: number[]) => new Float32Array(Array.from({ length: n }, () => v).flat());
  const attrs = {
    position: fill([0, 0, 0]),
    aB: fill([1, 1, 1]),
    aC: fill([2, 2, 2]),
    aD: fill([3, 3, 3]),
    aE: new Float32Array([0.5, -0.25, 0, 1.25, 0.75, 0.01, -1, 0.3, -0.004, 0.2, 0.2, 0]),
    aStart: fill([9, 9, 9]),
    aRand: new Float32Array([0.1, 0.2, 0.3, 0.4, 0.9, 0.8, 0.7, 0.99, 0, 0.5, 0.5, 0.5, 1, 1, 1, 1]),
  };
  const landed = { morph: 4, intro: 1, time: 12.3, calm: 0, lock: 1, pointerX: 0, pointerY: 0, pointerStrength: 0 };

  it('puts every point exactly on its landing position once locked (DECISIONS 2.1)', () => {
    for (let i = 0; i < n; i++) {
      const [x, y, z] = drawnPosition(i, attrs, landed);
      expect(x).toBeCloseTo(attrs.aE[i * 3]!, 9);
      expect(y).toBeCloseTo(attrs.aE[i * 3 + 1]!, 9);
      expect(z).toBeCloseTo(attrs.aE[i * 3 + 2]!, 9);
    }
  });

  it('keeps the idle noise before the lock, as the prototype does', () => {
    const [x] = drawnPosition(0, attrs, { ...landed, lock: 0 });
    expect(Math.abs(x - attrs.aE[0]!)).toBeGreaterThan(1e-4);
  });

  it('starts every point on its start shell before the fly-in', () => {
    expect(drawnPosition(1, attrs, { ...landed, intro: 0 })).toEqual([9, 9, 9]);
  });
});
