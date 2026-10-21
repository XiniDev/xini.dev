import * as THREE from 'three';
import { NOISE, COLOR } from './shared/gfx/glsl.js';
import { inkMaterial as baseInk, shared } from './shared/gfx/ink-material.js';
import { post } from './shared/gfx/pipeline.js';
export const inkMaterial = (o) => baseInk({ brushScale: 0.07, dotCell: 4.5, ...o });

// The board: a city of components on a black solder mask. Layout is seeded, so districts, buses
// and legend stay identical between builds.
export const V = (x, y, z) => new THREE.Vector3(x, y, z);
let seed = 7;
export const rnd = () => ((seed = (seed * 16807) % 2147483647) / 2147483647);
export const reseed = (s) => { seed = s; };
export const BOARD = { w: 2000, h: 1500 };
export const BOARD_ID = 199;            // board, traces and printed legend share one id: no ink lines between them
export const QUIET_GLOW = 255;          // light printed on a surface: blooms, never inked
export const HOLO_ID = 249;             // a hologram's own pixels: never inked, and the haze behind it does not apply

export const boardU = {
  uMask: { value: new THREE.Color('#070a0b') }, uMask2: { value: new THREE.Color('#0c1213') },
  uSilk: { value: new THREE.Color('#dfe6df') }, uSilkDim: { value: new THREE.Color('#22403b') }, uPad: { value: new THREE.Color('#c9a25a') },
  uSheen: { value: new THREE.Color('#2a3a3a') }, uSignal: { value: new THREE.Color('#3dff8f') }, uHot: { value: new THREE.Color('#eafff4') },
  uLitC: { value: new THREE.Vector2(0, 0) }, uLitR: { value: 1e5 },
  uPing: { value: [0, 1, 2, 3].map(() => new THREE.Vector4(0, 0, -100, 0)) },
  uSilkTex: { value: null },
  uRefl: { value: null }, uReflMat: { value: new THREE.Matrix4() }, uReflAmt: { value: 0 }, uReflDebug: { value: 0 }, uScreen: { value: new THREE.Vector2(1, 1) },
};

const BOARD_VERT = /* glsl */ `in vec3 position; in vec2 uv; uniform mat4 modelMatrix, viewMatrix, projectionMatrix, uReflMat;
  out vec2 vUv; out vec3 vW; out vec3 vViewPos; out vec3 vN; out vec4 vRefl;
  void main(){ vUv = uv; vec4 w = modelMatrix * vec4(position, 1.0); vW = w.xyz; vec4 mv = viewMatrix * w; vViewPos = mv.xyz;
    vRefl = uReflMat * w;
    vN = normalize(mat3(viewMatrix) * vec3(0.0, 1.0, 0.0)); gl_Position = projectionMatrix * mv; }`;

