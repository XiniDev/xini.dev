import * as THREE from 'three';
import { NOISE, COLOR } from './glsl.js';

// Uniforms every ink material shares (light, time, grade). Update once per frame.
export const shared = {
  uKeyDir: { value: new THREE.Vector3(0.45, 0.75, 0.5).normalize() }, // view space
  uTime: { value: 0 },          // continuous seconds
  uStep: { value: 0 },          // time quantised to 12 fps ("on twos")
  uPx: { value: 1 },            // device pixel ratio, keeps dot sizes stable
  uShadeTint: { value: new THREE.Color('#1b1640') },
  uDotInk: { value: new THREE.Color('#0b0a12') },
  uRimCol: { value: new THREE.Color('#9fffd0') },
  uGlint: { value: new THREE.Color('#ffffff') },
  uFillDir: { value: new THREE.Vector3(-0.8, 0.1, -0.4).normalize() }, // view space
  uFillCol: { value: new THREE.Color('#ff3550') },
  uFillAmt: { value: 0.0 },
};

const VERT = /* glsl */ `
in vec3 position; in vec3 normal; in vec2 uv;
#ifdef USE_INSTANCING
in mat4 instanceMatrix;
flat out float vInst; // flat: interpolated, the id wobbled across a face and printed ink speckle all over it
#endif
#ifdef USE_INSTANCE_COLOR
in vec3 instanceColor; out vec3 vIColor;
#endif
#ifdef USE_VCOLOR
in vec3 color; out vec3 vColor;
#endif
#ifdef USE_AOV
in vec3 color; out float vAO;
#endif
#ifdef USE_VID
in float _inkid; flat out float vId;
#endif
uniform mat4 modelMatrix, modelViewMatrix, projectionMatrix, viewMatrix; uniform mat3 normalMatrix;
out vec3 vN; out vec3 vViewPos; out vec3 vObjPos; out vec3 vWorldPos; out vec2 vUv;
void main(){
  vec4 p = vec4(position, 1.0);
  vec3 n = normal;
#ifdef USE_VCOLOR
  vColor = color;
#endif
#ifdef USE_AOV
  vAO = color.r;
#endif
#ifdef USE_VID
  vId = _inkid;
#endif
#ifdef USE_INSTANCING
  p = instanceMatrix * p; n = mat3(instanceMatrix) * n;
  vInst = float(gl_InstanceID);
#endif
#ifdef USE_INSTANCE_COLOR
  vIColor = instanceColor;
#endif
  vObjPos = position; vUv = uv;
  vec4 wp = modelMatrix * p; vWorldPos = wp.xyz;
  vec4 mv = viewMatrix * wp; vViewPos = mv.xyz;
  vN = normalize(mat3(viewMatrix) * mat3(modelMatrix) * n);
  gl_Position = projectionMatrix * mv;
}`;

