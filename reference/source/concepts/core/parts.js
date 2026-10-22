import * as THREE from 'three';
import { ConvexGeometry } from 'three/examples/jsm/geometries/ConvexGeometry.js';

// ---------- the rune alphabet ----------
// Ten glyphs, all compass-and-ruler, derived from the mark's geometry (the X / N loop, its diagonals,
// its corner nodes). Drawn into a strip: R = engraved groove, G = energy channel.
const GLYPHS = {
  loop: (g, s) => { g.moveTo(-s, -s); g.lineTo(s, s); g.lineTo(s, -s); g.lineTo(-s, s); g.closePath(); },
  cross: (g, s) => { g.moveTo(-s, -s); g.lineTo(s, s); g.moveTo(s, -s); g.lineTo(-s, s); g.moveTo(s * 0.32, 0); g.arc(0, 0, s * 0.32, 0, Math.PI * 2); },
  n: (g, s) => { g.moveTo(-s, s); g.lineTo(-s, -s); g.lineTo(s, s); g.lineTo(s, -s); },
  axis: (g, s) => { g.moveTo(s * 0.8, 0); g.arc(0, 0, s * 0.8, 0, Math.PI * 2); g.moveTo(0, -s); g.lineTo(0, s); },
  hex: (g, s) => { for (let i = 0; i <= 6; i++) { const a = (i / 6) * Math.PI * 2 + Math.PI / 6; const x = Math.cos(a) * s, y = Math.sin(a) * s; i ? g.lineTo(x, y) : g.moveTo(x, y); } g.moveTo(s * 0.18, 0); g.arc(0, 0, s * 0.18, 0, Math.PI * 2); },
  arch: (g, s) => { g.moveTo(-s, s); g.lineTo(-s, 0); g.arc(0, 0, s, Math.PI, 0); g.lineTo(s, s); g.moveTo(0, -s * 0.2); g.lineTo(0, s); },
  spiral: (g, s) => { // quarter arcs on a golden ratio: emergence
    let r = s, cx = 0, cy = 0, a = 0; const k = 0.618;
    g.moveTo(cx + r, cy);
    for (let i = 0; i < 4; i++) { g.arc(cx, cy, r, a, a + Math.PI / 2); const nr = r * k; cx += Math.cos(a + Math.PI / 2) * (r - nr); cy += Math.sin(a + Math.PI / 2) * (r - nr); r = nr; a += Math.PI / 2; }
  },
  lock: (g, s) => { g.rect(-s * 0.7, -s * 0.1, s * 1.4, s * 1.1); g.moveTo(-s * 0.42, -s * 0.1); g.lineTo(-s * 0.42, -s * 0.5); g.arc(0, -s * 0.5, s * 0.42, Math.PI, 0); g.lineTo(s * 0.42, -s * 0.1); g.moveTo(0, s * 0.3); g.lineTo(0, s * 0.6); },
  nodes: (g, s) => { const P = [[-s, s * 0.6], [0, -s], [s, s * 0.4], [s * 0.1, s * 0.9]]; g.moveTo(...P[0]); for (const p of P.slice(1)) g.lineTo(...p); for (const [x, y] of P) { g.moveTo(x + s * 0.16, y); g.arc(x, y, s * 0.16, 0, Math.PI * 2); } },
  tri: (g, s) => { g.moveTo(0, -s); g.lineTo(s, s * 0.8); g.lineTo(-s, s * 0.8); g.closePath(); g.moveTo(0, -s * 0.2); g.lineTo(0, s * 0.8); },
};
export const GLYPH_NAMES = Object.keys(GLYPHS);

export function drawGlyph(g, name, x, y, s) {
  g.save(); g.translate(x, y); g.beginPath(); GLYPHS[name](g, s); g.restore();
}

