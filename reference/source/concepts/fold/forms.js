import * as THREE from 'three';
import { foldedStrip, polyhedronNet, MiuraSheet, foldingScreen, slabGeometry } from '../../shared/gfx/fold.js';
import { inkMaterial, newInkId } from '../../shared/gfx/ink-material.js';

// The four paper forms of FOLD. One sheet of two-sided paper (signal front, ink back) folded into
// the mark, a d20, a Miura-ori field, and a folding screen that carries the work.

const ease = (x) => (x < 0.5 ? 4 * x * x * x : 1 - Math.pow(-2 * x + 2, 3) / 2);

function perPieceMaterials(tree, opts) {
  tree.nodes.forEach((n) => { n.mesh.material = inkMaterial({ vertexColors: true, id: newInkId(), ...opts }); });
}

export class MarkForm {
  constructor(pal) {
    const W = 1.56, H = 1.62, w = 0.4, t = 0.07;
    const pts = [[-W / 2, H / 2], [W / 2, -H / 2], [W / 2, H / 2], [-W / 2, -H / 2]];
    this.tree = foldedStrip(pts, w, t, { signs: [1, 1, -1], colors: { top: pal.paper, bottom: pal.back, side: pal.edge }, bow: 0.11 });
    perPieceMaterials(this.tree, { brush: 0.09, brushScale: 2.2, stroke: 0.07, spec: 0.7, rim: 1, dotCell: 4.5, mid: 0.34, dark: 0.74, side: THREE.DoubleSide });
    this.group = new THREE.Group();
    this.pivot = new THREE.Group();
    this.group.add(this.pivot);
    this.pivot.add(this.tree.group);
    // centre on the folded pose
    this.tree.setAll(1); this.tree.group.updateMatrixWorld(true);
    const box = new THREE.Box3().setFromObject(this.tree.group);
    this.foldedCentre = box.getCenter(new THREE.Vector3());
    // the flat strip: centre and lay it horizontal
    this.tree.setAll(0); this.tree.group.updateMatrixWorld(true);
    const box0 = new THREE.Box3().setFromObject(this.tree.group);
    this.flatCentre = box0.getCenter(new THREE.Vector3());
    this.flatAngle = Math.atan2(pts[1][1] - pts[0][1], pts[1][0] - pts[0][0]);
    this.set(1);
  }
  set(p) {
    this.p = p;
    this.tree.setAll(p, 0.62, 'index');
    const k = ease(THREE.MathUtils.clamp(p * 1.4, 0, 1));
    const c = this.flatCentre.clone().lerp(this.foldedCentre, k);
    this.tree.group.position.set(-c.x, -c.y, -c.z);
    this.pivot.rotation.z = -this.flatAngle * (1 - k);
    this.pivot.scale.setScalar(THREE.MathUtils.lerp(0.42, 1, k));
  }
}

function numberAtlas(font) {
  const S = 2048, c = document.createElement('canvas'); c.width = c.height = S;
  const g = c.getContext('2d');
  g.clearRect(0, 0, S, S);
  g.fillStyle = '#000'; g.textAlign = 'center'; g.textBaseline = 'middle';
  for (let i = 0; i < 20; i++) {
    const cx = (i % 5) * (S / 5) + S / 10, cy = Math.floor(i / 5) * (S / 4) + S / 8;
    g.font = `800 ${i + 1 === 20 ? 104 : 96}px ${font}`;
    g.fillStyle = '#07060c';
    g.fillText(String(i + 1), cx, cy + 6);
    if (i + 1 === 6 || i + 1 === 9) g.fillRect(cx - 26, cy + 52, 52, 9);
  }
  const tex = new THREE.CanvasTexture(c);
  tex.colorSpace = THREE.NoColorSpace; tex.anisotropy = 4;
  return tex;
}

