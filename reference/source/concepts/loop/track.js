import * as THREE from 'three';
import { inkMaterial, glowId, newInkId } from '../../shared/gfx/ink-material.js';

// The mark as a maglev track: the folded-X loop (TL → BR → TR → BL → TL), corners filleted, the two
// diagonals crossing with one branch bridging over the other. Parameter s runs 0..1 from BL up the
// left side, so stations can be placed in route order.

export const S = 125;          // metres per mark unit
export const BASE_Y = 140;
const W = 1.56, H = 1.62;

function corners() {
  // 2D mark (x right, y up) → world XZ (z = -y so the logo reads from the south)
  const P2 = { TL: [-W / 2, H / 2], BR: [W / 2, -H / 2], TR: [W / 2, H / 2], BL: [-W / 2, -H / 2] };
  const order = ['BL', 'TL', 'BR', 'TR'];          // BL up to TL, diagonal to BR, up to TR, diagonal back to BL
  return order.map((k) => new THREE.Vector2(P2[k][0] * S, -P2[k][1] * S));
}

/** Filleted closed polyline through the corners (arc radius in metres). */
function filleted(pts, radius = 26, steps = 10) {
  const out = [];
  const n = pts.length;
  for (let i = 0; i < n; i++) {
    const p = pts[i], a = pts[(i - 1 + n) % n], b = pts[(i + 1) % n];
    const da = a.clone().sub(p).normalize(), db = b.clone().sub(p).normalize();
    const ang = Math.acos(THREE.MathUtils.clamp(da.dot(db), -1, 1));
    const cut = Math.min(radius / Math.tan(ang / 2), p.distanceTo(a) * 0.4, p.distanceTo(b) * 0.4);
    const p0 = p.clone().addScaledVector(da, cut), p1 = p.clone().addScaledVector(db, cut);
    // quadratic bezier from p0 via p to p1 (smooth fillet)
    for (let k = 0; k <= steps; k++) {
      const t = k / steps;
      const q = p0.clone().multiplyScalar((1 - t) ** 2).add(p.clone().multiplyScalar(2 * (1 - t) * t)).add(p1.clone().multiplyScalar(t * t));
      out.push(q);
    }
  }
  return out;
}

export class Track {
  constructor() {
    const pts2 = filleted(corners());
    // heights: the two diagonals cross at the centre; the first dips under, the second bridges over
    const pts = pts2.map((p) => new THREE.Vector3(p.x, BASE_Y, p.y));
    const c3 = new THREE.CatmullRomCurve3(pts, true, 'centripetal', 0.5);
    // resample evenly, then add the crossing bump by which diagonal we're on
    const N = 1600;
    const raw = c3.getSpacedPoints(N);
    raw.pop();
    const crossing = new THREE.Vector2(0, 0);
    const res = raw.map((p, i) => {
      const s = i / N;
      const d = Math.hypot(p.x - crossing.x, p.z - crossing.y);
      const g = Math.exp(-(d * d) / (2 * 42 * 42));
      // diagonal 1 is the segment TL→BR (second quarter); diagonal 2 is TR→BL (last quarter)
      const sign = s > 0.25 && s < 0.5 ? -1 : s > 0.75 ? 1 : 0;
      return new THREE.Vector3(p.x, BASE_Y + sign * 13 * g + Math.sin(s * Math.PI * 4) * 3, p.z);
    });
    this.curve = new THREE.CatmullRomCurve3(res, true, 'centripetal', 0.5);
    this.length = this.curve.getLength();
    this.frames = this.buildFrames(2000);
  }
  /** position, tangent, side, up (banked) at s */
  frameAt(s) {
    s = ((s % 1) + 1) % 1;
    const f = this.frames, n = f.length;
    const x = s * n, i = Math.floor(x) % n, j = (i + 1) % n, k = x - Math.floor(x);
    const lerp = (a, b) => a.clone().lerp(b, k);
    return { p: lerp(f[i].p, f[j].p), t: lerp(f[i].t, f[j].t).normalize(), side: lerp(f[i].side, f[j].side).normalize(), up: lerp(f[i].up, f[j].up).normalize() };
  }
  buildFrames(n) {
    const out = [];
    const up0 = new THREE.Vector3(0, 1, 0);
    for (let i = 0; i < n; i++) {
      const s = i / n;
      const p = this.curve.getPointAt(s);
      const t = this.curve.getTangentAt(s);
      const t2 = this.curve.getTangentAt((s + 4 / n) % 1);
      const turn = new THREE.Vector3().crossVectors(t, t2).y;          // signed curvature-ish
      const bank = THREE.MathUtils.clamp(-turn * 18, -0.5, 0.5);
      const side = new THREE.Vector3().crossVectors(t, up0).normalize();
      const up = up0.clone().applyAxisAngle(t, bank);
      side.applyAxisAngle(t, bank);
      out.push({ p, t, side, up });
    }
    // smooth the banking
    for (let pass = 0; pass < 6; pass++) for (let i = 0; i < n; i++) {
      const a = out[(i - 1 + n) % n], b = out[(i + 1) % n];
      out[i].up = out[i].up.clone().add(a.up).add(b.up).normalize();
      out[i].side = new THREE.Vector3().crossVectors(out[i].t, out[i].up).normalize();
    }
    return out;
  }
  /** sweep a closed 2D profile ([[x, y]] in the side/up plane) along the track */
  sweep(profile, { segs = 1600, flat = true, centred = false } = {}) {
    const pos = [], nor = [], uv = [], cen = [], off = [];
    const pc = profile.reduce((a, q) => [a[0] + q[0] / profile.length, a[1] + q[1] / profile.length], [0, 0]);
    const m = profile.length;
    const F = Array.from({ length: segs + 1 }, (_, i) => this.frameAt(i / segs));
    const P = (f, q) => f.p.clone().addScaledVector(f.side, q[0]).addScaledVector(f.up, q[1]);
    for (let i = 0; i < segs; i++) {
      const f0 = F[i], f1 = F[i + 1];
      for (let k = 0; k < m; k++) {
        const qa = profile[k], qb = profile[(k + 1) % m];
        const a0 = P(f0, qa), b0 = P(f0, qb), a1 = P(f1, qa), b1 = P(f1, qb);
        const n0 = new THREE.Vector3().crossVectors(b0.clone().sub(a0), a1.clone().sub(a0)).normalize();
        for (const v of [a0, a1, b1, a0, b1, b0]) { pos.push(v.x, v.y, v.z); nor.push(n0.x, n0.y, n0.z); }
        if (centred) {
          const c0 = P(f0, pc), c1 = P(f1, pc);
          for (const [v, c] of [[a0, c0], [a1, c1], [b1, c1], [a0, c0], [b1, c1], [b0, c0]]) { cen.push(c.x, c.y, c.z); off.push(v.x - c.x, v.y - c.y, v.z - c.z); }
        }
        const u0 = i / segs, u1 = (i + 1) / segs, w0 = k / m, w1 = (k + 1) / m;
        uv.push(u0, w0, u1, w0, u1, w1, u0, w0, u1, w1, u0, w1);
      }
    }
    const g = new THREE.BufferGeometry();
    g.setAttribute('position', new THREE.Float32BufferAttribute(pos, 3));
    g.setAttribute('normal', new THREE.Float32BufferAttribute(nor, 3));
    g.setAttribute('uv', new THREE.Float32BufferAttribute(uv, 2));
    if (centred) { g.setAttribute('aCenter', new THREE.Float32BufferAttribute(cen, 3)); g.setAttribute('aOff', new THREE.Float32BufferAttribute(off, 3)); }
    return g;
  }
}