/** One ring's rune strip. Returns a texture; the sequence is seeded so every ring reads differently. */
export function runeStrip(seq, { width = 2048, height = 96, slots = 16 } = {}) {
  const c = document.createElement('canvas'); c.width = width; c.height = height;
  const g = c.getContext('2d');
  g.fillStyle = '#000'; g.fillRect(0, 0, width, height);
  const cell = width / slots, s = height * 0.27, cy = height / 2;
  g.lineCap = 'round'; g.lineJoin = 'round';
  for (let i = 0; i < slots; i++) {
    const cx = (i + 0.5) * cell;
    const name = seq[i % seq.length];
    // groove (wide) in red, energy (thin) in green: draw groove first, then energy on top
    drawGlyph(g, name, cx, cy, s); g.strokeStyle = 'rgb(255,0,0)'; g.lineWidth = height * 0.11; g.stroke();
    drawGlyph(g, name, cx, cy, s); g.strokeStyle = 'rgb(255,255,0)'; g.lineWidth = height * 0.045; g.stroke();
    // ticks between glyphs (engraved only)
    g.strokeStyle = 'rgb(255,0,0)'; g.lineWidth = 3;
    for (let k = 1; k < 6; k++) {
      const x = i * cell + (k / 6) * cell * 0.36 + cell * 0.82 - cell * 0.18;
      const hgt = k === 3 ? height * 0.34 : height * 0.18;
      g.beginPath(); g.moveTo(x, cy - hgt / 2); g.lineTo(x, cy + hgt / 2); g.stroke();
    }
  }
  // fine rule lines along both edges
  g.fillStyle = 'rgb(255,0,0)'; g.fillRect(0, height * 0.1, width, 2); g.fillRect(0, height * 0.9 - 2, width, 2);
  const t = new THREE.CanvasTexture(c);
  t.colorSpace = THREE.NoColorSpace; t.wrapS = THREE.RepeatWrapping; t.anisotropy = 8;
  return t;
}

// ---------- geometry ----------

/** A flat armillary band around the Y axis: chamfered rectangular profile, flat normals per face.
 *  Attributes: position, normal, uv (u around, v across the outer face), tangent3 (around), face
 *  (0 outer, 1 top/bottom, 2 inner, 3 chamfer). */
export function ringGeometry(R, h, t, { chamfer = 0.012, segs = 240 } = {}) {
  const ro = R + t / 2, ri = R - t / 2, hy = h / 2, c = chamfer;
  const prof = [
    [[ro, -hy + c], [ro, hy - c], 0], [[ro, hy - c], [ro - c, hy], 3], [[ro - c, hy], [ri + c, hy], 1], [[ri + c, hy], [ri, hy - c], 3],
    [[ri, hy - c], [ri, -hy + c], 2], [[ri, -hy + c], [ri + c, -hy], 3], [[ri + c, -hy], [ro - c, -hy], 1], [[ro - c, -hy], [ro, -hy + c], 3],
  ];
  const pos = [], nor = [], uv = [], tan = [], face = [];
  for (let k = 0; k < segs; k++) {
    const a0 = (k / segs) * Math.PI * 2, a1 = ((k + 1) / segs) * Math.PI * 2;
    for (const [A, B, f] of prof) {
      const dr = B[0] - A[0], dy = B[1] - A[1], l = Math.hypot(dr, dy);
      const nr = dy / l, ny = -dr / l;
      const P = (pt, a) => [pt[0] * Math.cos(a), pt[1], pt[0] * Math.sin(a)];
      const N = (a) => [nr * Math.cos(a), ny, nr * Math.sin(a)];
      const T = (a) => [-Math.sin(a), 0, Math.cos(a)];
      const vA = f === 0 ? 0 : 0.5, vB = f === 0 ? 1 : 0.5;
      const verts = [[A, a0, vA], [B, a0, vB], [B, a1, vB], [A, a0, vA], [B, a1, vB], [A, a1, vA]];
      for (const [pt, a, v] of verts) {
        pos.push(...P(pt, a)); nor.push(...N(a)); tan.push(...T(a)); uv.push(a / (Math.PI * 2), v); face.push(f);
      }
    }
  }
  const g = new THREE.BufferGeometry();
  g.setAttribute('position', new THREE.Float32BufferAttribute(pos, 3));
  g.setAttribute('normal', new THREE.Float32BufferAttribute(nor, 3));
  g.setAttribute('uv', new THREE.Float32BufferAttribute(uv, 2));
  g.setAttribute('tangent3', new THREE.Float32BufferAttribute(tan, 3));
  g.setAttribute('face', new THREE.Float32BufferAttribute(face, 1));
  return g;
}