export class DieForm {
  constructor(pal, font = 'sans-serif') {
    const ico = new THREE.IcosahedronGeometry(0.95, 0);
    // root: the face whose normal points most toward +z, so "20" faces the viewer when it lands
    const tmp = ico.toNonIndexed(); const p = tmp.attributes.position;
    let root = 0, best = -Infinity;
    for (let f = 0; f < p.count / 3; f++) {
      const a = new THREE.Vector3().fromBufferAttribute(p, f * 3), b = new THREE.Vector3().fromBufferAttribute(p, f * 3 + 1), c = new THREE.Vector3().fromBufferAttribute(p, f * 3 + 2);
      const n = b.clone().sub(a).cross(c.clone().sub(a)).normalize();
      const score = n.z + n.y * 0.25;
      if (score > best) { best = score; root = f; }
    }
    const numberOf = (fi) => (fi === root ? 20 : ((fi * 7 + 3) % 19) + 1);
    const atlas = numberAtlas(font);
    this.tree = polyhedronNet(tmp, {
      thickness: 0.05, root, colors: { top: pal.paper, bottom: pal.back, side: pal.edge },
      labelUV: (geo, fi, poly) => {
        const n = numberOf(fi) - 1; const cu = (n % 5) / 5, cv = 1 - (Math.floor(n / 5) + 1) / 4;
        const uv = geo.attributes.uv;
        const cx = (poly[0][0] + poly[1][0] + poly[2][0]) / 3, cy = (poly[0][1] + poly[1][1] + poly[2][1]) / 3;
        // numbers stand upright toward one corner of the face, like a real d20
        let ux = poly[2][0] - cx, uy = poly[2][1] - cy; const ul = Math.hypot(ux, uy); ux /= ul; uy /= ul;
        const rx = uy, ry = -ux;
        const pos = geo.attributes.position;
        const k = 0.165; // uv per world unit (keeps the whole face inside its atlas cell)
        for (let i = 0; i < pos.count; i++) {
          const top = pos.getZ(i) > 0;
          if (!top) { uv.setXY(i, 0.001, 0.001); continue; }
          const x = pos.getX(i) - cx, y = pos.getY(i) - cy;
          uv.setXY(i, cu + 0.1 + (x * rx + y * ry) * k, cv + 0.125 + (x * ux + y * uy) * k + 0.012);
        }
      },
    });
    this.tree.nodes.forEach((n) => {
      n.mesh.material = inkMaterial({ vertexColors: true, id: newInkId(), map: atlas, mapAmt: 1, brush: 0.16, stroke: 0.07, spec: 0.75, rim: 1, dotCell: 5 });
    });
    this.group = new THREE.Group();
    this.group.add(this.tree.group);
    this.root = root;
    this.set(1);
  }
  set(p) { this.p = p; this.tree.setAll(p, 0.5, 'depth'); }
}

export class MiuraForm {
  constructor(pal) {
    this.sheet = new MiuraSheet({ cols: 10, rows: 8, a: 0.44, b: 0.44, gamma: THREE.MathUtils.degToRad(58) });
    this.mat = inkMaterial({
      base: pal.paper, back: pal.back, side: THREE.DoubleSide, flat: true, brush: 0.06, stroke: 0.05, spec: 0.5, rim: 0.8,
      grid: [10, 8], gridW: 1.2, pulseCol: pal.pulse, pulse: 1, dotCell: 4.5, mid: 0.3, dark: 0.7,
    });
    this.mesh = new THREE.Mesh(this.sheet.geo, this.mat);
    this.group = new THREE.Group(); this.group.add(this.mesh);
    this.set(0.7);
  }
  set(p) { this.p = p; this.sheet.set(p * (this.sheet.gamma - 0.02)); }
}

