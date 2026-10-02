import { CAMERA, GROUP, KEYS, POINTER, POINTS, SHADER } from './config.ts';
import { cameraBasis, type FramingTables, type Grid, type OrbitTable, type Support } from './framing.ts';
import { shapedForms } from './forms/shaped.ts';

export const TABLE_GRID = {
  x: { from: -1.15, step: 0.05, count: 47 },
  y: { from: -0.35, step: 0.05, count: 15 },
} as const satisfies FramingTables['grid'];
export const TABLE_COUNTS = [POINTS.desktop.count, POINTS.lowPower.count] as const;
export const SWAY_SAMPLES = 13;
export const ORBIT_SAMPLES = [-CAMERA.orbitAmplitude, 0, CAMERA.orbitAmplitude] as const;
export const P_LOW = 0.02;
export const P_HIGH = 0.98;

const CHUNK = 6;
const PRECISION = 1e4;
const NOISE_REACH = SHADER.idleNoise * Math.sqrt(3);

export const rankOf = (n: number, p: number) => Math.round((n - 1) * p);

export function select(values: Float32Array, k: number): number {
  let lo = 0;
  let hi = values.length - 1;
  while (hi > lo) {
    const pivot = values[(lo + hi) >> 1]!;
    let i = lo;
    let j = hi;
    while (i <= j) {
      while (values[i]! < pivot) i++;
      while (values[j]! > pivot) j--;
      if (i <= j) {
        const swap = values[i]!;
        values[i++] = values[j]!;
        values[j--] = swap;
      }
    }
    if (k <= j) hi = j;
    else if (k >= i) lo = i;
    else break;
  }
  return values[k]!;
}

export function posesFor(beat: number) {
  const swing = (beat === 0 ? 0 : GROUP.swayAmplitude) + POINTER.tiltY;
  const yaws = Array.from({ length: SWAY_SAMPLES }, (_, i) => beat * GROUP.turnPerForm + swing * ((2 * i) / (SWAY_SAMPLES - 1) - 1));
  return yaws.flatMap((yaw) => [-POINTER.tiltX, 0, POINTER.tiltX].map((dx) => ({ yaw, pitch: KEYS.tilt[beat]! + dx })));
}

export function inCamera(form: Float32Array, yaw: number, pitch: number, basis: ReturnType<typeof cameraBasis>) {
  const n = form.length / 3;
  const across = new Float32Array(n);
  const along = new Float32Array(n);
  const depth = new Float32Array(n);
  const [cy, sy, cp, sp] = [Math.cos(yaw), Math.sin(yaw), Math.cos(pitch), Math.sin(pitch)];
  const { right, up, forward } = basis;
  for (let i = 0; i < n; i++) {
    const x = form[i * 3]!;
    const y = form[i * 3 + 1]!;
    const z = form[i * 3 + 2]!;
    const turned = -x * sy + z * cy;
    const w = [x * cy + z * sy, y * cp - turned * sp, y * sp + turned * cp] as const;
    across[i] = w[0] * right[0] + w[1] * right[1] + w[2] * right[2];
    along[i] = w[0] * up[0] + w[1] * up[1] + w[2] * up[2];
    depth[i] = w[0] * forward[0] + w[1] * forward[1] + w[2] * forward[2];
  }
  return { across, along, depth };
}

function support(lateral: Float32Array, depth: Float32Array, grid: Grid, out: Support) {
  const n = lateral.length;
  const kHi = rankOf(n, P_HIGH);
  const kLo = rankOf(n, P_LOW);
  const low = new Float32Array(n);
  const high = new Float32Array(n);
  const at = (i: number) => grid.from + i * grid.step;
  for (let first = 0; first < grid.count; first += CHUNK - 1) {
    const last = Math.min(grid.count - 1, first + CHUNK - 1);
    const [ta, tb] = [at(first), at(last)];
    for (let i = 0; i < n; i++) {
      const a = lateral[i]! - ta * depth[i]!;
      const b = lateral[i]! - tb * depth[i]!;
      low[i] = Math.min(a, b);
      high[i] = Math.max(a, b);
    }
    const floorHi = select(Float32Array.from(low), kHi);
    const ceilLo = select(Float32Array.from(high), kLo);
    const upper: number[] = [];
    const lower: number[] = [];
    for (let i = 0; i < n; i++) {
      if (high[i]! >= floorHi) upper.push(i);
      if (low[i]! <= ceilLo) lower.push(i);
    }
    const values = new Float32Array(Math.max(upper.length, lower.length));
    for (let g = first; g <= last; g++) {
      const t = at(g);
      const reach = NOISE_REACH * Math.hypot(1, t);
      const hiValues = values.subarray(0, upper.length);
      upper.forEach((i, j) => (hiValues[j] = lateral[i]! - t * depth[i]!));
      const hi = select(hiValues, upper.length - (n - kHi)) + reach;
      const loValues = values.subarray(0, lower.length);
      lower.forEach((i, j) => (loValues[j] = lateral[i]! - t * depth[i]!));
      const lo = select(loValues, kLo) - reach;
      out.hi[g] = Math.max(out.hi[g] ?? -Infinity, hi);
      out.lo[g] = Math.min(out.lo[g] ?? Infinity, lo);
    }
  }
}

export function formTable(form: Float32Array, beat: number, orbits: readonly number[] = ORBIT_SAMPLES): OrbitTable[] {
  return orbits.map((orbit) => {
    const basis = cameraBasis(orbit, KEYS.distance[beat]!, CAMERA.height);
    const x: Support = { hi: [], lo: [] };
    const y: Support = { hi: [], lo: [] };
    for (const { yaw, pitch } of posesFor(beat)) {
      const { across, along, depth } = inCamera(form, yaw, pitch, basis);
      support(across, depth, TABLE_GRID.x, x);
      support(along, depth, TABLE_GRID.y, y);
    }
    const round = (s: Support): Support => ({
      hi: s.hi.map((v) => Math.ceil(v * PRECISION) / PRECISION),
      lo: s.lo.map((v) => Math.floor(v * PRECISION) / PRECISION),
    });
    return { orbit, x: round(x), y: round(y) };
  });
}

export function buildTables(): FramingTables {
  const counts: FramingTables['counts'] = {};
  for (const count of TABLE_COUNTS) counts[count] = shapedForms(count).map((form, beat) => formTable(form, beat));
  return { grid: TABLE_GRID, counts };
}