// ---------- the board surface: mask, satin sheen, vias, legend, pads, contact shadows ----------
export function boardSurface() {
  const geo = new THREE.PlaneGeometry(BOARD.w, BOARD.h, 1, 1); geo.rotateX(-Math.PI / 2);
  const mat = new THREE.RawShaderMaterial({
    glslVersion: THREE.GLSL3,
    vertexShader: BOARD_VERT,
    fragmentShader: /* glsl */ `precision highp float;
      ${NOISE}
      ${COLOR}
      uniform vec3 uMask, uMask2, uSilk, uSilkDim, uPad, uSheen, uSignal, uHot, uDot, uKeyDir;
      uniform sampler2D uSilkTex, uRefl; uniform float uPx, uStep, uLitR, uReflAmt, uReflDebug; uniform vec2 uScreen; uniform vec2 uLitC; uniform vec4 uPing[4];
      in vec2 vUv; in vec3 vW; in vec3 vViewPos; in vec3 vN; in vec4 vRefl;
      layout(location = 0) out highp vec4 gColor; layout(location = 1) out highp vec4 gNormal;
      void main(){
        vec3 N = normalize(vN), Vv = normalize(-vViewPos), L = normalize(uKeyDir);
        vec4 sk = texture(uSilkTex, vUv);
        float big = fbm2(vW.xz * 0.0025);
        vec3 c = mix(uMask, uMask2, big);
        // the mask is glossy: the lit city reflects in it, printed as dots where it fades
        if (uReflAmt > 0.0) {
          vec2 ruv = vRefl.xy / vRefl.w;
          vec2 wob = (vec2(vnoise2(vW.xz * 0.045), vnoise2(vW.xz * 0.045 + 9.1)) - 0.5) * 0.007;
          vec3 rc = texture(uRefl, ruv + wob).rgb;
          float fres = mix(0.22, 0.8, pow(1.0 - max(dot(N, Vv), 0.0), 2.5));
          float rl = luma(rc);
          float rd = halftone(gl_FragCoord.xy, 3.6 * uPx, 0.4, clamp(rl * 1.6, 0.0, 1.0));
          c += rc * fres * mix(rd, 1.0, smoothstep(0.35, 0.7, rl)) * uReflAmt * (1.0 - clamp(sk.r + sk.g, 0.0, 1.0) * 0.8);
          if (uReflDebug > 1.5) { gColor = vec4(texture(uRefl, gl_FragCoord.xy / uScreen).rgb * 2.0, 1.0); gNormal = vec4(N * 0.5 + 0.5, ${BOARD_ID}.0 / 255.0); return; }
          if (uReflDebug > 0.5) { gColor = vec4(rc * 0.8 + vec3(fract(ruv * 4.0), 0.0) * 0.5 + vec3(0.0, 0.0, 0.3), 1.0); gNormal = vec4(N * 0.5 + 0.5, ${BOARD_ID}.0 / 255.0); return; }
        }
        // satin sheen from the case light, printed with a halftone falloff
        vec3 H = normalize(L + Vv);
        float sh = pow(max(dot(N, H), 0.0), 9.0);
        float band = smoothstep(0.38, 0.8, sh + (big - 0.5) * 0.3);
        c = mix(c, uSheen, band * 0.6);
        float sd = halftone(gl_FragCoord.xy, 4.5 * uPx, 0.785, smoothstep(0.06, 0.42, sh) * (1.0 - band) * 0.75);
        c = mix(c, uSheen, sd * 0.4);
        // vias on a 9-unit grid, faded out before they can shimmer
        vec2 g = vW.xz / 9.0; vec2 cell = floor(g), f = fract(g) - 0.5;
        float fw = length(fwidth(g));
        float hasVia = step(0.86, hash12(cell)) * (1.0 - smoothstep(0.05, 0.14, fw));
        float rr = length(f);
        float ring = (1.0 - smoothstep(0.17, 0.21, rr)) * smoothstep(0.06, 0.1, rr);
        // power-on wave from the processor
        float dist = length(vW.xz - uLitC);
        float on = smoothstep(uLitR, uLitR - 60.0, dist);
        float front = smoothstep(70.0, 0.0, abs(dist - uLitR)) * step(uLitR, 4000.0);
        c = mix(c, uPad * 0.7, ring * hasVia * (1.0 - sk.b) * (0.3 + 0.7 * on));
        // contact shadows under every part (painted into blue), printed as dots
        float ao = sk.b;
        c *= 1.0 - ao * 0.6;
        float ad = halftone(gl_FragCoord.xy, 4.0 * uPx, 0.3, ao);
        c = mix(c, uDot, ad * smoothstep(0.05, 0.5, ao) * 0.7);
        // pads (gold) and legend (white)
        float glint = pow(max(dot(reflect(-L, N), Vv), 0.0), 30.0);
        vec3 pad = uPad * (0.7 + 0.8 * glint + 0.2 * band);
        c = mix(c, pad * (0.3 + 0.7 * on), sk.g);
        // the legend: small type in the silk ink; the big district names (drawn at half strength) print opaque in a dim
        // ink one step off the mask, so they read as the board's own lettering and never as a see-through headline
        float sr = clamp(sk.r, 0.0, 1.0);
        vec3 silk = mix(uSilkDim, uSilk, smoothstep(0.62, 0.9, sr)) * (0.9 + 0.1 * hash12(floor(vW.xz * 2.0)));
        c = mix(c, silk * (0.25 + 0.75 * on), smoothstep(0.08, 0.36, sr) * 0.95);
        c = mix(c, uHot, front * (0.25 + 0.6 * (sk.r + sk.g)));
        // pings where the board is clicked
        for (int i = 0; i < 4; i++) {
          vec4 P = uPing[i];
          float age = uStep - P.z;
          if (age < 0.0 || age > 1.4) continue;
          float r = age * 240.0;
          float dd = length(vW.xz - P.xy);
          float w = 2.5 + age * 5.0;
          c = mix(c, uSignal, smoothstep(w, 0.0, abs(dd - r)) * (1.0 - age / 1.4) * P.w);
          c = mix(c, uSignal, smoothstep(w, 0.0, abs(dd - r * 0.62)) * (1.0 - age / 1.4) * P.w * 0.5);
        }
        gColor = vec4(c, 1.0);
        gNormal = vec4(N * 0.5 + 0.5, ${BOARD_ID}.0 / 255.0);
      }`,
    uniforms: { ...boardU, uDot: shared.uDotInk, uKeyDir: shared.uKeyDir, uPx: shared.uPx, uStep: shared.uStep },
  });
  const m = new THREE.Mesh(geo, mat); m.renderOrder = -10;
  // the board's edge: a slab of fibreglass under the mask
  const edge = new THREE.Mesh(new THREE.BoxGeometry(BOARD.w, 16, BOARD.h), inkMaterial({ base: '#1d2a24', brush: 0.2, spec: 0.2, rim: 0.6, id: BOARD_ID - 1 }));
  edge.position.y = -8.05;
  const g = new THREE.Group(); g.add(m, edge);
  return g;
}