/** The crystal heart: an irregular hexagonal bipyramid with a waist. */
export function crystalGeometry(seed = 3, { h = 1.5, r = 0.3, sides = 7 } = {}) {
  let s = seed; const rnd = () => ((s = (s * 16807) % 2147483647) / 2147483647);
  const pts = [new THREE.Vector3(0.02, h * 0.55, 0.01), new THREE.Vector3(-0.01, -h * 0.45, 0.02)];
  for (const [y, k] of [[h * 0.08, 1.0], [-h * 0.1, 0.92], [h * 0.26, 0.62], [-h * 0.24, 0.6]]) {
    for (let i = 0; i < sides; i++) {
      const a = (i / sides) * Math.PI * 2 + rnd() * 0.25 + y;
      const rr = r * k * (0.85 + rnd() * 0.3);
      pts.push(new THREE.Vector3(Math.cos(a) * rr, y + (rnd() - 0.5) * 0.06, Math.sin(a) * rr));
    }
  }
  const g = new ConvexGeometry(pts);
  return g.index ? g.toNonIndexed() : g;
}

/** A shard for growth / sparks. */
export function shardGeometry() {
  const pts = [[0, 0.5, 0], [0.09, 0, 0.05], [-0.07, 0, 0.07], [0.02, 0, -0.09], [0, -0.22, 0]].map((p) => new THREE.Vector3(...p));
  const g = new ConvexGeometry(pts);
  return g.index ? g.toNonIndexed() : g;
}

/** Art Deco finial (lathe profile), pointing up from y=0. */
export function finialGeometry(scale = 1) {
  const P = [[0, 0], [0.09, 0], [0.09, 0.03], [0.06, 0.045], [0.06, 0.07], [0.11, 0.09], [0.11, 0.12], [0.045, 0.15], [0.03, 0.34], [0.07, 0.37], [0.07, 0.39], [0.025, 0.42], [0.012, 0.58], [0, 0.62]];
  const g = new THREE.LatheGeometry(P.map(([x, y]) => new THREE.Vector2(x * scale, y * scale)), 24);
  return g.toNonIndexed();
}

/** A brass frame plate for a project: a box with a recessed window. Returns { frame, window } geometries. */
export function plateGeometry(w = 1.25, hgt = 0.86, d = 0.06, border = 0.07) {
  const frame = new THREE.BufferGeometry();
  const outer = new THREE.Shape([new THREE.Vector2(-w / 2, -hgt / 2), new THREE.Vector2(w / 2, -hgt / 2), new THREE.Vector2(w / 2, hgt / 2), new THREE.Vector2(-w / 2, hgt / 2)]);
  // notched Deco corners
  const iw = w / 2 - border, ih = hgt / 2 - border, n = 0.05;
  outer.holes.push(new THREE.Path([new THREE.Vector2(-iw + n, -ih), new THREE.Vector2(iw - n, -ih), new THREE.Vector2(iw, -ih + n), new THREE.Vector2(iw, ih - n), new THREE.Vector2(iw - n, ih), new THREE.Vector2(-iw + n, ih), new THREE.Vector2(-iw, ih - n), new THREE.Vector2(-iw, -ih + n)]));
  const fg = new THREE.ExtrudeGeometry(outer, { depth: d, bevelEnabled: true, bevelThickness: 0.012, bevelSize: 0.012, bevelSegments: 1 }).toNonIndexed();
  fg.translate(0, 0, -d / 2);
  const win = new THREE.PlaneGeometry(iw * 2, ih * 2);
  win.translate(0, 0, -d * 0.1);
  return { frame: fg, window: win, iw, ih };
}

