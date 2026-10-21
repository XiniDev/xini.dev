import * as THREE from 'three';
import { DecalGeometry } from 'three/examples/jsm/geometries/DecalGeometry.js';

// Paint splats (Splatoon / Jet Set Radio grammar): a solid core, satellites on a power-law size curve,
// spikes along the impact direction, 1–3 drips that run down and stop. Flat ink, one enamel highlight,
// one dark keyline. Splats are earned (clicks only) and accumulate for the session.

const rng = (seed) => { let s = seed >>> 0 || 1; return () => ((s = (s * 1664525 + 1013904223) >>> 0) / 4294967296); };

/** Geometry of one splat, in units of its radius R (centre 0,0; y down). */
export function splatShape(seed, dir = [0, 1]) {
  const r = rng(seed);
  const n = 26, core = [];
  const ph = r() * 6.28;
  for (let i = 0; i < n; i++) {
    const a = (i / n) * Math.PI * 2;
    const wob = 1 + 0.16 * Math.sin(a * 3 + ph) + 0.1 * Math.sin(a * 5 + ph * 2) + (r() - 0.5) * 0.12;
    const along = Math.max(0, Math.cos(a - Math.atan2(dir[1], dir[0])));
    core.push([Math.cos(a) * wob * (1 + along * 0.25), Math.sin(a) * wob * (1 + along * 0.25)]);
  }
  const da = Math.atan2(dir[1], dir[0]);
  const sats = [];
  const ns = 5 + Math.floor(r() * 5);
  for (let i = 0; i < ns; i++) {
    const a = da + (r() - 0.5) * 2.6;
    const d = 1.25 + Math.pow(r(), 0.7) * 1.1;
    sats.push({ x: Math.cos(a) * d, y: Math.sin(a) * d, s: 0.06 + Math.pow(r(), 2.2) * 0.22 });
  }
  const spikes = [];
  const nk = 3 + Math.floor(r() * 4);
  for (let i = 0; i < nk; i++) {
    const a = da + (r() - 0.5) * 1.9;
    spikes.push({ a, len: 1.35 + r() * 0.9, w: 0.1 + r() * 0.12 });
  }
  const drips = [];
  const nd = 1 + Math.floor(r() * 3);
  for (let i = 0; i < nd; i++) drips.push({ x: (r() - 0.5) * 1.3, w: 0.09 + r() * 0.1, len: 0.9 + r() * 1.6 });
  return { core, sats, spikes, drips };
}

/** Draw a splat into a 2D canvas context at (cx, cy) with radius R. drip in [0,1] reveals the drips. */
export function drawSplat(g, cx, cy, R, shape, { color = '#e8322b', light = '#ff8a7a', dark = '#7a0e12', ink = '#0b0a0d', drip = 1, keyline = true } = {}) {
  const path = (offX = 0, offY = 0, grow = 0) => {
    const p = new Path2D();
    const k = 1 + grow;
    shape.core.forEach(([x, y], i) => { const X = cx + offX + x * R * k, Y = cy + offY + y * R * k; i ? p.lineTo(X, Y) : p.moveTo(X, Y); });
    p.closePath();
    for (const s of shape.sats) { p.moveTo(cx + offX + (s.x * R) + s.s * R * k, cy + offY + s.y * R); p.arc(cx + offX + s.x * R, cy + offY + s.y * R, s.s * R * k, 0, Math.PI * 2); }
    for (const s of shape.spikes) {
      const ca = Math.cos(s.a), sa = Math.sin(s.a), px = -sa, py = ca;
      const bx = cx + offX + ca * R * 0.7, by = cy + offY + sa * R * 0.7;
      p.moveTo(bx + px * s.w * R * k, by + py * s.w * R * k);
      p.lineTo(cx + offX + ca * s.len * R * k, cy + offY + sa * s.len * R * k);
      p.lineTo(bx - px * s.w * R * k, by - py * s.w * R * k);
      p.closePath();
    }
    for (const d of shape.drips) {
      const L = d.len * R * Math.min(1, drip);
      if (L < 1) continue;
      const x = cx + offX + d.x * R, w = d.w * R * k, top = cy + offY + R * 0.5;
      p.moveTo(x - w, top); p.lineTo(x - w, top + L); p.arc(x, top + L, w, Math.PI, 0, true); p.lineTo(x + w, top); p.closePath();
    }
    return p;
  };
  g.save();
  if (keyline) { g.lineJoin = 'round'; g.strokeStyle = ink; g.lineWidth = Math.max(2, R * 0.09); g.stroke(path()); }
  g.fillStyle = dark; g.fill(path(R * 0.05, R * 0.06));
  g.fillStyle = color; g.fill(path());
  // enamel highlight: one shape, upper left
  g.fillStyle = light;
  g.beginPath();
  g.ellipse(cx - R * 0.32, cy - R * 0.36, R * 0.32, R * 0.15, -0.5, 0, Math.PI * 2);
  g.fill();
  g.beginPath(); g.ellipse(cx - R * 0.02, cy - R * 0.55, R * 0.08, R * 0.05, -0.5, 0, Math.PI * 2); g.fill();
  g.restore();
}