/** Legend canvas: R = silkscreen, G = gold pads, B = contact shadow. Drawn additively. */
export class Silk {
  constructor(res = 4096) {
    this.c = document.createElement('canvas');
    this.c.width = res; this.c.height = Math.round(res * (BOARD.h / BOARD.w));
    this.g = this.c.getContext('2d');
    this.g.fillStyle = '#000'; this.g.fillRect(0, 0, this.c.width, this.c.height);
    this.g.globalCompositeOperation = 'lighter';
    this.k = this.c.width / BOARD.w;
    this.tex = new THREE.CanvasTexture(this.c); this.tex.colorSpace = THREE.NoColorSpace; this.tex.anisotropy = 8;
    this.tex.generateMipmaps = true; this.tex.minFilter = THREE.LinearMipmapLinearFilter;
    // contact shadows go to a quarter-size layer that is blurred once at the end
    this.a = document.createElement('canvas'); this.a.width = this.c.width >> 2; this.a.height = this.c.height >> 2;
    this.ag = this.a.getContext('2d'); this.ag.globalCompositeOperation = 'lighter'; this.ak = this.k / 4;
  }
  /** blur the shadow layer into the blue channel; call once after drawing */
  finish() {
    const g = this.g;
    g.save(); g.filter = `blur(${3 * this.k}px)`; g.drawImage(this.a, 0, 0, this.c.width, this.c.height); g.restore();
    this.tex.needsUpdate = true;
  }
  P(x, z) { return [(x + BOARD.w / 2) * this.k, (z + BOARD.h / 2) * this.k]; }
  rect(x, z, w, d, lw = 1.1) {
    const g = this.g, [X, Y] = this.P(x - w / 2, z - d / 2);
    g.strokeStyle = 'rgb(255,0,0)'; g.lineWidth = lw * this.k; g.strokeRect(X, Y, w * this.k, d * this.k);
  }
  /** outline with corner brackets and a pin-1 dot, the way footprints are drawn */
  footprint(x, z, w, d, m = 4) {
    const g = this.g; g.strokeStyle = 'rgb(255,0,0)'; g.lineWidth = 1.1 * this.k;
    const x0 = x - w / 2 - m, z0 = z - d / 2 - m, x1 = x + w / 2 + m, z1 = z + d / 2 + m, L = Math.min(w, d) * 0.22 + 3;
    for (const [cx, cz, sx, sz] of [[x0, z0, 1, 1], [x1, z0, -1, 1], [x1, z1, -1, -1], [x0, z1, 1, -1]]) this.line([[cx + sx * L, cz], [cx, cz], [cx, cz + sz * L]]);
    g.fillStyle = 'rgb(255,0,0)'; const [X, Y] = this.P(x0 - 3, z0 - 3); g.beginPath(); g.arc(X, Y, 1.5 * this.k, 0, Math.PI * 2); g.fill();
  }
  pad(x, z, w, d) { const g = this.g, [X, Y] = this.P(x - w / 2, z - d / 2); g.fillStyle = 'rgb(0,255,0)'; g.fillRect(X, Y, w * this.k, d * this.k); }
  ring(x, z, r0, r1) { const g = this.g, [X, Y] = this.P(x, z); g.fillStyle = 'rgb(0,255,0)'; g.beginPath(); g.arc(X, Y, r1 * this.k, 0, Math.PI * 2); g.arc(X, Y, r0 * this.k, 0, Math.PI * 2, true); g.fill(); }
  ao(x, z, w, d, blur = 6, s = 0.8) {
    const g = this.ag, k = this.ak, X = (x - w / 2 + BOARD.w / 2) * k, Y = (z - d / 2 + BOARD.h / 2) * k;
    g.fillStyle = `rgb(0,0,${Math.round(150 * s)})`; g.fillRect(X - blur * k * 0.5, Y - blur * k * 0.5, (w + blur) * k, (d + blur) * k);
    g.fillStyle = `rgb(0,0,${Math.round(105 * s)})`; g.fillRect(X, Y, w * k, d * k);
  }
  aoDisc(x, z, r, blur = 6, s = 0.8) {
    const g = this.ag, k = this.ak, X = (x + BOARD.w / 2) * k, Y = (z + BOARD.h / 2) * k;
    g.fillStyle = `rgb(0,0,${Math.round(150 * s)})`; g.beginPath(); g.arc(X, Y, (r + blur * 0.5) * k, 0, Math.PI * 2); g.fill();
    g.fillStyle = `rgb(0,0,${Math.round(105 * s)})`; g.beginPath(); g.arc(X, Y, r * k, 0, Math.PI * 2); g.fill();
  }
  // stretch > 1 elongates glyphs away from the reader, like road markings, so they read at a low angle
  // district names (size 16 and up) print in a thinner ink, a few steps off the mask: they read as the board's
  // own lettering and never as a second headline
  text(str, x, z, size, { weight = '600', family = '"JetBrains Mono Variable", monospace', align = 'left', rot = 0, base = 'middle', track = 0, stretch = 1, amt } = {}) {
    const g = this.g, [X, Y] = this.P(x, z);
    g.save(); g.translate(X, Y); g.rotate(rot); g.scale(1, stretch);
    g.fillStyle = `rgb(${Math.round(255 * (amt ?? (size >= 16 ? 0.5 : 1)))},0,0)`; g.font = `${weight} ${size * this.k}px ${family}`; g.textAlign = align; g.textBaseline = base;
    if (track) g.letterSpacing = `${track * this.k}px`;
    g.fillText(str, 0, 0); g.restore();
  }
  line(pts, lw = 1.1) { const g = this.g; g.strokeStyle = 'rgb(255,0,0)'; g.lineWidth = lw * this.k; g.lineJoin = 'miter'; g.beginPath(); pts.forEach(([x, z], i) => { const [X, Y] = this.P(x, z); i ? g.lineTo(X, Y) : g.moveTo(X, Y); }); g.stroke(); }
  /** diagonal hazard band around a rectangle */
  hazard(x, z, w, d, band = 10, step = 9) {
    const g = this.g, [X, Y] = this.P(x - w / 2, z - d / 2), W = w * this.k, D = d * this.k, B = band * this.k, S = step * this.k;
    g.save(); g.beginPath(); g.rect(X, Y, W, D); g.rect(X + B, Y + B, W - 2 * B, D - 2 * B); g.clip('evenodd');
    g.fillStyle = 'rgb(255,0,0)';
    for (let t = -D; t < W + D; t += S * 2) { g.beginPath(); g.moveTo(X + t, Y); g.lineTo(X + t + S, Y); g.lineTo(X + t + S - D, Y + D); g.lineTo(X + t - D, Y + D); g.fill(); }
    g.restore();
  }
  /** an svg path (in a 120-unit box) printed at x,z with a given size */
  path(d, x, z, size, { fill = true, rot = 0 } = {}) {
    const g = this.g, [X, Y] = this.P(x, z), s = (size * this.k) / 120;
    g.save(); g.translate(X, Y); g.rotate(rot); g.scale(s, s); g.translate(-60, -60);
    const p = new Path2D(d);
    if (fill) { g.fillStyle = 'rgb(255,0,0)'; g.fill(p); } else { g.strokeStyle = 'rgb(255,0,0)'; g.lineWidth = 1.2 / s * this.k; g.stroke(p); }
    g.restore();
  }
}