// ---------- glyphs as SVG (same drawing commands, recorded into a path string) ----------
class PathRecorder {
  constructor(tx = 0, ty = 0) { this.d = []; this.tx = tx; this.ty = ty; this.cx = 0; this.cy = 0; this.sx = 0; this.sy = 0; }
  P(x, y) { return `${(x + this.tx).toFixed(2)},${(y + this.ty).toFixed(2)}`; }
  moveTo(x, y) { this.d.push('M' + this.P(x, y)); this.cx = x; this.cy = y; this.sx = x; this.sy = y; }
  lineTo(x, y) { this.d.push('L' + this.P(x, y)); this.cx = x; this.cy = y; }
  closePath() { this.d.push('Z'); this.cx = this.sx; this.cy = this.sy; }
  rect(x, y, w, h) { this.moveTo(x, y); this.lineTo(x + w, y); this.lineTo(x + w, y + h); this.lineTo(x, y + h); this.closePath(); }
  arc(x, y, r, a0, a1) {
    const sx = x + Math.cos(a0) * r, sy = y + Math.sin(a0) * r;
    if (this.d.length && Math.hypot(sx - this.cx, sy - this.cy) > 1e-3) this.lineTo(sx, sy); else if (!this.d.length) this.moveTo(sx, sy);
    let span = a1 - a0;
    if (Math.abs(span) >= Math.PI * 2 - 1e-6) { // full circle: two halves
      const mx = x + Math.cos(a0 + Math.PI) * r, my = y + Math.sin(a0 + Math.PI) * r;
      this.d.push(`A${r.toFixed(2)},${r.toFixed(2)} 0 0 1 ${this.P(mx, my)}`, `A${r.toFixed(2)},${r.toFixed(2)} 0 0 1 ${this.P(sx, sy)}`);
      this.cx = sx; this.cy = sy; return;
    }
    const ex = x + Math.cos(a1) * r, ey = y + Math.sin(a1) * r;
    this.d.push(`A${r.toFixed(2)},${r.toFixed(2)} 0 ${Math.abs(span) > Math.PI ? 1 : 0} ${span > 0 ? 1 : 0} ${this.P(ex, ey)}`);
    this.cx = ex; this.cy = ey;
  }
  beginPath() {}
  save() {} restore() {} translate() {}
}
export function glyphPath(name, s = 10, cx = 12, cy = 12) {
  const r = new PathRecorder(cx, cy);
  GLYPHS[name](r, s);
  return r.d.join(' ');
}
export function glyphSVG(name, cls = 'glyph') {
  return `<svg class="${cls}" viewBox="0 0 24 24" aria-hidden="true"><path d="${glyphPath(name)}"/></svg>`;
}
/** The sigil: the mark's loop inside a ring with hex nodes and radial ticks (compass-and-ruler). */
export function sigilSVG(cls = 'sigil') {
  const c = 60, ticks = [];
  for (let i = 0; i < 24; i++) {
    const a = (i / 24) * Math.PI * 2, r0 = i % 6 === 0 ? 47 : 51, r1 = 55;
    ticks.push(`M${(c + Math.cos(a) * r0).toFixed(1)},${(c + Math.sin(a) * r0).toFixed(1)}L${(c + Math.cos(a) * r1).toFixed(1)},${(c + Math.sin(a) * r1).toFixed(1)}`);
  }
  const s = 24;
  const loop = `M${c - s},${c - s * 1.2}L${c + s},${c + s * 1.2}L${c + s},${c - s * 1.2}L${c - s},${c + s * 1.2}Z`;
  const nodes = [[c - s, c - s * 1.2], [c + s, c + s * 1.2], [c + s, c - s * 1.2], [c - s, c + s * 1.2]].map(([x, y]) => `<circle cx="${x}" cy="${y}" r="4.2"/>`).join('');
  return `<svg class="${cls}" viewBox="0 0 120 120" role="img" aria-label="Xini"><circle class="sigil__ring" cx="60" cy="60" r="44"/><path class="sigil__ticks" d="${ticks.join('')}"/><path class="sigil__loop" d="${loop}"/><g class="sigil__nodes">${nodes}</g><circle class="sigil__core" cx="60" cy="60" r="5"/></svg>`;
}