/** Splats on the paper page: a screen-space canvas the page shader samples. */
export class PaperPaint {
  constructor(scale = 0.5) {
    this.scale = scale;
    this.canvas = document.createElement('canvas');
    this.g = this.canvas.getContext('2d');
    this.tex = new THREE.CanvasTexture(this.canvas);
    this.tex.colorSpace = THREE.NoColorSpace;
    this.tex.minFilter = THREE.LinearFilter; this.tex.generateMipmaps = false;
    this.live = [];
    this.resize(innerWidth, innerHeight);
  }
  resize(w, h) {
    const W = Math.max(2, Math.round(w * this.scale)), H = Math.max(2, Math.round(h * this.scale));
    if (W === this.canvas.width && H === this.canvas.height) return;
    const old = this.canvas.width > 2 ? this.g.getImageData(0, 0, this.canvas.width, this.canvas.height) : null;
    this.canvas.width = W; this.canvas.height = H;
    if (old) this.g.putImageData(old, 0, 0);
    this.tex.dispose();
    this.tex.needsUpdate = true;
  }
  add(x, y, R, colors, seed = (Math.random() * 1e9) | 0, dir = [0, 1]) {
    const s = splatShape(seed, dir);
    const k = this.scale;
    this.live.push({ x: x * k, y: y * k, R: R * k, s, colors, t: 0 });
    drawSplat(this.g, x * k, y * k, R * k, { ...s, drips: [] }, { ...colors });
    this.tex.needsUpdate = true;
  }
  /** grow drips on twos */
  update(dt) {
    if (!this.live.length) return;
    this._acc = (this._acc || 0) + dt;
    if (this._acc < 1 / 12) return;
    this._acc = 0;
    for (const p of this.live) {
      p.t = Math.min(1, p.t + 1 / 12 / 0.9);
      // redraw only the drips (drawn under, then the core again to keep edges clean)
      drawSplat(this.g, p.x, p.y, p.R, { core: p.s.core, sats: [], spikes: [], drips: p.s.drips }, { ...p.colors, drip: p.t });
    }
    this.live = this.live.filter((p) => p.t < 1);
    this.tex.needsUpdate = true;
  }
  clear() { this.g.clearRect(0, 0, this.canvas.width, this.canvas.height); this.tex.needsUpdate = true; }
}