export function buildTrackMeshes(track, pal) {
  const g = new THREE.Group();
  // deck: a tapered beam with a lip, 9 m wide
  const deck = [[-6.5, 0.8], [-6.5, 0], [-4.6, -2.6], [4.6, -2.6], [6.5, 0], [6.5, 0.8], [5.4, 0.8], [5.4, 0.4], [-5.4, 0.4], [-5.4, 0.8]];
  const deckMat = inkMaterial({ base: pal.deck, brush: 0.2, brushScale: 0.08, spec: 0.35, rim: 0.12, dotCell: 5, mid: 0.36, dark: 0.74 });
  const deckMesh = new THREE.Mesh(track.sweep(deck.slice().reverse()), deckMat);
  g.add(deckMesh);
  // neon strips under each lip and the guide rail on top
  const strip = (x, y, w, h) => [[x - w, y - h], [x + w, y - h], [x + w, y + h], [x - w, y + h]];
  const neonMat = inkMaterial({ base: pal.neon, emissive: true });
  const railMat = inkMaterial({ base: pal.rail, emissive: true, bloom: false });
  for (const x of [-6.62, 6.62]) g.add(new THREE.Mesh(track.sweep(strip(x, 0.35, 0.16, 0.28), { centred: true }), neonMat));
  for (const x of [-1.8, 1.8]) g.add(new THREE.Mesh(track.sweep(strip(x, 0.55, 0.22, 0.1)), railMat));
  g.userData.neonMat = neonMat; g.userData.railMat = railMat; g.userData.deckMat = deckMat;
  // pylons every ~34 m down into the clouds (instanced), with a Y head
  const pyl = new THREE.CylinderGeometry(1.1, 2.2, 1, 8); pyl.translate(0, -0.5, 0);
  const n = Math.floor(track.length / 34);
  const pylMat = inkMaterial({ base: pal.pylon, instanced: true, brush: 0.2, spec: 0.3, rim: 0.5 });
  const pylons = new THREE.InstancedMesh(pyl, pylMat, n);
  const M = new THREE.Matrix4(), Q = new THREE.Quaternion(), Sv = new THREE.Vector3();
  for (let i = 0; i < n; i++) {
    const f = track.frameAt(i / n);
    const top = f.p.clone().addScaledVector(f.up, -2.6);
    const len = top.y + 80;
    M.compose(top, Q.identity(), Sv.set(1, len, 1)); pylons.setMatrixAt(i, M);
  }
  pylons.frustumCulled = false;
  g.add(pylons);
  return g;
}

/** a station deck beside the track at s, on the given side (+1 right of travel, -1 left) */
export function stationFrame(track, s, side = 1, out = 16) {
  const f = track.frameAt(s);
  const c = f.p.clone().addScaledVector(f.side, side * out);
  c.y = f.p.y - 1.2;
  const yaw = Math.atan2(f.t.x, f.t.z);
  return { f, c, yaw };
}
