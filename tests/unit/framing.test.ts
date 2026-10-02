import { PerspectiveCamera, Vector3 } from 'three';
import { describe, expect, it } from 'vitest';
import { CAMERA, GROUP, KEYS, POINTER, POINTS } from '../../src/lattice/config.ts';
import { shapedForms } from '../../src/lattice/forms/shaped.ts';
import { mulberry32 } from '../../src/lattice/forms/rng.ts';
import {
  cameraBasis,
  expand,
  fitFrame,
  freeRects,
  projectPoint,
  screenBox,
  type Frame,
  type FramingTables,
  type Rect,
  type View,
} from '../../src/lattice/framing.ts';
import { ORBIT_SAMPLES, P_HIGH, P_LOW, TABLE_COUNTS, TABLE_GRID, formTable, inCamera, posesFor, rankOf } from '../../src/lattice/framing-tables.ts';
import committed from '../../src/lattice/framing-tables.json';

const tables = committed as FramingTables;
const tan = Math.tan((CAMERA.fov * Math.PI) / 360);
const view = (width: number, height: number, distance: number): View => ({ width, height, focal: height / 2 / tan, distance, lift: CAMERA.height });

const overlaps = (a: Rect, b: Rect) => a.x0 < b.x1 && b.x0 < a.x1 && a.y0 < b.y1 && b.y0 < a.y1;
const inside = (outer: Rect, inner: Rect) => outer.x0 <= inner.x0 && outer.y0 <= inner.y0 && outer.x1 >= inner.x1 && outer.y1 >= inner.y1;
const dot = (a: readonly number[], b: readonly number[]) => a[0]! * b[0]! + a[1]! * b[1]! + a[2]! * b[2]!;

function measured(form: Float32Array, frame: Frame, v: View, yaw: number, pitch: number, orbit: number): Rect {
  const basis = cameraBasis(orbit, v.distance, v.lift);
  const { across, along, depth } = inCamera(form, yaw, pitch, basis);
  const centre = [frame.x - basis.eye[0], frame.y - basis.eye[1], -basis.eye[2]];
  const [cx, cy, cd] = [dot(centre, basis.right), dot(centre, basis.up), dot(centre, basis.forward)];
  const n = across.length;
  const xs = new Float64Array(n);
  const ys = new Float64Array(n);
  for (let i = 0; i < n; i++) {
    const d = cd + frame.scale * depth[i]!;
    xs[i] = v.width / 2 + (v.focal * (cx + frame.scale * across[i]!)) / d;
    ys[i] = v.height / 2 - (v.focal * (cy + frame.scale * along[i]!)) / d;
  }
  xs.sort();
  ys.sort();
  return { x0: xs[rankOf(n, P_LOW)]!, x1: xs[rankOf(n, P_HIGH)]!, y0: ys[rankOf(n, P_LOW)]!, y1: ys[rankOf(n, P_HIGH)]! };
}

describe('framing: camera', () => {
  it('projects exactly like a Three.js camera that orbits, rises and looks at the origin', () => {
    const v = view(1440, 900, 7.6);
    for (const orbit of [-0.12, 0, 0.07, 0.12]) {
      const camera = new PerspectiveCamera(CAMERA.fov, v.width / v.height, 0.1, 100);
      camera.position.set(Math.sin(orbit) * v.distance, v.lift, Math.cos(orbit) * v.distance);
      camera.lookAt(0, 0, 0);
      camera.updateMatrixWorld();
      for (const p of [
        [0, 0, 0],
        [1.8, -0.6, 1.2],
        [-2.4, 1.1, -0.9],
      ] as const) {
        const ndc = new Vector3(...p).project(camera);
        const [x, y] = projectPoint(p, v, orbit);
        expect(x).toBeCloseTo(((ndc.x + 1) / 2) * v.width, 6);
        expect(y).toBeCloseTo(((1 - ndc.y) / 2) * v.height, 6);
      }
    }
  });
});

