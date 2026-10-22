import * as THREE from 'three';

// Paper engineering: slabs (two-sided card with an edge), hinge chains that fold flat nets into solids,
// a folded strip that becomes the mark, a Miura-ori sheet, and an accordion folding screen.

const _v = new THREE.Vector3();

/** Prism of a planar polygon (in XY), z in [-t/2, t/2]. Top/bottom/side get their own vertex colours. */
export function slabGeometry(poly, t, { top = '#ffffff', bottom = '#111111', side = '#333333', uvBox = null } = {}) {
  const shape = new THREE.Shape(poly.map((p) => new THREE.Vector2(p[0], p[1])));
  const tris = THREE.ShapeUtils.triangulateShape(shape.getPoints(), []);
  const pos = [], nor = [], col = [], uv = [];
  const cT = new THREE.Color(top), cB = new THREE.Color(bottom), cS = new THREE.Color(side);
  let minx = Infinity, miny = Infinity, maxx = -Infinity, maxy = -Infinity;
  for (const [x, y] of poly) { minx = Math.min(minx, x); maxx = Math.max(maxx, x); miny = Math.min(miny, y); maxy = Math.max(maxy, y); }
  const [ux0, uy0, ux1, uy1] = uvBox || [minx, miny, maxx, maxy];
  const U = (x, y) => [(x - ux0) / (ux1 - ux0 || 1), (y - uy0) / (uy1 - uy0 || 1)];
  const push = (p, n, c, u) => { pos.push(...p); nor.push(...n); col.push(c.r, c.g, c.b); uv.push(...u); };
  const h = t / 2;
  for (const [a, b, c] of tris) {
    for (const i of [a, b, c]) push([poly[i][0], poly[i][1], h], [0, 0, 1], cT, U(poly[i][0], poly[i][1]));
    for (const i of [a, c, b]) push([poly[i][0], poly[i][1], -h], [0, 0, -1], cB, U(poly[i][0], poly[i][1]));
  }
  // winding of the polygon decides which way the side normals face
  let area = 0;
  for (let i = 0; i < poly.length; i++) { const p = poly[i], q = poly[(i + 1) % poly.length]; area += p[0] * q[1] - q[0] * p[1]; }
  const s = area > 0 ? 1 : -1;
  for (let i = 0; i < poly.length; i++) {
    const p = poly[i], q = poly[(i + 1) % poly.length];
    const ex = q[0] - p[0], ey = q[1] - p[1], l = Math.hypot(ex, ey) || 1;
    const n = [s * ey / l, -s * ex / l, 0];
    const quad = [[p, h], [q, h], [q, -h], [p, h], [q, -h], [p, -h]];
    const order = s > 0 ? quad : [quad[0], quad[2], quad[1], quad[3], quad[5], quad[4]];
    for (const [v, z] of order) push([v[0], v[1], z], n, cS, [0, 0]);
  }
  const g = new THREE.BufferGeometry();
  g.setAttribute('position', new THREE.Float32BufferAttribute(pos, 3));
  g.setAttribute('normal', new THREE.Float32BufferAttribute(nor, 3));
  g.setAttribute('color', new THREE.Float32BufferAttribute(col, 3));
  g.setAttribute('uv', new THREE.Float32BufferAttribute(uv, 2));
  return g;
}

/**
 * A tree of rigid pieces joined by hinges. Geometry is authored in the FOLDED pose (world space of the chain);
 * each hinge carries the signed angle that unfolds its piece into the parent's plane.
 * progress(i) in [0,1]: 0 = flat (unfolded), 1 = folded.
 */