// ---------- traces: copper roads that carry data ----------
/** offset a 2D polyline by d with mitred joints */
export function offsetPoly(pts, d) {
  const out = [];
  for (let i = 0; i < pts.length; i++) {
    const p = pts[i], a = pts[Math.max(0, i - 1)], b = pts[Math.min(pts.length - 1, i + 1)];
    let n1 = i > 0 ? new THREE.Vector2(-(p.y - a.y), p.x - a.x).normalize() : null;
    let n2 = i < pts.length - 1 ? new THREE.Vector2(-(b.y - p.y), b.x - p.x).normalize() : null;
    if (!n1) n1 = n2; if (!n2) n2 = n1;
    const n = n1.clone().add(n2).normalize();
    const k = 1 / Math.max(0.35, n.dot(n1));
    out.push(p.clone().addScaledVector(n, d * k));
  }
  return out;
}
/** 45-degree route from a to b: straight first, then the diagonal (or the reverse) */
export function route45(a, b, diagFirst = false) {
  const dx = b[0] - a[0], dz = b[1] - a[1], ax = Math.abs(dx), az = Math.abs(dz);
  const sx = Math.sign(dx), sz = Math.sign(dz), m = Math.min(ax, az);
  let mid;
  if (diagFirst) mid = [a[0] + sx * m, a[1] + sz * m];
  else mid = ax > az ? [b[0] - sx * m, a[1]] : [a[0], b[1] - sz * m];
  return [a, mid, b];
}
export function routeChain(pts) {
  const out = [pts[0]];
  for (let i = 1; i < pts.length; i++) { const r = route45(pts[i - 1], pts[i], i % 2 === 0); out.push(r[1], r[2]); }
  return out.filter((p, i, A) => i === 0 || Math.hypot(p[0] - A[i - 1][0], p[1] - A[i - 1][1]) > 0.5);
}