const FRAG = /* glsl */ `
precision highp float;
${NOISE}
${COLOR}
uniform vec3 uKeyDir; uniform float uTime, uStep, uPx;
uniform vec3 uShadeTint, uDotInk, uRimCol, uGlint, uFillDir, uFillCol; uniform float uFillAmt;
uniform vec3 uBase, uBack;
uniform float uMidMix, uDarkMix, uRimAmt, uSpecAmt, uBrushAmt, uBrushScale, uStrokeAmt;
uniform float uDotCell, uDotAngle, uDotAmt, uHatchAmt, uId, uEmissive, uLift, uAlpha, uAOAmt, uGain;
uniform vec3 uStrokeDir;
#ifdef USE_GRID
uniform vec2 uGrid; uniform float uGridW; uniform vec3 uPulseCol; uniform float uPulse;
#endif
#ifdef USE_MAP
uniform sampler2D uMap; uniform float uMapAmt;
#endif
#ifdef USE_PIXELGRID
uniform vec2 uPixGrid;
#endif
#ifdef USE_BAKE
uniform sampler2D uBake; // r: ambient occlusion, g: convexity/edge wear, b: cavity
#endif
#ifdef USE_PAINT
uniform sampler2D uPaint; uniform vec3 uPaintA, uPaintB;
#endif
in vec3 vN; in vec3 vViewPos; in vec3 vObjPos; in vec3 vWorldPos; in vec2 vUv;
#ifdef USE_VCOLOR
in vec3 vColor;
#endif
#ifdef USE_INSTANCING
flat in float vInst;
#endif
#ifdef USE_INSTANCE_COLOR
in vec3 vIColor;
#endif
#ifdef USE_AOV
in float vAO;
#endif
#ifdef USE_VID
flat in float vId;
#endif
layout(location = 0) out highp vec4 gColor;
layout(location = 1) out highp vec4 gNormal;

vec3 tone(vec3 base, float t, float edge){
  vec3 mid = mix(base, uShadeTint, uMidMix);
  vec3 dark = mix(base, uShadeTint, uDarkMix);
  float a1 = smoothstep(0.30 - edge, 0.30 + edge, t);
  float a0 = smoothstep(-0.06 - edge, -0.06 + edge, t);
  return mix(dark, mix(mid, base, a1), a0);
}

void main(){
#ifdef FLAT
  vec3 N = normalize(cross(dFdx(vViewPos), dFdy(vViewPos)));
#else
  vec3 N = normalize(vN);
  if (!gl_FrontFacing) N = -N;
#endif
  vec3 V = normalize(-vViewPos);
  vec3 L = normalize(uKeyDir);
  vec3 base = gl_FrontFacing ? uBase : uBack;
#ifdef USE_VCOLOR
  base = vColor;
#endif
#ifdef USE_INSTANCE_COLOR
  base = vIColor;
#endif
  float idOut = uId;
#ifdef USE_INSTANCING
  if (uId < 249.5) idOut = 1.0 + mod(uId + floor(vInst + 0.5) * 7.0, 198.0);
#endif
#ifdef USE_MAP
  vec4 mp = texture(uMap, vUv);
  base = mix(base, mp.rgb, mp.a * uMapAmt);
#endif
  if (uEmissive > 0.5) {
#ifdef USE_PIXELGRID
    // a lit monitor's pixel grid, anti-aliased, and gone before its cells are small enough to beat against the frame's
    // own pixels (moire): full from 4.5 px a cell, out by 2.4
    vec2 cell = vUv * uPixGrid, fw = max(fwidth(cell), vec2(1e-4));
    vec2 gut = smoothstep(0.36 - fw, 0.36 + fw, abs(fract(cell) - 0.5));
    base *= 1.0 - 0.12 * max(gut.x, gut.y) * (1.0 - smoothstep(0.22, 0.42, max(fw.x, fw.y)));
#endif
    gColor = vec4(base * uGain, uAlpha);
#ifdef USE_VID
    gNormal = vec4(N * 0.5 + 0.5, mod(floor(vId + uId + 0.5), 250.0) / 255.0);
#else
    gNormal = vec4(N * 0.5 + 0.5, idOut / 255.0);
#endif
    return;
  }
  float ndl = dot(N, L);
  // brush noise in object space, stretched along the stroke direction: breaks the terminator like paint
  vec3 sp = vObjPos * uBrushScale;
  vec3 sd = normalize(uStrokeDir);
  float along = dot(sp, sd);
  vec3 across = sp - sd * along;
  float b = fbm3(vec3(across * 3.0 + along * 0.35) + uStep * 0.0) - 0.5;
  float t = ndl + b * uBrushAmt + uLift;
  float ao = 1.0;
#ifdef USE_AOV
  ao = clamp(vAO * 1.15, 0.0, 1.0);
  t -= (1.0 - ao) * uAOAmt;
#endif
#ifdef USE_BAKE
  vec3 bk = texture(uBake, vUv).rgb;
  ao = bk.r;
  t -= (1.0 - ao) * 0.9;
#endif
  float edge = fwidth(t) * 0.75 + 0.002;
  vec3 col = tone(base, t, edge);
  // painted stroke texture: tiny value variation inside each band
  float stroke = fbm3(vec3(across * 9.0 + along * 1.2)) - 0.5;
  col *= 1.0 + stroke * uStrokeAmt;
  // halftone lives in the transitions (a printed gradient), flat colour inside the bands
  float zoneA = smoothstep(0.42, 0.30, t) * smoothstep(0.10, 0.22, t);      // light -> mid
  float zoneB = smoothstep(0.02, -0.06, t) * smoothstep(-0.55, -0.25, t);   // mid -> dark
  float dA = halftone(gl_FragCoord.xy, uDotCell * uPx, uDotAngle, (0.30 - t) * 2.2);
  float dB = halftone(gl_FragCoord.xy, uDotCell * uPx, uDotAngle, 0.25 + (-t) * 1.4);
  float dots = max(dA * zoneA * 0.75, dB * zoneB);
  col = mix(col, uDotInk, dots * uDotAmt);
  float h = hatch(gl_FragCoord.xy, uDotCell * 0.7 * uPx, uDotAngle + 1.2, clamp(-t - 0.25, 0.0, 1.0) * 1.6);
  col = mix(col, uDotInk, h * uHatchAmt);
  // coloured fill (neon bounce): a hard band of light from a second direction
  if (uFillAmt > 0.0) {
    float fd = dot(N, normalize(uFillDir)) + b * 0.3;
    float fb = smoothstep(0.18, 0.24, fd);
    col = mix(col, col * 0.4 + uFillCol * 0.85, fb * uFillAmt * (1.0 - smoothstep(0.2, 0.6, t)));
  }
  // rim light on the side away from the key (comic night lighting)
  float fr = pow(1.0 - max(dot(N, V), 0.0), 2.4);
  float rim = smoothstep(0.42, 0.47, fr + b * 0.25) * smoothstep(0.35, -0.25, ndl);
  col = mix(col, uRimCol, rim * uRimAmt);
  // hard painted glint
  vec3 R = reflect(-L, N);
  float s = pow(max(dot(R, V), 0.0), 28.0);
  float glint = smoothstep(0.55, 0.6, s + b * 0.35);
  col = mix(col, uGlint, glint * uSpecAmt);
#ifdef USE_BAKE
  // painted edge wear on convex edges
  col = mix(col, mix(base, uGlint, 0.35), smoothstep(0.55, 0.75, bk.g) * 0.55 * step(-0.1, t));
#endif
#ifdef USE_GRID
  // printed crease lines on every facet edge, with signal pulses running along them
  vec2 gq = vUv * uGrid;
  vec2 gf = abs(fract(gq) - 0.5);
  vec2 gw = fwidth(gq);
  float gl = max(smoothstep(0.5 - gw.x * uGridW, 0.5 - gw.x * max(uGridW - 1.0, 0.2), gf.x), smoothstep(0.5 - gw.y * uGridW, 0.5 - gw.y * max(uGridW - 1.0, 0.2), gf.y));
  col = mix(col, uDotInk, gl * 0.85);
  if (uPulse > 0.0) {
    float lane = floor(gq.y + 0.5) + floor(gq.x + 0.5) * 7.0;
    float ph = fract(gq.x * 0.11 - uStep * 0.6 + hash11(lane) * 7.0);
    float ph2 = fract(gq.y * 0.13 - uStep * 0.45 + hash11(lane + 3.0) * 5.0);
    float onx = smoothstep(0.5 - gw.y * 3.2, 0.5 - gw.y * 1.2, gf.y) * step(0.84, ph);
    float ony = smoothstep(0.5 - gw.x * 3.2, 0.5 - gw.x * 1.2, gf.x) * step(0.86, ph2);
    col = mix(col, uPulseCol, clamp(onx + ony, 0.0, 1.0) * uPulse);
  }
#endif
#ifdef USE_PAINT
  vec4 pnt = texture(uPaint, vUv);
  float pa = smoothstep(0.35, 0.55, pnt.a);
  vec3 pc = mix(uPaintA, uPaintB, pnt.r);
  vec3 ptone = tone(pc, t + 0.15, edge);
  ptone = mix(ptone, uDotInk, dots * uDotAmt * 0.6);
  col = mix(col, ptone, pa);
#endif
  gColor = vec4(col, uAlpha);
#ifdef USE_VID
  gNormal = vec4(N * 0.5 + 0.5, mod(floor(vId + uId + 0.5), 250.0) / 255.0);
#else
  gNormal = vec4(N * 0.5 + 0.5, idOut / 255.0);
#endif
}`;

