import * as THREE from 'three';
import { NOISE, COLOR } from './glsl.js';

// Arcane-style painted surfaces: light is painted into the surface (warm lit planes, cool shadow,
// a visible stroke band at the turn), strokes follow the form (along the tangent), bevels catch a
// painted highlight, shadows carry engraving hatches. Energy (runes) is the brightest thing in frame.

export const paintShared = {
  uKeyDir: { value: new THREE.Vector3(-0.55, 0.62, 0.55).normalize() }, // view space
  uKeyCol: { value: new THREE.Color('#ffe2b0') },
  uCoolCol: { value: new THREE.Color('#123a35') },
  uRimCol: { value: new THREE.Color('#4cd6a6') },
  uInk: { value: new THREE.Color('#05100d') },
  uStep: { value: 0 },
  uPx: { value: 1 },
  uEnergyCol: { value: new THREE.Color('#4cd6a6') },
  uEnergyHot: { value: new THREE.Color('#d9fff0') },
};

const VERT = /* glsl */ `
in vec3 position; in vec3 normal; in vec2 uv;
#ifdef USE_TANGENT
in vec3 tangent3;
#endif
#ifdef USE_FACE
in float face;
out float vFace;
#endif
#ifdef USE_INSTANCING
in mat4 instanceMatrix;
#endif
uniform mat4 modelMatrix, viewMatrix, projectionMatrix;
out vec3 vN; out vec3 vViewPos; out vec3 vObj; out vec2 vUv; out vec3 vT;
void main(){
  vec4 p = vec4(position, 1.0); vec3 n = normal;
#ifdef USE_TANGENT
  vec3 t = tangent3;
#else
  vec3 t = normalize(cross(n, abs(n.y) < 0.95 ? vec3(0.0, 1.0, 0.0) : vec3(1.0, 0.0, 0.0)));
#endif
#ifdef USE_INSTANCING
  p = instanceMatrix * p; n = mat3(instanceMatrix) * n; t = mat3(instanceMatrix) * t;
#endif
#ifdef USE_FACE
  vFace = face;
#endif
  vObj = position; vUv = uv; vT = t;
  vec4 wp = modelMatrix * p;
  vec4 mv = viewMatrix * wp; vViewPos = mv.xyz;
  vN = normalize(mat3(viewMatrix) * mat3(modelMatrix) * n);
  gl_Position = projectionMatrix * mv;
}`;