export class HingeTree {
  constructor() { this.group = new THREE.Group(); this.nodes = []; this.u = []; }
  add({ mesh, parent = -1, a = null, b = null, angle = 0, depth = 0 }) {
    mesh.matrixAutoUpdate = false;
    this.group.add(mesh);
    const node = { mesh, parent, a: a ? a.clone() : null, axis: a && b ? b.clone().sub(a).normalize() : null, angle, depth, M: new THREE.Matrix4() };
    this.nodes.push(node); this.u.push(1);
    return this.nodes.length - 1;
  }
  maxDepth() { return this.nodes.reduce((m, n) => Math.max(m, n.depth), 0); }
  /** Set every hinge from one global progress with a cascade: deeper hinges fold later. */
  setAll(p, cascade = 0.55, order = 'depth') {
    const D = this.maxDepth() || 1;
    this.nodes.forEach((n, i) => {
      const k = order === 'index' ? i / Math.max(1, this.nodes.length - 1) : n.depth / D;
      const start = k * cascade, len = 1 - cascade;
      this.u[i] = THREE.MathUtils.clamp((p - start) / len, 0, 1);
    });
    this.update();
  }
  update(ease = (x) => x) {
    const R = new THREE.Matrix4(), T = new THREE.Matrix4(), Ti = new THREE.Matrix4();
    for (let i = 0; i < this.nodes.length; i++) {
      const n = this.nodes[i];
      if (n.parent < 0) { n.M.identity(); }
      else {
        const P = this.nodes[n.parent].M;
        const ang = (1 - ease(this.u[i])) * n.angle;
        T.makeTranslation(n.a.x, n.a.y, n.a.z); Ti.makeTranslation(-n.a.x, -n.a.y, -n.a.z);
        R.makeRotationAxis(n.axis, ang);
        n.M.copy(P).multiply(T).multiply(R).multiply(Ti);
      }
      n.mesh.matrix.copy(n.M);
      n.mesh.matrixWorldNeedsUpdate = true;
    }
  }
}



/** A four-cornered slab [A0, A1, B1, B0] subdivided along A0->A1 so it can bend. */
export function quadSlabGeometry(q, t, { top = '#fff', bottom = '#111', side = '#333' } = {}, n = 12) {
  const pos = [], col = [], uv = [];
  const cT = new THREE.Color(top), cB = new THREE.Color(bottom), cS = new THREE.Color(side);
  const lerp2 = (p, r, k) => [p[0] + (r[0] - p[0]) * k, p[1] + (r[1] - p[1]) * k];
  const h = t / 2;
  // signed area of the quad decides the winding that faces +z
  let area = 0;
  for (let i = 0; i < 4; i++) { const a = q[i], b = q[(i + 1) % 4]; area += a[0] * b[1] - b[0] * a[1]; }
  const ccw = area > 0;
  const face = (P, c, u = [[0, 0], [0, 0], [0, 0], [0, 0]], flip = false) => {
    // P: 4 points [x,y,z] forming a quad, emitted as two triangles
    const order = flip ? [0, 2, 1, 0, 3, 2] : [0, 1, 2, 0, 2, 3];
    for (const j of order) { pos.push(...P[j]); col.push(c.r, c.g, c.b); uv.push(...u[j]); }
  };
  for (let i = 0; i < n; i++) {
    const k0 = i / n, k1 = (i + 1) / n;
    const a0 = lerp2(q[0], q[1], k0), a1 = lerp2(q[0], q[1], k1), b0 = lerp2(q[3], q[2], k0), b1 = lerp2(q[3], q[2], k1);
    const U = [[k0, 1], [k1, 1], [k1, 0], [k0, 0]];
    face([[...a0, h], [...a1, h], [...b1, h], [...b0, h]], cT, U, !ccw);
    face([[...a0, -h], [...a1, -h], [...b1, -h], [...b0, -h]], cB, U, ccw);
    face([[...a0, h], [...a0, -h], [...a1, -h], [...a1, h]], cS, undefined, !ccw);
    face([[...b0, h], [...b1, h], [...b1, -h], [...b0, -h]], cS, undefined, !ccw);
  }
  face([[...q[3], h], [...q[3], -h], [...q[0], -h], [...q[0], h]], cS, undefined, !ccw);
  face([[...q[1], h], [...q[1], -h], [...q[2], -h], [...q[2], h]], cS, undefined, !ccw);
  const g = new THREE.BufferGeometry();
  g.setAttribute('position', new THREE.Float32BufferAttribute(pos, 3));
  g.setAttribute('color', new THREE.Float32BufferAttribute(col, 3));
  g.setAttribute('uv', new THREE.Float32BufferAttribute(uv, 2));
  g.computeVertexNormals();
  return g;
}

/** Bend a slab gently out of plane (paper is never perfectly flat). Displaces z by a smooth bump
 *  that is zero on the polygon outline's two crease ends. */