export const traceU = { uBoost: { value: 0 }, uSpeed: { value: 70 }, uPkGain: { value: 0.4 }, uLive: { value: 0.7 } };
export class Traces {
  constructor() { this.pos = []; this.uv = []; this.ph = []; this.buses = []; }
  /** n parallel traces along a 2D polyline [[x, z], ...] from source to sink */
  bus(points, n = 8, pitch = 4, width = 1.6, { y = 0.3, power = false } = {}) {
    const base = points.map(([x, z]) => new THREE.Vector2(x, z));
    for (let k = 0; k < n; k++) {
      const off = (k - (n - 1) / 2) * pitch;
      this.ribbon(offsetPoly(base, off), width, y, power ? -1 : rnd());
    }
    this.buses.push({ base, n, pitch, width });
  }
  ribbon(pl, w, y, phase) {
    const L0 = offsetPoly(pl, w / 2), R0 = offsetPoly(pl, -w / 2);
    let L = 0; const lens = [0];
    for (let i = 1; i < pl.length; i++) { L += pl[i].distanceTo(pl[i - 1]); lens.push(L); }
    for (let i = 0; i < pl.length - 1; i++) {
      const a = L0[i], b = L0[i + 1], c = R0[i + 1], d = R0[i], u0 = lens[i], u1 = lens[i + 1];
      for (const [p, u] of [[a, u0], [b, u1], [c, u1], [a, u0], [c, u1], [d, u0]]) { this.pos.push(p.x, y, p.y); this.uv.push(u, L); this.ph.push(phase); }
    }
  }
  mesh(pal) {
    const g = new THREE.BufferGeometry();
    g.setAttribute('position', new THREE.Float32BufferAttribute(this.pos, 3));
    g.setAttribute('uv', new THREE.Float32BufferAttribute(this.uv, 2));
    g.setAttribute('phase', new THREE.Float32BufferAttribute(this.ph, 1));
    this.mat = new THREE.RawShaderMaterial({
      glslVersion: THREE.GLSL3,
      vertexShader: /* glsl */ `in vec3 position; in vec2 uv; in float phase; uniform mat4 modelMatrix, viewMatrix, projectionMatrix;
        out vec2 vUv; out float vPh; out vec3 vW; out vec3 vN;
        void main(){ vUv = uv; vPh = phase; vec4 w = modelMatrix * vec4(position, 1.0); vW = w.xyz; vN = normalize(mat3(viewMatrix) * vec3(0.0, 1.0, 0.0)); gl_Position = projectionMatrix * viewMatrix * w; }`,
      fragmentShader: /* glsl */ `precision highp float;
        ${NOISE}
        uniform vec3 uCopper, uHot, uSignal; uniform float uStep, uSpeed, uBoost, uLitR, uPkGain, uLive; uniform vec2 uLitC;
        uniform vec3 uFocusP; uniform float uFocusAmt, uFocusR0, uFocusR1;
        in vec2 vUv; in float vPh; in vec3 vW; in vec3 vN;
        layout(location = 0) out highp vec4 gColor; layout(location = 1) out highp vec4 gNormal;
        void main(){
          vec3 c = uCopper * (0.8 + 0.2 * sin(vUv.x * 0.05 + vPh * 6.0));
          if (vPh >= 0.0) c = mix(c, uSignal * 0.5, 0.16);
          float dist = length(vW.xz - uLitC);
          float on = step(dist, uLitR);
          float front = smoothstep(26.0, 0.0, uLitR - dist) * on;
          float id = ${BOARD_ID}.0;
          if (vPh >= 0.0 && on > 0.5) {
            // packets leave the processor and run out to the districts, stepped on twos
            float cell = 90.0 + vPh * 70.0;
            float s = vUv.x - uStep * uSpeed * (0.75 + vPh * 0.7) * (1.0 + uBoost * 0.8);
            float lane = floor(s / cell), f = fract(s / cell);
            float live = step(uLive - uBoost * 0.3, hash11(lane * 1.7 + vPh * 31.0));
            float len = 20.0 / cell;
            float pk = live * step(1.0 - len, f);
            // packets are dim dashes, brightest on the traces running into the stop you are at
            float near = 1.0 - smoothstep(uFocusR0, uFocusR1 * 1.2, length(vW - uFocusP)) * uFocusAmt;
            if (pk > 0.5) { c = mix(uSignal, uHot, step(1.0 - len * 0.28, f) * near) * uPkGain * mix(0.35, 1.0, near) * (1.0 + uBoost * 0.3); id = ${QUIET_GLOW}.0; }
          }
          if (vPh < 0.0) c *= 1.25;
          if (front > 0.01) { c = mix(c, uHot, front); id = ${QUIET_GLOW}.0; }
          if (on < 0.5) c *= 0.55;
          gColor = vec4(c, 1.0);
          gNormal = vec4(normalize(vN) * 0.5 + 0.5, id / 255.0);
        }`,
      uniforms: {
        uCopper: { value: new THREE.Color(pal.trace) }, uHot: boardU.uHot, uSignal: boardU.uSignal,
        uStep: shared.uStep, uSpeed: traceU.uSpeed, uBoost: traceU.uBoost, uLitR: boardU.uLitR, uLitC: boardU.uLitC, uPkGain: traceU.uPkGain, uLive: traceU.uLive,
        uFocusP: post.uFocusP, uFocusAmt: post.uFocusAmt, uFocusR0: post.uFocusR0, uFocusR1: post.uFocusR1,
      },
      side: THREE.DoubleSide,
    });
    const m = new THREE.Mesh(g, this.mat); m.frustumCulled = false; m.renderOrder = -5;
    return m;
  }
}