let nextId = 1, nextGlow = 0;
export function newInkId() { nextId = (nextId % 198) + 1; return nextId; }
/** Id 240 marks a display: the post pass leaves its colours out of the grade. */
export const DISPLAY_ID = 240;
/** Ids 250–254 mark emissive surfaces: the bloom pass picks them up. */
export function glowId() { nextGlow = (nextGlow + 1) % 5; return 250 + nextGlow; }

/**
 * An ink-and-paint material. Colours are display-space hex strings.
 * opts: base, back, mid, dark, rim, spec, brush, brushScale, stroke, dotCell, dotAngle, dot, hatch,
 *       id (0 = no ink lines), flat, map, mapAmt, bake, paint, paintA, paintB, emissive, lift, side, transparent
 */
export function inkMaterial(opts = {}) {
  const defines = {};
  const u = {
    uKeyDir: shared.uKeyDir, uTime: shared.uTime, uStep: shared.uStep, uPx: shared.uPx,
    uShadeTint: shared.uShadeTint, uDotInk: shared.uDotInk, uRimCol: shared.uRimCol, uGlint: shared.uGlint,
    uFillDir: shared.uFillDir, uFillCol: shared.uFillCol, uFillAmt: shared.uFillAmt,
    uBase: { value: new THREE.Color(opts.base ?? '#cccccc') },
    uBack: { value: new THREE.Color(opts.back ?? opts.base ?? '#cccccc') },
    uMidMix: { value: opts.mid ?? 0.42 },
    uDarkMix: { value: opts.dark ?? 0.78 },
    uRimAmt: { value: opts.rim ?? 1.0 },
    uSpecAmt: { value: opts.spec ?? 0.8 },
    uBrushAmt: { value: opts.brush ?? 0.32 },
    uBrushScale: { value: opts.brushScale ?? 1.6 },
    uStrokeAmt: { value: opts.stroke ?? 0.10 },
    uStrokeDir: { value: new THREE.Vector3(...(opts.strokeDir ?? [0.3, 1, 0.2])) },
    uDotCell: { value: opts.dotCell ?? 5.5 },
    uDotAngle: { value: opts.dotAngle ?? 0.785 },
    uDotAmt: { value: opts.dot ?? 0.85 },
    uHatchAmt: { value: opts.hatch ?? 0.0 },
    uId: { value: opts.id ?? (opts.emissive && opts.bloom !== false ? glowId() : newInkId()) },
    uEmissive: { value: opts.emissive ? 1 : 0 },
    uLift: { value: opts.lift ?? 0 },
    uAlpha: { value: opts.alpha ?? 1 },
    uAOAmt: { value: opts.ao ?? 0.9 },
    uGain: { value: opts.gain ?? 1 },
  };
  if (opts.flat) defines.FLAT = '';
  if (opts.map) { defines.USE_MAP = ''; u.uMap = { value: opts.map }; u.uMapAmt = { value: opts.mapAmt ?? 1 }; }
  if (opts.pixelGrid) { defines.USE_PIXELGRID = ''; u.uPixGrid = { value: new THREE.Vector2(...opts.pixelGrid) }; }
  if (opts.bake) { defines.USE_BAKE = ''; u.uBake = { value: opts.bake }; }
  if (opts.paint) {
    defines.USE_PAINT = ''; u.uPaint = { value: opts.paint };
    u.uPaintA = { value: new THREE.Color(opts.paintA ?? '#ffd400') };
    u.uPaintB = { value: new THREE.Color(opts.paintB ?? '#ff3b30') };
  }
  if (opts.instanced) defines.USE_INSTANCING = '';
  if (opts.vertexColors) defines.USE_VCOLOR = '';
  if (opts.instanceColor) defines.USE_INSTANCE_COLOR = '';
  if (opts.aoVertex) defines.USE_AOV = '';
  if (opts.vertexIds) defines.USE_VID = '';
  if (opts.grid) {
    defines.USE_GRID = '';
    u.uGrid = { value: new THREE.Vector2(...opts.grid) };
    u.uGridW = { value: opts.gridW ?? 1.6 };
    u.uPulseCol = { value: new THREE.Color(opts.pulseCol ?? '#ffffff') };
    u.uPulse = { value: opts.pulse ?? 0 };
  }
  const m = new THREE.RawShaderMaterial({
    glslVersion: THREE.GLSL3,
    vertexShader: VERT,
    fragmentShader: FRAG,
    uniforms: u,
    defines,
    side: opts.side ?? THREE.FrontSide,
    transparent: !!opts.transparent,
    depthWrite: opts.depthWrite ?? true,
  });
  m.userData.ink = true;
  return m;
}