function bowSlab(geo, poly, amp) {
  const pos = geo.attributes.position;
  // principal axis: from the midpoint of the first edge to the midpoint of the opposite edge
  const a = [(poly[0][0] + poly[3][0]) / 2, (poly[0][1] + poly[3][1]) / 2];
  const b = [(poly[1][0] + poly[2][0]) / 2, (poly[1][1] + poly[2][1]) / 2];
  const dx = b[0] - a[0], dy = b[1] - a[1], L2 = dx * dx + dy * dy;
  for (let i = 0; i < pos.count; i++) {
    const s = Math.min(1, Math.max(0, ((pos.getX(i) - a[0]) * dx + (pos.getY(i) - a[1]) * dy) / L2));
    pos.setZ(i, pos.getZ(i) + Math.sin(Math.PI * s) * amp);
  }
  pos.needsUpdate = true;
  geo.computeVertexNormals();
}

// ---------- the mark as one folded strip ----------

function lineIntersect(p, d, q, e) {
  // p + s d = q + r e
  const den = d.x * e.y - d.y * e.x;
  if (Math.abs(den) < 1e-9) return null;
  const s = ((q.x - p.x) * e.y - (q.y - p.y) * e.x) / den;
  return new THREE.Vector2(p.x + d.x * s, p.y + d.y * s);
}

/**
 * Fold a strip of width w along a closed polyline (centreline corners `pts`, CCW or CW) into the mark.
 * Each corner becomes a 180° crease along the bisector of the turn; layers stack by `t` per fold.
 * signs[i] = +1 (fold over) or -1 (fold under) at corner i+1.
 */
export function foldedStrip(pts, w, t, { signs, colors, gap = 0.002, bow = 0 } = {}) {
  const P = pts.map((p) => new THREE.Vector2(p[0], p[1]));
  const n = P.length;                 // closed: segment i runs P[i] -> P[i+1 mod n]
  const dir = [], nor = [];
  for (let i = 0; i < n; i++) { const d = P[(i + 1) % n].clone().sub(P[i]).normalize(); dir.push(d); nor.push(new THREE.Vector2(-d.y, d.x)); }
  // crease at each corner i (between segment i-1 and i): line through P[i] along bisector of d_in + d_out
  const crease = [];
  for (let i = 0; i < n; i++) {
    const din = dir[(i - 1 + n) % n], dout = dir[i];
    let c = din.clone().add(dout);
    if (c.lengthSq() < 1e-8) c = new THREE.Vector2(-din.y, din.x);
    crease.push({ p: P[i].clone(), d: c.normalize() });
  }
  const tree = new HingeTree();
  const layer = [0];
  for (let i = 1; i < n; i++) layer.push(layer[i - 1] + (signs?.[i - 1] ?? 1));
  const base = Math.min(...layer);
  let prev = -1;
  for (let i = 0; i < n; i++) {
    const c0 = crease[i], c1 = crease[(i + 1) % n];
    const half = w / 2;
    const e0a = P[i].clone().addScaledVector(nor[i], half), e0b = P[i].clone().addScaledVector(nor[i], -half);
    // strip edges: lines e0a + s*dir, e0b + s*dir, clipped by both creases
    const A0 = lineIntersect(e0a, dir[i], c0.p, c0.d), B0 = lineIntersect(e0b, dir[i], c0.p, c0.d);
    const A1 = lineIntersect(e0a, dir[i], c1.p, c1.d), B1 = lineIntersect(e0b, dir[i], c1.p, c1.d);
    const poly = [[A0.x, A0.y], [A1.x, A1.y], [B1.x, B1.y], [B0.x, B0.y]];
    const z = (layer[i] - base) * (t + gap);
    // every 180° fold turns the paper over: alternate which side faces up
    const side = i % 2 === 0 ? colors : { ...colors, top: colors.bottom, bottom: colors.top };
    const geo = bow ? quadSlabGeometry(poly, t, side, 14) : slabGeometry(poly, t, side);
    if (bow) bowSlab(geo, poly, bow * (i % 2 ? -1 : 1));
    geo.translate(0, 0, z);
    const mesh = new THREE.Mesh(geo, null);
    if (i === 0) prev = tree.add({ mesh });
    else {
      const zm = ((layer[i] + layer[i - 1]) / 2 - base) * (t + gap);
      const a = new THREE.Vector3(c0.p.x, c0.p.y, zm);
      const b = new THREE.Vector3(c0.p.x + c0.d.x, c0.p.y + c0.d.y, zm);
      // a 180° fold: the piece must swing through the side it ends up on (over = +z, under = -z)
      const over = (signs?.[i - 1] ?? 1) > 0;
      const mid = new THREE.Vector3((A0.x + A1.x + B0.x + B1.x) / 4, (A0.y + A1.y + B0.y + B1.y) / 4, z);
      const axis = b.clone().sub(a).normalize();
      const test = mid.clone().sub(a).applyAxisAngle(axis, Math.PI / 2).add(a);
      const angle = (test.z > zm) === over ? Math.PI : -Math.PI;
      prev = tree.add({ mesh, parent: prev, a, b, angle, depth: i });
    }
  }
  return tree;
}