// ---------- components (instanced) ----------
export class Parts {
  constructor(pal, silk) {
    this.pal = pal; this.silk = silk; this.group = new THREE.Group();
    this.box = []; this.cyl = []; this.pins = []; this.tops = []; this.zones = [];
  }
  /** keep an area clear (a district built later stands there); parts placed inside it are dropped */
  keep(x0, z0, x1, z1) { this.zones.push([x0, z0, x1, z1]); }
  blocked(x, z, w, d) { return this.zones.some(([x0, z0, x1, z1]) => x + w / 2 > x0 && x - w / 2 < x1 && z + d / 2 > z0 && z - d / 2 < z1); }
  /** a chip: epoxy body + gull-wing pins on all four sides, footprint and shadow in the legend */
  chip(x, z, w, d, h = 4, { color = this.pal.ic, pins = true, pitch = 3.2, label = '', ao = true } = {}) {
    if (this.blocked(x, z, w + 6, d + 6)) return;
    this.box.push({ p: V(x, h / 2, z), s: V(w, h, d), c: color });
    if (this.silk) { this.silk.footprint(x, z, w + (pins ? 5 : 0), d + (pins ? 5 : 0), 3); if (ao) this.silk.ao(x, z, w + 4, d + 4, 4, 0.75); if (label) this.silk.text(label, x - w / 2 - 4, z + d / 2 + 10, 6); }
    if (!pins) return;
    for (const side of [0, 1, 2, 3]) {
      const len = side % 2 ? d : w, n = Math.max(2, Math.floor((len - 6) / pitch));
      for (let i = 0; i < n; i++) {
        const t = -len / 2 + 3 + (i + 0.5) * ((len - 6) / n);
        const out = (side % 2 ? w : d) / 2 + 1.3;
        const px = side % 2 ? (side === 1 ? out : -out) : t, pz = side % 2 ? t : side === 0 ? -out : out;
        this.pins.push({ p: V(x + px, 0.55, z + pz), s: side % 2 ? V(2.8, 1.1, 1.1) : V(1.1, 1.1, 2.8) });
        if (this.silk) this.silk.pad(x + px + (side % 2 ? (side === 1 ? 0.8 : -0.8) : 0), z + pz + (side % 2 ? 0 : side === 0 ? -0.8 : 0.8), side % 2 ? 3.6 : 1.5, side % 2 ? 1.5 : 3.6);
      }
    }
  }
  passive(x, z, w = 4, d = 2, h = 1.6, color) {
    const c = color ?? (rnd() < 0.62 ? this.pal.mlcc : this.pal.res); // drawn first, so the random sequence never shifts
    if (this.blocked(x, z, w + 3, d + 3)) return;
    this.box.push({ p: V(x, h / 2, z), s: V(w, h, d), c });
    if (this.silk) {
      if (w >= d) { this.silk.pad(x - w / 2 - 0.4, z, 1.4, d + 0.4); this.silk.pad(x + w / 2 + 0.4, z, 1.4, d + 0.4); }
      else { this.silk.pad(x, z - d / 2 - 0.4, w + 0.4, 1.4); this.silk.pad(x, z + d / 2 + 0.4, w + 0.4, 1.4); }
    }
  }
  /** electrolytic / polymer can with a lighter top disc */
  can(x, z, r = 8, h = 22, color = this.pal.can, top = this.pal.canTop) {
    if (this.blocked(x, z, r * 2 + 4, r * 2 + 4)) return;
    this.cyl.push({ p: V(x, h / 2, z), s: V(r, h, r), c: color });
    this.tops.push({ p: V(x, h + 0.35, z), s: V(r * 0.88, 0.7, r * 0.88), c: top });
    if (this.silk) { this.silk.aoDisc(x, z, r + 2, 4, 0.8); this.silk.ring(x, z, r + 1.2, r + 2.6); }
  }
  box3(x, y, z, w, h, d, color) { this.box.push({ p: V(x, y + h / 2, z), s: V(w, h, d), c: color }); }
  /** decoupling scatter: passives sprinkled in a ring around a chip */
  sprinkle(x, z, w, d, n, margin = 10, spread = 26) {
    for (let i = 0; i < n; i++) {
      const side = Math.floor(rnd() * 4), t = rnd() - 0.5, o = margin + rnd() * spread;
      const px = side % 2 ? x + (side === 1 ? 1 : -1) * (w / 2 + o) : x + t * (w + spread);
      const pz = side % 2 ? z + t * (d + spread) : z + (side === 0 ? -1 : 1) * (d / 2 + o);
      const rot = rnd() < 0.5;
      const s = rnd() < 0.8 ? 1 : 1.6;
      this.passive(px, pz, (rot ? 2.2 : 4.2) * s, (rot ? 4.2 : 2.2) * s, 1.6 * s);
    }
  }
  row(x0, z0, x1, z1, n, kind = 'cap', o = {}) {
    for (let i = 0; i < n; i++) {
      const t = n === 1 ? 0.5 : i / (n - 1), x = x0 + (x1 - x0) * t, z = z0 + (z1 - z0) * t;
      if (kind === 'can') this.can(x, z, o.r ?? 6 + rnd() * 2, o.h ?? 18 + rnd() * 8, o.color, o.top);
      else this.passive(x, z, o.w ?? 4.4, o.d ?? 2.2, o.h ?? 1.8);
    }
  }
  build() {
    const M = new THREE.Matrix4(), Q = new THREE.Quaternion(), C = new THREE.Color();
    const mk = (list, geo, mat) => {
      if (!list.length) return null;
      const im = new THREE.InstancedMesh(geo, mat, list.length);
      list.forEach((b, i) => { M.compose(b.p, Q.identity(), b.s); im.setMatrixAt(i, M); if (b.c) im.setColorAt(i, C.set(b.c)); });
      if (im.instanceColor) im.instanceColor.needsUpdate = true;
      im.frustumCulled = false; this.group.add(im); return im;
    };
    const P = this.pal;
    mk(this.box, new THREE.BoxGeometry(1, 1, 1), inkMaterial({ base: P.ic, brush: 0.12, spec: 0.55, rim: 0.9, instanced: true, instanceColor: true, dotCell: 4.5 }));
    mk(this.cyl, new THREE.CylinderGeometry(1, 1, 1, 22), inkMaterial({ base: P.can, brush: 0.12, spec: 0.9, rim: 1, instanced: true, instanceColor: true, dotCell: 4.5 }));
    mk(this.tops, new THREE.CylinderGeometry(1, 1, 1, 22), inkMaterial({ base: P.canTop, brush: 0.1, spec: 1, rim: 0.6, instanced: true, instanceColor: true }));
    mk(this.pins, new THREE.BoxGeometry(1, 1, 1), inkMaterial({ base: P.pin, brush: 0.1, spec: 1, rim: 0.5, instanced: true }));
    return this.group;
  }
}