const FRAG = /* glsl */ `
precision highp float;
${NOISE}
${COLOR}
uniform vec3 uKeyDir, uKeyCol, uCoolCol, uRimCol, uInk, uEnergyCol, uEnergyHot;
uniform float uStep, uPx;
uniform vec3 uBase;
uniform float uStrokeAmt, uStrokeScale, uHatchAmt, uSpecAmt, uRimAmt, uBevelAmt, uId, uLift, uEmissive, uWear, uInlay;
uniform vec3 uInlayCol;
#ifdef USE_RUNES
uniform sampler2D uRunes; uniform float uCharge, uEnergy, uRuneRepeat, uChargeHead;
#endif
#ifdef USE_MAP
uniform sampler2D uMap; uniform float uMapAmt;
#endif
in vec3 vN; in vec3 vViewPos; in vec3 vObj; in vec2 vUv; in vec3 vT;
#ifdef USE_FACE
in float vFace;
#endif
layout(location = 0) out highp vec4 gColor;
layout(location = 1) out highp vec4 gNormal;

vec3 rgb2hsv(vec3 c){ vec4 K = vec4(0.0, -1.0/3.0, 2.0/3.0, -1.0); vec4 p = mix(vec4(c.bg, K.wz), vec4(c.gb, K.xy), step(c.b, c.g)); vec4 q = mix(vec4(p.xyw, c.r), vec4(c.r, p.yzx), step(p.x, c.r)); float d = q.x - min(q.w, q.y); float e = 1.0e-10; return vec3(abs(q.z + (q.w - q.y) / (6.0 * d + e)), d / (q.x + e), q.x); }
vec3 hsv2rgb(vec3 c){ vec4 K = vec4(1.0, 2.0/3.0, 1.0/3.0, 3.0); vec3 p = abs(fract(c.xxx + K.xyz) * 6.0 - K.www); return c.z * mix(K.xxx, clamp(p - K.xxx, 0.0, 1.0), c.y); }

void main(){
  vec3 N = normalize(vN);
  if (!gl_FrontFacing) N = -N;
  vec3 V = normalize(-vViewPos);
  vec3 L = normalize(uKeyDir);
  vec3 base = uBase;
#ifdef USE_MAP
  vec4 mp = texture(uMap, vUv); base = mix(base, mp.rgb, mp.a * uMapAmt);
#endif
  if (uEmissive > 0.5) { gColor = vec4(base, 1.0); gNormal = vec4(N * 0.5 + 0.5, uId / 255.0); return; }
  // two-tone bands: a patina inlay runs down the middle of the outer face, brass at the edges
  float inlay = 0.0;
#ifdef USE_FACE
  inlay = uInlay * (1.0 - step(0.5, vFace)) * step(0.2, vUv.y) * step(vUv.y, 0.8);
#endif
  base = mix(base, uInlayCol, inlay);
  // strokes follow the form: long along the tangent, short across it
  vec3 T = normalize(vT);
  vec3 B = normalize(cross(normalize(vN), T));
  vec3 sp = vObj * uStrokeScale;
  float along = dot(sp, T), across = dot(sp, B) + dot(sp, normalize(vN)) * 0.7;
  float stroke = fbm2(vec2(across * 6.0, along * 0.9) + 3.1) - 0.5;
  float stroke2 = fbm2(vec2(across * 17.0, along * 2.3) + 9.7) - 0.5;
  float ndl = dot(N, L);
  float t = ndl * 0.5 + 0.5 + stroke * uStrokeAmt + uLift;
  // four painted values: cool shadow, mid, warm light, highlight. Edges are brushy, never a clean toon line.
  vec3 cool = mix(base * 0.30, uCoolCol, 0.55);
  vec3 mid = base * 0.82;
  vec3 warm = mix(base, uKeyCol, 0.38) * 1.08;
  float w1 = 0.07 + abs(stroke2) * 0.05;
  float a1 = smoothstep(0.42 - w1, 0.42 + w1, t + stroke2 * 0.18);
  float a2 = smoothstep(0.66 - w1, 0.66 + w1, t + stroke2 * 0.22);
  vec3 col = mix(cool, mid, a1);
  col = mix(col, warm, a2);
  // a visible stroke band where the plane turns away from the light
  float band = smoothstep(0.08, 0.0, abs(t - 0.44 - stroke * 0.05)) * (0.5 + stroke2);
  col = mix(col, mix(mid, cool, 0.45), clamp(band, 0.0, 1.0) * 0.55);
  // hue drift inside one value (5–15°), so flats never read as vector fills
  vec3 hsv = rgb2hsv(max(col, 0.0001));
  hsv.x = fract(hsv.x + stroke * 0.035 + (a2 - 0.5) * 0.02);
  hsv.y = clamp(hsv.y * (0.92 + stroke2 * 0.3), 0.0, 1.0);
  col = hsv2rgb(hsv);
  // painted bevel highlight: chamfers and band edges catch one light stroke
  float bevel = 0.0;
#ifdef USE_FACE
  bevel = step(2.5, vFace) * step(vFace, 3.5);
#endif
  float lit = smoothstep(0.2, 0.75, t);
  col = mix(col, mix(warm, uKeyCol, 0.6) * 1.15, bevel * lit * uBevelAmt * (0.7 + stroke2 * 0.8));
  // edge wear on convex areas: broken light strokes
  col = mix(col, warm * 1.1, step(0.62, stroke2 + 0.5) * uWear * lit * 0.35);
  // engraving hatches in the shadow side (banknote engraving meets comic hatching)
  float hd = clamp((0.42 - t) * 2.6, 0.0, 1.0);
  float hl = abs(fract(across * 22.0 + stroke * 1.5) - 0.5);
  float hw = fwidth(across * 22.0) * 0.9;
  float hatchLine = 1.0 - smoothstep(hd * 0.38 - hw, hd * 0.38 + hw, hl);
  col = mix(col, uInk, hatchLine * hd * uHatchAmt);
  // painted glint: a hard stroke-shaped highlight
  vec3 R = reflect(-L, N);
  float sp2 = pow(max(dot(R, V), 0.0), 26.0);
  float glint = smoothstep(0.42, 0.5, sp2 + stroke * 0.5 + stroke2 * 0.3);
  col = mix(col, vec3(1.0, 0.97, 0.9), glint * uSpecAmt);
  // energy rim from behind (the core lights its surroundings)
  float fr = pow(1.0 - max(dot(N, V), 0.0), 2.2);
  float rim = smoothstep(0.35, 0.5, fr + stroke * 0.3) * smoothstep(0.55, 0.1, t);
  col = mix(col, uRimCol, rim * uRimAmt);
#ifdef USE_RUNES
  // engraved runes: grooves darken, the energy channel fills along the ring as it charges
  float onFace = 1.0;
#ifdef USE_FACE
  onFace = 1.0 - step(0.5, vFace);
#endif
  vec4 rn = texture(uRunes, vec2(vUv.x * uRuneRepeat, vUv.y));
  col = mix(col, mix(cool, uInk, 0.5), rn.r * onFace * mix(0.85, 0.6, inlay));
  float u = fract(vUv.x);
  float charged = step(u, uCharge);
  float head = smoothstep(uChargeHead - 0.04, uChargeHead, u) * step(u, uChargeHead) * step(0.001, uCharge) * step(uCharge, 0.999);
  float e = rn.g * onFace * max(charged * uEnergy, head);
  col = mix(col, mix(uEnergyCol, uEnergyHot, head + 0.25 * step(0.5, fract(uStep * 6.0 + u * 30.0))), clamp(e, 0.0, 1.0));
#endif
  gColor = vec4(col, 1.0);
  gNormal = vec4(N * 0.5 + 0.5, uId / 255.0);
}`;