// ---------- polyhedron nets ----------

/** Build a hinge tree that folds a flat net into the convex polyhedron given by triangle faces. */
export function polyhedronNet(geometry, { thickness = 0.03, root = 0, colors, labelUV = null } = {}) {
  const g = geometry.index ? geometry.toNonIndexed() : geometry;
  const pos = g.attributes.position;
  const faces = [];
  for (let i = 0; i < pos.count; i += 3) faces.push([0, 1, 2].map((k) => new THREE.Vector3().fromBufferAttribute(pos, i + k)));
  const key = (v) => `${v.x.toFixed(4)},${v.y.toFixed(4)},${v.z.toFixed(4)}`;
  const edgeMap = new Map();
  faces.forEach((f, fi) => {
    for (let k = 0; k < 3; k++) {
      const a = key(f[k]), b = key(f[(k + 1) % 3]);
      const e = a < b ? a + '|' + b : b + '|' + a;
      if (!edgeMap.has(e)) edgeMap.set(e, []);
      edgeMap.get(e).push({ fi, a: f[k], b: f[(k + 1) % 3] });
    }
  });
  const nbrs = faces.map(() => []);
  for (const list of edgeMap.values()) if (list.length === 2) {
    nbrs[list[0].fi].push({ f: list[1].fi, a: list[0].a, b: list[0].b });
    nbrs[list[1].fi].push({ f: list[0].fi, a: list[1].a, b: list[1].b });
  }
  const normalOf = (f) => new THREE.Vector3().subVectors(f[1], f[0]).cross(new THREE.Vector3().subVectors(f[2], f[0])).normalize();
  const centroid = (f) => new THREE.Vector3().add(f[0]).add(f[1]).add(f[2]).multiplyScalar(1 / 3);
  // BFS spanning tree
  const parent = faces.map(() => -1), depth = faces.map(() => 0), via = faces.map(() => null);
  const seen = new Set([root]); const queue = [root]; const order = [];
  while (queue.length) {
    const f = queue.shift(); order.push(f);
    for (const e of nbrs[f]) if (!seen.has(e.f)) { seen.add(e.f); parent[e.f] = f; depth[e.f] = depth[f] + 1; via[e.f] = e; queue.push(e.f); }
  }
  const tree = new HingeTree();
  const idx = new Map();
  for (const fi of order) {
    const f = faces[fi];
    const N = normalOf(f);
    // local frame for the slab: face plane, pushed inward by half thickness so the outside stays flush
    const origin = centroid(f);
    const ex = new THREE.Vector3().subVectors(f[1], f[0]).normalize();
    const ey = new THREE.Vector3().crossVectors(N, ex);
    const poly = f.map((v) => { const d = v.clone().sub(origin); return [d.dot(ex), d.dot(ey)]; });
    const geo = slabGeometry(poly, thickness, colors);
    if (labelUV) labelUV(geo, fi, poly);
    const M = new THREE.Matrix4().makeBasis(ex, ey, N).setPosition(origin.clone().addScaledVector(N, -thickness / 2));
    geo.applyMatrix4(M);
    const mesh = new THREE.Mesh(geo, null);
    mesh.userData.face = fi; mesh.userData.normal = N; mesh.userData.centroid = origin;
    if (parent[fi] < 0) { idx.set(fi, tree.add({ mesh })); continue; }
    const e = via[fi];
    const pN = normalOf(faces[parent[fi]]);
    const dihedral = Math.PI - pN.angleTo(N); // interior dihedral angle
    const fold = Math.PI - dihedral;          // how far the face turns from flat
    // choose the sign that brings this face's normal onto the parent's when unfolded
    const axis = new THREE.Vector3().subVectors(e.b, e.a).normalize();
    const test = N.clone().applyAxisAngle(axis, fold);
    const angle = test.dot(pN) > 0.999 ? fold : -fold;
    idx.set(fi, tree.add({ mesh, parent: idx.get(parent[fi]), a: e.a, b: e.b, angle, depth: depth[fi] }));
  }
  tree.faces = faces;
  return tree;
}