/** merge many boxes [{p:[x,y,z], s:[w,h,d], r?:[rx,ry,rz]}] into one geometry (one id, one draw) */
export function mergedBoxes(list) {
  const pos = [], nor = [], uv = [];
  const src = new THREE.BoxGeometry(1, 1, 1).toNonIndexed();
  const sp = src.attributes.position.array, sn = src.attributes.normal.array, su = src.attributes.uv.array;
  const M = new THREE.Matrix4(), Q = new THREE.Quaternion(), v = new THREE.Vector3(), n = new THREE.Vector3(), Nm = new THREE.Matrix3();
  for (const b of list) {
    Q.setFromEuler(new THREE.Euler(...(b.r ?? [0, 0, 0])));
    M.compose(V(...b.p), Q, V(...b.s)); Nm.getNormalMatrix(M);
    for (let i = 0; i < sp.length; i += 3) {
      v.set(sp[i], sp[i + 1], sp[i + 2]).applyMatrix4(M); pos.push(v.x, v.y, v.z);
      n.set(sn[i], sn[i + 1], sn[i + 2]).applyMatrix3(Nm).normalize(); nor.push(n.x, n.y, n.z);
    }
    for (let i = 0; i < su.length; i++) uv.push(su[i]);
  }
  const g = new THREE.BufferGeometry();
  g.setAttribute('position', new THREE.Float32BufferAttribute(pos, 3));
  g.setAttribute('normal', new THREE.Float32BufferAttribute(nor, 3));
  g.setAttribute('uv', new THREE.Float32BufferAttribute(uv, 2));
  return g;
}