let nextId = 120;
export function paintMaterial(opts = {}) {
  const defines = {};
  const u = {
    ...paintShared,
    uBase: { value: new THREE.Color(opts.base ?? '#c9a25a') },
    uStrokeAmt: { value: opts.stroke ?? 0.22 },
    uStrokeScale: { value: opts.strokeScale ?? 1.6 },
    uHatchAmt: { value: opts.hatch ?? 0.55 },
    uSpecAmt: { value: opts.spec ?? 0.9 },
    uRimAmt: { value: opts.rim ?? 0.9 },
    uBevelAmt: { value: opts.bevel ?? 1 },
    uWear: { value: opts.wear ?? 0.6 },
    uId: { value: opts.id ?? (nextId = nextId >= 199 ? 120 : nextId + 1) },
    uLift: { value: opts.lift ?? 0 },
    uEmissive: { value: opts.emissive ? 1 : 0 },
    uInlay: { value: opts.inlay ? 1 : 0 },
    uInlayCol: { value: new THREE.Color(opts.inlayCol ?? '#1a4a3d') },
  };
  if (opts.tangent) defines.USE_TANGENT = '';
  if (opts.face) defines.USE_FACE = '';
  if (opts.instanced) defines.USE_INSTANCING = '';
  if (opts.map) { defines.USE_MAP = ''; u.uMap = { value: opts.map }; u.uMapAmt = { value: opts.mapAmt ?? 1 }; }
  if (opts.runes) {
    defines.USE_RUNES = '';
    u.uRunes = { value: opts.runes }; u.uCharge = { value: opts.charge ?? 0 }; u.uEnergy = { value: opts.energy ?? 1 };
    u.uRuneRepeat = { value: opts.runeRepeat ?? 1 }; u.uChargeHead = { value: 0 };
  }
  return new THREE.RawShaderMaterial({ glslVersion: THREE.GLSL3, vertexShader: VERT, fragmentShader: FRAG, uniforms: u, defines, side: opts.side ?? THREE.FrontSide });
}

// Faceted crystal: flat facets in four values, brighter toward the viewer like light trapped inside.
export function crystalMaterial(opts = {}) {
  return new THREE.RawShaderMaterial({
    glslVersion: THREE.GLSL3,
    vertexShader: /* glsl */ `
      in vec3 position; in vec3 normal;
#ifdef USE_INSTANCING
      in mat4 instanceMatrix;
#endif
      uniform mat4 modelMatrix, viewMatrix, projectionMatrix; out vec3 vViewPos; out vec3 vObj;
      void main(){
        vec4 p = vec4(position, 1.0);
#ifdef USE_INSTANCING
        p = instanceMatrix * p;
#endif
        vObj = position; vec4 mv = viewMatrix * modelMatrix * p; vViewPos = mv.xyz; gl_Position = projectionMatrix * mv; }`,
    fragmentShader: /* glsl */ `
      precision highp float;
      ${NOISE}
      uniform vec3 uDeep, uMid, uBright, uHot, uKeyDir; uniform float uPulse, uStep, uId;
      in vec3 vViewPos; in vec3 vObj;
      layout(location = 0) out highp vec4 gColor; layout(location = 1) out highp vec4 gNormal;
      void main(){
        vec3 N = normalize(cross(dFdx(vViewPos), dFdy(vViewPos)));
        vec3 V = normalize(-vViewPos);
        float facing = max(dot(N, V), 0.0);
        float ndl = dot(N, normalize(uKeyDir));
        // facet value from a stable per-facet hash so each plane reads as one painted shape
        float h = hash12(floor((N.xy + 1.0) * 7.0) + floor(N.z * 5.0));
        float v = facing * 0.65 + ndl * 0.25 + h * 0.25 + uPulse * 0.25;
        vec3 col = v < 0.38 ? uDeep : (v < 0.62 ? uMid : (v < 0.86 ? uBright : uHot));
        // internal veins: thin bright lines inside the crystal that flicker on twos
        float vein = smoothstep(0.03, 0.0, abs(fract(vObj.y * 3.0 + vObj.x * 2.0 + floor(uStep * 6.0) * 0.17) - 0.5) - 0.44);
        col = mix(col, uHot, vein * 0.35 * (0.5 + uPulse));
        gColor = vec4(col, 1.0);
        gNormal = vec4(N * 0.5 + 0.5, uId / 255.0);
      }`,
    uniforms: {
      uDeep: { value: new THREE.Color(opts.deep ?? '#0b3a30') }, uMid: { value: new THREE.Color(opts.mid ?? '#1f8f6c') },
      uBright: { value: new THREE.Color(opts.bright ?? '#4cd6a6') }, uHot: { value: new THREE.Color(opts.hot ?? '#d9fff0') },
      uKeyDir: paintShared.uKeyDir, uPulse: { value: 0 }, uStep: paintShared.uStep, uId: { value: opts.id ?? 210 },
    },
    defines: opts.instanced ? { USE_INSTANCING: '' } : {},
  });
}