describe('framing: percentile tables', () => {
  it('cover both point counts and every beat, on the generator grid', () => {
    expect(tables.grid).toEqual(TABLE_GRID);
    for (const count of TABLE_COUNTS) {
      expect(tables.counts[count], `${count} points`).toHaveLength(4);
      for (const beat of tables.counts[count]!) expect(beat.map((o) => o.orbit)).toEqual([...ORBIT_SAMPLES]);
    }
    expect(TABLE_COUNTS).toEqual([POINTS.desktop.count, POINTS.lowPower.count]);
  });

  it('match a fresh run of the generator for every beat and point count (run `npm run framing` after changing forms, keys or camera)', () => {
    for (const count of TABLE_COUNTS) {
      shapedForms(count).forEach((form, beat) => {
        const orbit = beat % ORBIT_SAMPLES.length;
        expect(formTable(form, beat, [ORBIT_SAMPLES[orbit]!]), `${count} points, beat ${beat}`).toEqual([tables.counts[count]![beat]![orbit]]);
      });
    }
  }, 30_000);

  it('bound the real 2nd–98th percentile box at any sway, pointer tilt and orbit, and stay within 2% of the sampled worst case', () => {
    const rng = mulberry32(11);
    const count = POINTS.lowPower.count;
    const forms = shapedForms(count);
    const views = [
      [390, 844],
      [844, 390],
      [1440, 900],
    ] as const;
    for (const [beat, form] of forms.entries()) {
      const table = tables.counts[count]![beat]!;
      const swing = (beat === 0 ? 0 : GROUP.swayAmplitude) + POINTER.tiltY;
      for (const [w, h] of views) {
        const v = view(w, h, KEYS.distance[beat]!);
        const frame = { scale: 0.35 + rng() * 0.4, x: (rng() - 0.5) * 1.6, y: (rng() - 0.5) * 0.8 };
        const model = screenBox(frame, table, tables.grid, v);
        const where = `beat ${beat} at ${w}×${h}`;
        for (let i = 0; i < 6; i++) {
          const yaw = beat * GROUP.turnPerForm + swing * (rng() * 2 - 1);
          const pitch = KEYS.tilt[beat]! + POINTER.tiltX * (rng() * 2 - 1);
          const orbit = CAMERA.orbitAmplitude * (rng() * 2 - 1);
          expect(inside(model, measured(form, frame, v, yaw, pitch, orbit)), where).toBe(true);
        }
        const worst = { x0: Infinity, y0: Infinity, x1: -Infinity, y1: -Infinity };
        for (const orbit of ORBIT_SAMPLES)
          for (const { yaw, pitch } of posesFor(beat)) {
            const box = measured(form, frame, v, yaw, pitch, orbit);
            worst.x0 = Math.min(worst.x0, box.x0);
            worst.y0 = Math.min(worst.y0, box.y0);
            worst.x1 = Math.max(worst.x1, box.x1);
            worst.y1 = Math.max(worst.y1, box.y1);
          }
        expect(inside(model, worst), where).toBe(true);
        const oversize = Math.max(worst.x0 - model.x0, model.x1 - worst.x1, worst.y0 - model.y0, model.y1 - worst.y1);
        expect(oversize / Math.max(worst.x1 - worst.x0, worst.y1 - worst.y0), where).toBeLessThan(0.02);
      }
    }
  });
});

describe('framing: free space', () => {
  it('splits the bounds into maximal rectangles that never touch an obstacle', () => {
    const bounds = { x0: 0, y0: 0, x1: 100, y1: 100 };
    const obstacles = [
      { x0: 40, y0: 40, x1: 60, y1: 60 },
      { x0: 80, y0: 0, x1: 100, y1: 30 },
    ];
    const free = freeRects(bounds, obstacles);
    for (const f of free) for (const o of obstacles) expect(overlaps(f, o)).toBe(false);
    for (let x = 0.5; x < 100; x += 3)
      for (let y = 0.5; y < 100; y += 3) {
        const blocked = obstacles.some((o) => x > o.x0 && x < o.x1 && y > o.y0 && y < o.y1);
        const covered = free.some((f) => x >= f.x0 && x <= f.x1 && y >= f.y0 && y <= f.y1);
        expect(covered).toBe(!blocked);
      }
  });
});

describe('framing: fitting', () => {
  const pxPerUnit = 100;
  const boxOf = (f: Frame): Rect => ({
    x0: 422 + (f.x - 1.5 * f.scale) * pxPerUnit,
    x1: 422 + (f.x + 1.5 * f.scale) * pxPerUnit,
    y0: 195 - (f.y + f.scale) * pxPerUnit,
    y1: 195 - (f.y - f.scale) * pxPerUnit,
  });
  const bounds = { x0: 0, y0: 60, x1: 844, y1: 390 };

  it('keeps the target when it already clears everything', () => {
    const target = { scale: 0.3, x: 0, y: 0 };
    expect(fitFrame(target, boxOf, pxPerUnit, bounds, [{ x0: 0, y0: 300, x1: 100, y1: 390 }])).toEqual(target);
  });

  it('shrinks and moves the form into free space when the copy or the rail is in the way', () => {
    const target = { scale: 1, x: 0, y: 0 };
    const obstacles = [expand({ x0: 20, y0: 200, x1: 480, y1: 330 }, 10), expand({ x0: 800, y0: 120, x1: 830, y1: 300 }, 10)];
    const frame = fitFrame(target, boxOf, pxPerUnit, bounds, obstacles);
    const box = boxOf(frame);
    expect(frame.scale).toBeLessThan(1);
    expect(inside(bounds, box)).toBe(true);
    for (const o of obstacles) expect(overlaps(o, box)).toBe(false);
  });

  it('grows the form to fill the largest free rectangle when the target is too big for it', () => {
    const frame = fitFrame({ scale: 3, x: 0, y: 0 }, boxOf, pxPerUnit, bounds, [{ x0: 0, y0: 240, x1: 844, y1: 390 }]);
    const box = boxOf(frame);
    expect(box.y0).toBeGreaterThanOrEqual(60);
    expect(box.y1).toBeLessThanOrEqual(240);
    expect(box.y1 - box.y0).toBeGreaterThan(179);
  });
});