/** a canvas texture that can be redrawn (palette changes, late images) */
export function canvasTex(w, h, draw) {
  const c = document.createElement('canvas'); c.width = w; c.height = h;
  const g = c.getContext('2d'); draw(g, w, h);
  const tex = new THREE.CanvasTexture(c); tex.colorSpace = THREE.NoColorSpace; tex.anisotropy = 8;
  tex.userData = { redraw: () => { g.clearRect(0, 0, w, h); draw(g, w, h); tex.needsUpdate = true; } };
  return tex;
}

/** a plane carrying a canvas (screens, nameplates); faces +z */
export function labelPlane(w, h, draw, { emissive = false, res = 512, bloom = true, id } = {}) {
  const tex = canvasTex(res, Math.max(8, Math.round(res * (h / w))), draw);
  const mat = inkMaterial({ base: '#ffffff', map: tex, mapAmt: 1, emissive, bloom, spec: 0, rim: 0, brush: 0.05, id });
  const m = new THREE.Mesh(new THREE.PlaneGeometry(w, h), mat);
  m.userData.redraw = tex.userData.redraw;
  return m;
}

/**
 * Light that only adds colour: never writes depth, normals or ids (shafts, beams, dust).
 * rgb += src * a; the normal/id target gets a = 0 from the shader, so it is left untouched.
 * print: the light is printed instead, as opaque dots of its own ink (rgb = mix(dst, src, a)), so it keeps its
 * colour over whatever it falls on rather than mixing with it (warm light over the green board went lemon).
 */
export function lightMaterial({ color = '#ffffff', vertex, fragment, uniforms = {}, side = THREE.DoubleSide, print = false } = {}) {
  return new THREE.RawShaderMaterial({
    glslVersion: THREE.GLSL3,
    vertexShader: vertex, fragmentShader: fragment,
    uniforms: { uColor: { value: new THREE.Color(color) }, ...uniforms },
    transparent: true, depthWrite: false, side,
    blending: THREE.CustomBlending, blendEquation: THREE.AddEquation,
    blendSrc: THREE.SrcAlphaFactor, blendDst: print ? THREE.OneMinusSrcAlphaFactor : THREE.OneFactor,
    blendSrcAlpha: THREE.ZeroFactor, blendDstAlpha: THREE.OneFactor,
  });
}
