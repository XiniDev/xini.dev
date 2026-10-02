import { SHADER } from './config.ts';

export type DisplaceUniforms = {
  morph: number;
  intro: number;
  time: number;
  calm: number;
  lock: number;
  pointerX: number;
  pointerY: number;
  pointerStrength: number;
};

export type DisplaceAttributes = {
  position: ArrayLike<number>;
  aB: ArrayLike<number>;
  aC: ArrayLike<number>;
  aD: ArrayLike<number>;
  aE: ArrayLike<number>;
  aStart: ArrayLike<number>;
  aRand: ArrayLike<number>;
};

const clamp01 = (x: number) => Math.min(1, Math.max(0, x));
const smoothstep = (e0: number, e1: number, x: number) => {
  const t = clamp01((x - e0) / (e1 - e0));
  return t * t * (3 - 2 * t);
};
const stagger = (x: number, r: number) => smoothstep(0, 1, clamp01((x - r * SHADER.staggerSpread) / SHADER.staggerWindow));
const mix = (a: number, b: number, t: number) => a + (b - a) * t;
const TAU = Math.PI * 2;

export function drawnPosition(i: number, a: DisplaceAttributes, u: DisplaceUniforms): [number, number, number] {
  const j = i * 3;
  const k = i * 4;
  const r = a.aRand[k]!;
  const ry = a.aRand[k + 1]!;
  const rz = a.aRand[k + 2]!;
  const rw = a.aRand[k + 3]!;
  const e = [stagger(u.morph, r), stagger(u.morph - 1, r), stagger(u.morph - 2, r), stagger(u.morph - 3, r)] as const;
  const forms = [a.position, a.aB, a.aC, a.aD, a.aE];
  let x = forms[0]![j]!;
  let y = forms[0]![j + 1]!;
  let z = forms[0]![j + 2]!;
  for (let f = 0; f < 4; f++) {
    const next = forms[f + 1]!;
    x = mix(x, next[j]!, e[f]);
    y = mix(y, next[j + 1]!, e[f]);
    z = mix(z, next[j + 2]!, e[f]);
  }

  const turb = (Math.sin(Math.PI * e[0]) + Math.sin(Math.PI * e[1]) + Math.sin(Math.PI * e[2]) + Math.sin(Math.PI * e[3])) * (1 - u.calm);
  const angle = turb * (SHADER.turbRotateBase + ry * SHADER.turbRotateRand);
  const cs = Math.cos(angle);
  const sn = Math.sin(angle);
  const rx = cs * x + sn * z;
  const rzz = -sn * x + cs * z;
  x = rx;
  z = rzz;
  const scale = 1 + turb * SHADER.turbScale;
  x *= scale;
  y *= scale;
  z *= scale;

  const [fx, fy, fz] = SHADER.noiseFreq;
  const [sx, sy, sz] = SHADER.noiseSpeed;
  const nx = Math.sin(y * fx + u.time * sx + ry * TAU);
  const ny = Math.sin(z * fy + u.time * sy + rz * TAU);
  const nz = Math.sin(x * fz + u.time * sz + rw * TAU);
  const amount = turb * SHADER.turbNoise + SHADER.idleNoise * (1 - u.calm) * (1 - u.lock);
  x += nx * amount;
  y += ny * amount;
  z += nz * amount;

  const ei = smoothstep(0, 1, clamp01((u.intro - r * SHADER.introSpread) / SHADER.introWindow));
  x = mix(a.aStart[j]!, x, ei);
  y = mix(a.aStart[j + 1]!, y, ei);
  z = mix(a.aStart[j + 2]!, z, ei);

  const dx = x - u.pointerX;
  const dy = y - u.pointerY;
  const dist = Math.hypot(dx, dy);
  const push = (1 - smoothstep(0, SHADER.pointerRadius, dist)) * u.pointerStrength;
  const inv = 1 / Math.max(dist, 1e-3);
  x += dx * inv * push * SHADER.pointerPushXY;
  y += dy * inv * push * SHADER.pointerPushXY;
  z += push * SHADER.pointerPushZ;
  return [x, y, z];
}