// Plain unlit material that still writes both render targets (backgrounds, glows, cards).
export function flatMaterial({ color = '#ffffff', map = null, id = 0, transparent = false, opacity = 1, blending, depthWrite = true, depthTest = true, side } = {}) {
  return new THREE.RawShaderMaterial({
    glslVersion: THREE.GLSL3,
    vertexShader: /* glsl */ `
      in vec3 position; in vec2 uv; uniform mat4 modelViewMatrix, projectionMatrix; out vec2 vUv;
      void main(){ vUv = uv; gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0); }`,
    fragmentShader: /* glsl */ `
      precision highp float; uniform vec3 uColor; uniform float uOpacity, uId, uHasMap; uniform sampler2D uMap; in vec2 vUv;
      layout(location = 0) out highp vec4 gColor; layout(location = 1) out highp vec4 gNormal;
      void main(){
        vec4 c = vec4(uColor, uOpacity);
        if (uHasMap > 0.5) c *= texture(uMap, vUv);
        if (c.a < 0.004) discard;
        gColor = c; gNormal = vec4(0.5, 0.5, 1.0, uId / 255.0);
      }`,
    uniforms: {
      uColor: { value: new THREE.Color(color) }, uOpacity: { value: opacity }, uId: { value: id },
      uHasMap: { value: map ? 1 : 0 }, uMap: { value: map },
    },
    transparent, depthWrite, depthTest, blending: blending ?? THREE.NormalBlending, side: side ?? THREE.FrontSide,
  });
}