// ---------- Miura-ori ----------

/** Rigid-foldable Miura-ori sheet. theta in [0, gamma): 0 = flat, near gamma = fully compressed. */
export class MiuraSheet {
  constructor({ cols = 10, rows = 8, a = 0.42, b = 0.42, gamma = THREE.MathUtils.degToRad(64) } = {}) {
    Object.assign(this, { cols, rows, a, b, gamma });
    const quads = cols * rows;
    this.geo = new THREE.BufferGeometry();
    this.pos = new Float32Array(quads * 6 * 3);
    this.uv = new Float32Array(quads * 6 * 2);
    this.cell = new Float32Array(quads * 6 * 2);
    this.geo.setAttribute('position', new THREE.BufferAttribute(this.pos, 3));
    this.geo.setAttribute('normal', new THREE.BufferAttribute(new Float32Array(quads * 6 * 3), 3));
    this.geo.setAttribute('uv', new THREE.BufferAttribute(this.uv, 2));
    this.geo.setAttribute('cell', new THREE.BufferAttribute(this.cell, 2));
    let k = 0, c = 0;
    for (let j = 0; j < rows; j++) for (let i = 0; i < cols; i++) {
      for (const [di, dj] of [[0, 0], [1, 0], [1, 1], [0, 0], [1, 1], [0, 1]]) {
        this.uv[k++] = (i + di) / cols; this.uv[k++] = (j + dj) / rows;
        this.cell[c++] = i; this.cell[c++] = j;
      }
    }
    this.set(0);
  }
  vertex(i, j, th) {
    const { a, b, gamma } = this;
    const H = b * Math.sin(th), S = b * Math.cos(th);
    const V = (a * Math.cos(gamma)) / Math.cos(th);
    const L = Math.sqrt(Math.max(0, a * a - V * V));
    return [i * S + (j % 2) * V, j * L, (i % 2) * H];
  }
  size(th) {
    const v = this.vertex(this.cols, this.rows, th);
    return { w: v[0], h: v[1], d: this.b * Math.sin(th) };
  }
  set(theta) {
    this.theta = theta;
    const th = Math.min(theta, this.gamma - 1e-3);
    const sz = this.size(th);
    let k = 0;
    for (let j = 0; j < this.rows; j++) for (let i = 0; i < this.cols; i++) {
      for (const [di, dj] of [[0, 0], [1, 0], [1, 1], [0, 0], [1, 1], [0, 1]]) {
        const v = this.vertex(i + di, j + dj, th);
        this.pos[k++] = v[0] - sz.w / 2; this.pos[k++] = v[1] - sz.h / 2; this.pos[k++] = v[2] - sz.d / 2;
      }
    }
    this.geo.attributes.position.needsUpdate = true;
    this.geo.computeVertexNormals();
    this.geo.computeBoundingSphere();
  }
}

/** Accordion (byobu) folding screen of N panels in a zigzag; returns a HingeTree with vertical hinges. */
export function foldingScreen(n, { w = 1.6, h = 2.4, t = 0.05, colors } = {}) {
  const tree = new HingeTree();
  let prev = -1;
  for (let i = 0; i < n; i++) {
    const x0 = i * w;
    const geo = slabGeometry([[0, 0], [w, 0], [w, h], [0, h]], t, colors);
    geo.translate(x0, -h / 2, 0);
    const mesh = new THREE.Mesh(geo, null);
    mesh.userData.panel = i;
    if (i === 0) prev = tree.add({ mesh });
    else prev = tree.add({ mesh, parent: prev, a: new THREE.Vector3(x0, -h / 2, 0), b: new THREE.Vector3(x0, h / 2, 0), angle: 0, depth: i });
  }
  tree.panelW = w; tree.panelH = h;
  return tree;
}
