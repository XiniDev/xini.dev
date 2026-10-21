import * as THREE from 'three';
import { NOISE, COLOR } from './glsl.js';
import { shared } from './ink-material.js';

// Night towers in one draw call: instanced boxes (base at y = 0) with procedural windows, shaded in
// ink-style bands. Lit windows write emissive ids so the bloom pass catches them.
export const facadeU = {
  uWinA: { value: new THREE.Color('#ffcf86') },
  uWinB: { value: new THREE.Color('#7fe3ff') },
  uWinC: { value: new THREE.Color('#ff4f86') },
  uWall: { value: new THREE.Color('#1c1a2c') },
  uWallLit: { value: new THREE.Color('#3a3654') },
  uRoof: { value: new THREE.Color('#25223a') },
  uLit: { value: 0.32 },
  uCell: { value: new THREE.Vector2(2.6, 3.4) },
  uWinBloom: { value: 1 }, // 0: lit windows do not bloom (far off, a glow round each read as a soft blurred square)
};

const VERT = /* glsl */ `
in vec3 position; in vec3 normal; in mat4 instanceMatrix;
#ifdef USE_INSTANCE_COLOR
in vec3 instanceColor; out vec3 vIColor;
#endif
uniform mat4 modelMatrix, viewMatrix, projectionMatrix;
out vec3 vLocal; out vec3 vLN; out vec3 vN; out vec3 vViewPos; flat out float vInst; out vec3 vScale;
void main(){
  vec3 sc = vec3(length(instanceMatrix[0].xyz), length(instanceMatrix[1].xyz), length(instanceMatrix[2].xyz));
  vScale = sc;
  vLocal = position * sc;
  vLN = normal;
  vInst = float(gl_InstanceID);
#ifdef USE_INSTANCE_COLOR
  vIColor = instanceColor;
#endif
  vec4 wp = modelMatrix * instanceMatrix * vec4(position, 1.0);
  vec4 mv = viewMatrix * wp; vViewPos = mv.xyz;
  vN = normalize(mat3(viewMatrix) * mat3(modelMatrix) * mat3(instanceMatrix) * normal);
  gl_Position = projectionMatrix * mv;
}`;

const FRAG = /* glsl */ `
precision highp float;
${NOISE}
${COLOR}
uniform vec3 uKeyDir, uShadeTint, uDotInk, uRimCol;
uniform vec3 uWinA, uWinB, uWinC, uWall, uWallLit, uRoof;
uniform float uLit, uStep, uPx, uWinBloom; uniform vec2 uCell;
in vec3 vLocal; in vec3 vLN; in vec3 vN; in vec3 vViewPos; flat in float vInst; in vec3 vScale;
#ifdef USE_INSTANCE_COLOR
in vec3 vIColor;
#endif
layout(location = 0) out highp vec4 gColor; layout(location = 1) out highp vec4 gNormal;
void main(){
  vec3 N = normalize(vN), V = normalize(-vViewPos);
  float seed = hash11(vInst * 0.137 + 3.1);
  vec3 wall = uWall;
#ifdef USE_INSTANCE_COLOR
  wall = vIColor;
#endif
  float ndl = dot(N, normalize(uKeyDir));
  float band = smoothstep(-0.05, 0.05, ndl + (vnoise2(vLocal.xy * 0.4) - 0.5) * 0.2);
  vec3 col = mix(mix(wall, uShadeTint, 0.45), mix(wall, uWallLit, 0.6), band);
  float id = 1.0 + mod(vInst * 7.0 + 11.0, 198.0);
  if (abs(vLN.y) > 0.5) {
    col = mix(uRoof, uShadeTint, 0.3);
  } else {
    // facade coordinates in metres: across the face, and up
    float u = abs(vLN.x) > 0.5 ? vLocal.z : vLocal.x;
    float v = vLocal.y;
    vec2 g = vec2(u, v) / uCell;
    vec2 cell = floor(g), f = fract(g);
    float win = step(0.16, f.x) * step(f.x, 0.84) * step(0.24, f.y) * step(f.y, 0.78);
    float rowSeed = hash12(vec2(cell.y, vInst));
    float litChance = uLit * (0.4 + seed * 1.2) * (rowSeed > 0.86 ? 0.0 : 1.0) * (rowSeed < 0.07 ? 2.5 : 1.0);
    float h = hash12(cell + vInst * 13.7 + floor(uStep * 0.5) * step(0.995, hash12(cell + 7.0)));
    float lit = step(h, litChance);
    float pick = hash12(cell * 1.7 + vInst);
    vec3 wc = pick < 0.72 ? uWinA : (pick < 0.9 ? uWinB : uWinC);
    // far away, a window becomes a pixel: average it instead of shimmering
    float px = length(fwidth(g));
    float far = smoothstep(0.18, 0.45, px);
    vec3 dark = mix(col, uDotInk, 0.55);
    vec3 winCol = mix(dark, wc * (0.75 + 0.35 * hash12(cell + 2.0)), lit);
    vec3 near = mix(col, winCol, win);
    vec3 avg = mix(col, mix(dark, wc, litChance * 0.9), 0.5);
    col = mix(near, avg, far);
    if (win * lit * (1.0 - far) > 0.5 && uWinBloom > 0.5) id = 250.0 + mod(vInst, 5.0);
    // vertical sign strips on some towers
    float sign = step(0.9, seed) * step(abs(u - (seed - 0.9) * 40.0 + 2.0), 0.9) * step(v, vScale.y * 0.8) * step(vScale.y * 0.35, v);
    if (sign > 0.5) { col = mix(uWinC, uWinB, step(0.95, seed)); id = 253.0; }
  }
  // rim from the city glow below
  float fr = pow(1.0 - max(dot(N, V), 0.0), 3.0);
  col = mix(col, uRimCol, smoothstep(0.55, 0.7, fr) * 0.35 * step(abs(vLN.y), 0.5));
  gColor = vec4(col, 1.0);
  gNormal = vec4(N * 0.5 + 0.5, id / 255.0);
}`;