const DECAL_VERT = /* glsl */ `
in vec3 position; in vec3 normal; in vec2 uv;
uniform mat4 modelViewMatrix, projectionMatrix, viewMatrix, modelMatrix;
out vec2 vUv; out vec3 vN;
void main(){ vUv = uv; vN = normalize(mat3(viewMatrix) * mat3(modelMatrix) * normal); gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0); }`;
const DECAL_FRAG = /* glsl */ `
precision highp float;
uniform sampler2D uMap; uniform float uId;
in vec2 vUv; in vec3 vN;
layout(location = 0) out highp vec4 gColor; layout(location = 1) out highp vec4 gNormal;
void main(){
  vec4 c = texture(uMap, vUv);
  if (c.a < 0.5) discard;
  gColor = vec4(c.rgb, 1.0);
  gNormal = vec4(normalize(vN) * 0.5 + 0.5, uId / 255.0);
}`;

/** Splats on 3D surfaces: projected decals with their own canvas so drips can run. */
export class DecalPaint {
  constructor(scene, { max = 24 } = {}) {
    this.scene = scene; this.max = max; this.items = [];
  }
  add(hit, size, colors, upWorld = new THREE.Vector3(0, 1, 0)) {
    const mesh = hit.object;
    const n = hit.face ? hit.face.normal.clone().transformDirection(mesh.matrixWorld) : new THREE.Vector3(0, 0, 1);
    // orient: decal z along the surface normal, decal -y along world down projected on the surface
    const z = n.clone().normalize();
    let down = new THREE.Vector3(0, -1, 0).sub(z.clone().multiplyScalar(-z.y));
    if (down.lengthSq() < 1e-4) down = new THREE.Vector3(0, 0, 1);
    down.normalize();
    const y = down.clone().negate();
    const x = new THREE.Vector3().crossVectors(y, z).normalize();
    const m = new THREE.Matrix4().makeBasis(x, y, z);
    const euler = new THREE.Euler().setFromRotationMatrix(m);
    const S = 256, cv = document.createElement('canvas'); cv.width = S; cv.height = S * 2;
    const g = cv.getContext('2d');
    const shape = splatShape((Math.random() * 1e9) | 0, [0, 1]);
    const tex = new THREE.CanvasTexture(cv); tex.colorSpace = THREE.NoColorSpace;
    const item = { cv, g, shape, tex, t: 0, colors };
    const draw = () => { g.clearRect(0, 0, S, S * 2); drawSplat(g, S / 2, S / 2, S * 0.26, shape, { ...colors, drip: item.t }); tex.needsUpdate = true; };
    item.draw = draw; draw();
    // the decal box is twice as tall as wide (drips run below); centre shifted down by half a size
    const centre = hit.point.clone().add(down.clone().multiplyScalar(size * 0.5));
    const geo = new DecalGeometry(mesh, centre, euler, new THREE.Vector3(size, size * 2, size * 0.8));
    const mat = new THREE.RawShaderMaterial({
      glslVersion: THREE.GLSL3, vertexShader: DECAL_VERT, fragmentShader: DECAL_FRAG,
      uniforms: { uMap: { value: tex }, uId: { value: 232 + (this.items.length % 18) } },
      polygonOffset: true, polygonOffsetFactor: -4, polygonOffsetUnits: -4, depthWrite: true,
    });
    item.mesh = new THREE.Mesh(geo, mat);
    item.mesh.frustumCulled = false;
    item.mesh.userData.noShadow = true; item.mesh.userData.decal = true;
    // pop in on twos: 0.6 -> 1.05 -> 1.0 (scale about the hit point)
    item.pop = 0;
    this.scene.add(item.mesh);
    this.items.push(item);
    if (this.items.length > this.max) { const old = this.items.shift(); this.scene.remove(old.mesh); old.mesh.geometry.dispose(); old.tex.dispose(); }
    return item;
  }
  update(dt) {
    this._acc = (this._acc || 0) + dt;
    if (this._acc < 1 / 12) return;
    this._acc = 0;
    for (const it of this.items) if (it.t < 1) { it.t = Math.min(1, it.t + 1 / 12 / 0.9); it.draw(); }
  }
}
