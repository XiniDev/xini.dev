import * as THREE from 'three';
import { inkMaterial, newInkId } from '../../shared/gfx/ink-material.js';

// Station props for The loop: built from simple parts so the silhouettes stay graphic.
export const V = (x, y, z) => new THREE.Vector3(x, y, z);

export function boxMesh(size, pos, mat, rotY = 0) {
  const m = new THREE.Mesh(new THREE.BoxGeometry(...size), mat);
  m.position.copy(pos); m.rotation.y = rotY;
  return m;
}

/** canvas-texture sign on an emissive plane (faces +z of its group) */
export function signPlane(w, h, draw, { emissive = true, res = 512 } = {}) {
  const c = document.createElement('canvas'); c.width = res; c.height = Math.round(res * (h / w));
  const g = c.getContext('2d');
  draw(g, c.width, c.height);
  const tex = new THREE.CanvasTexture(c); tex.colorSpace = THREE.NoColorSpace; tex.anisotropy = 8;
  const mat = inkMaterial({ base: '#ffffff', map: tex, mapAmt: 1, emissive, spec: 0, rim: 0, bloom: false });
  const m = new THREE.Mesh(new THREE.PlaneGeometry(w, h), mat);
  m.userData.redraw = () => { draw(g, c.width, c.height); tex.needsUpdate = true; };
  return m;
}

/** lattice mast: four legs and cross braces, instanced into one draw call */
export function latticeMast({ h = 120, w = 6, taper = 0.55, step = 8, mat }) {
  const parts = [];
  const legAt = (y, sx, sz) => { const k = 1 - (y / h) * (1 - taper); return V(sx * w * 0.5 * k, y, sz * w * 0.5 * k); };
  const corners = [[1, 1], [-1, 1], [-1, -1], [1, -1]];
  for (let y = 0; y < h; y += step) {
    for (let c = 0; c < 4; c++) {
      const [ax, az] = corners[c], [bx, bz] = corners[(c + 1) % 4];
      parts.push([legAt(y, ax, az), legAt(y + step, ax, az), 0.5]);
      parts.push([legAt(y, ax, az), legAt(y + step, bx, bz), 0.22]);
      parts.push([legAt(y + step, ax, az), legAt(y + step, bx, bz), 0.22]);
    }
  }
  const geo = new THREE.BoxGeometry(1, 1, 1);
  const im = new THREE.InstancedMesh(geo, mat, parts.length);
  const M = new THREE.Matrix4(), Q = new THREE.Quaternion(), up = V(0, 1, 0);
  parts.forEach(([a, b, t], i) => {
    const d = b.clone().sub(a), len = d.length();
    Q.setFromUnitVectors(up, d.clone().normalize());
    M.compose(a.clone().add(b).multiplyScalar(0.5), Q, V(t, len, t));
    im.setMatrixAt(i, M);
  });
  im.frustumCulled = false;
  return im;
}

/** parabolic dish (lathe) facing +y before rotation */
export function dishMesh(r, depth, mat) {
  const pts = [];
  for (let i = 0; i <= 12; i++) { const x = (r * i) / 12; pts.push(new THREE.Vector2(x, depth * (x / r) ** 2)); }
  for (let i = 12; i >= 0; i--) { const x = (r * i) / 12; pts.push(new THREE.Vector2(x * 0.98, depth * (x / r) ** 2 - 0.5)); }
  const g = new THREE.LatheGeometry(pts, 36).toNonIndexed();
  g.computeVertexNormals();
  return new THREE.Mesh(g, mat);
}

/** a capsule pod for the track (nose toward +z) */
export function podMesh(pal) {
  const g = new THREE.Group();
  const prof = [[0, -7], [1.2, -6.6], [2.0, -5.6], [2.3, -3.5], [2.3, 3.0], [2.0, 5.2], [1.1, 6.6], [0, 7.2]].map(([r, z]) => new THREE.Vector2(r, z));
  const body = new THREE.LatheGeometry(prof, 24).toNonIndexed(); body.rotateX(Math.PI / 2); body.computeVertexNormals();
  g.add(new THREE.Mesh(body, inkMaterial({ base: pal.pod, spec: 1, rim: 1, brush: 0.15 })));
  const win = new THREE.Mesh(new THREE.BoxGeometry(4.75, 0.7, 8.5), inkMaterial({ base: pal.podWin, emissive: true }));
  win.position.set(0, 0.7, 0.5); g.add(win);
  const glow = new THREE.Mesh(new THREE.BoxGeometry(3.4, 0.25, 12), inkMaterial({ base: pal.neon, emissive: true }));
  glow.position.y = -2.1; g.add(glow);
  return g;
}

export const kanjiFont = '"Zen Kaku Gothic New", "Hiragino Sans", sans-serif';
export const signFont = '"Big Shoulders Display Variable", "Arial Narrow", sans-serif';
export const monoFont = '"JetBrains Mono Variable", ui-monospace, monospace';

/** bilingual station board: kanji over English, neon-green rule */
export function drawBoard(jp, en, pal, sub = '') {
  return (g, W, H) => {
    g.fillStyle = pal.board; g.fillRect(0, 0, W, H);
    g.fillStyle = pal.neon; g.fillRect(0, H * 0.06, W, H * 0.035); g.fillRect(0, H * 0.905, W, H * 0.035);
    g.fillStyle = pal.boardInk; g.textBaseline = 'alphabetic';
    g.font = `700 ${Math.round(H * 0.44)}px ${kanjiFont}`; g.fillText(jp, W * 0.06, H * 0.58);
    g.font = `900 ${Math.round(H * 0.2)}px ${signFont}`; g.fillText(en.toUpperCase(), W * 0.065, H * 0.82);
    if (sub) { g.fillStyle = pal.neon; g.font = `600 ${Math.round(H * 0.07)}px ${monoFont}`; g.fillText(sub.toUpperCase(), W * 0.56, H * 0.2); }
  };
}