export function facadeMaterial({ instanceColor = false } = {}) {
  return new THREE.RawShaderMaterial({
    glslVersion: THREE.GLSL3, vertexShader: VERT, fragmentShader: FRAG,
    uniforms: { ...facadeU, uKeyDir: shared.uKeyDir, uShadeTint: shared.uShadeTint, uDotInk: shared.uDotInk, uRimCol: shared.uRimCol, uStep: shared.uStep, uPx: shared.uPx },
    defines: instanceColor ? { USE_INSTANCE_COLOR: '' } : {},
  });
}

/** Box geometry with its base at y = 0 (so instance scale.y is the tower height). */
export function towerBox() {
  const g = new THREE.BoxGeometry(1, 1, 1);
  g.translate(0, 0.5, 0);
  return g;
}

/** Scatter towers on a disc or annulus. Returns an InstancedMesh. */
export function scatterTowers({ count = 600, rMin = 40, rMax = 400, hMin = 10, hMax = 90, wMin = 6, wMax = 18, y = 0, seed = 1, avoid = [], palette = ['#1c1a2c'] } = {}) {
  let s = seed >>> 0 || 1; const rnd = () => ((s = (s * 1664525 + 1013904223) >>> 0) / 4294967296);
  const m = new THREE.InstancedMesh(towerBox(), facadeMaterial({ instanceColor: true }), count);
  const M = new THREE.Matrix4(), Q = new THREE.Quaternion(), P = new THREE.Vector3(), S = new THREE.Vector3(), C = new THREE.Color();
  let n = 0, guard = 0;
  while (n < count && guard++ < count * 20) {
    const a = rnd() * Math.PI * 2, r = Math.sqrt(rMin * rMin + rnd() * (rMax * rMax - rMin * rMin));
    const x = Math.cos(a) * r, z = Math.sin(a) * r;
    if (avoid.some(([ax, az, ar]) => (x - ax) ** 2 + (z - az) ** 2 < ar * ar)) continue;
    const tall = Math.pow(rnd(), 2.2);
    const h = hMin + (hMax - hMin) * tall * (0.6 + 0.8 * (1 - r / rMax));
    const w = wMin + (wMax - wMin) * rnd();
    P.set(x, y, z); Q.setFromAxisAngle(new THREE.Vector3(0, 1, 0), Math.round(rnd() * 4) * (Math.PI / 2) + (rnd() < 0.2 ? rnd() * 0.5 : 0));
    S.set(w, h, w * (0.7 + rnd() * 0.6));
    M.compose(P, Q, S); m.setMatrixAt(n, M);
    m.setColorAt(n, C.set(palette[Math.floor(rnd() * palette.length)]));
    n++;
  }
  m.count = n;
  m.instanceMatrix.needsUpdate = true; if (m.instanceColor) m.instanceColor.needsUpdate = true;
  m.frustumCulled = false;
  return m;
}