export class BoxForm {
  constructor(pal) {
    const box = new THREE.BoxGeometry(1.25, 1.25, 1.25).toNonIndexed();
    // root: a bottom triangle, so the lid (top) closes last
    const pos = box.attributes.position;
    let root = 0, best = Infinity;
    for (let f = 0; f < pos.count / 3; f++) {
      const y = (pos.getY(f * 3) + pos.getY(f * 3 + 1) + pos.getY(f * 3 + 2)) / 3;
      if (y < best - 1e-6) { best = y; root = f; }
    }
    this.tree = polyhedronNet(box, { thickness: 0.045, root, colors: { top: pal.paper, bottom: pal.back, side: pal.edge } });
    // two triangles share every face: give each square face one ink id so only real edges are inked
    const ids = new Map();
    this.tree.nodes.forEach((n) => {
      const N = n.mesh.userData.normal; const key = `${Math.round(N.x)},${Math.round(N.y)},${Math.round(N.z)}`;
      if (!ids.has(key)) ids.set(key, newInkId());
      n.mesh.material = inkMaterial({ vertexColors: true, id: ids.get(key), brush: 0.08, stroke: 0.06, spec: 0.6, rim: 1, dotCell: 4.5, mid: 0.3, dark: 0.72 });
    });
    this.group = new THREE.Group(); this.group.add(this.tree.group);
    this.lid = this.tree.nodes.filter((n) => n.mesh.userData.normal.y > 0.9).map((n) => n.mesh);
    this.set(1);
  }
  set(p) { this.p = p; this.tree.setAll(p, 0.45, 'depth'); }
}

export class ScreenForm {
  constructor(pal, items, makeArt) {
    this.n = items.length;
    const w = 1.5, h = 2.12, t = 0.05;
    this.tree = foldingScreen(this.n, { w, h, t, colors: { top: pal.paper, bottom: pal.back, side: pal.edge } });
    perPieceMaterials(this.tree, { brush: 0.12, stroke: 0.06, spec: 0.35, rim: 0.8, dotCell: 5 });
    // artwork on each panel: print-treated image inset in a frame
    this.arts = items.map((it, i) => {
      const tex = makeArt(it, i);
      const m = new THREE.Mesh(new THREE.PlaneGeometry(w - 0.16, h - 0.16), inkMaterial({
        base: '#ffffff', map: tex, mapAmt: 1, brush: 0.05, stroke: 0.02, spec: 0.0, rim: 0.0, dot: 0.5, dotCell: 4, id: newInkId(), lift: 0.35,
      }));
      m.position.set(i * w + w / 2, 0, t / 2 + 0.004);
      m.matrixAutoUpdate = true;
      const node = this.tree.nodes[i];
      // attach art as a child of the panel mesh so it follows the hinge transform
      node.mesh.add(m);
      return m;
    });
    this.w = w; this.h = h;
    this.group = new THREE.Group();
    this.inner = new THREE.Group();
    this.group.add(this.inner);
    this.inner.add(this.tree.group);
    this.zig = 1.05; this.sel = 0; this.selF = 0; this.close = 0;
    this.tree.u.fill(0);
    this.update(0);
  }
  update(dt) {
    // selected panel lies flat toward the viewer; neighbours fold away in a zigzag
    this.selF += (this.sel - this.selF) * (1 - Math.exp(-dt * 7));
    const zig = this.zig * (1 - this.close) + this.close * 3.0;
    let yaw = 0; const yaws = [0];
    this.tree.nodes.forEach((n, i) => {
      if (i === 0) return;
      const a = (i % 2 ? 1 : -1) * zig;
      n.angle = a; yaws.push(yaws[i - 1] + a);
    });
    this.tree.update();
    // which panel to face: interpolate between panel positions
    const k = THREE.MathUtils.clamp(this.selF, 0, this.n - 1);
    const i0 = Math.floor(k), f = k - i0, i1 = Math.min(this.n - 1, i0 + 1);
    const centre = (i) => {
      const M = this.tree.nodes[i].M;
      const c = new THREE.Vector3(i * this.w + this.w / 2, 0, 0).applyMatrix4(M);
      return c;
    };
    const c = centre(i0).lerp(centre(i1), f);
    yaw = THREE.MathUtils.lerp(yaws[i0], yaws[i1], f);
    this.inner.rotation.y = -yaw;
    this.tree.group.position.set(-c.x, 0, -c.z);
  }
}
