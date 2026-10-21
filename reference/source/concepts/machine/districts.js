import * as THREE from 'three';
import { inkMaterial as baseInk, glowId, shared } from '../../shared/gfx/ink-material.js';
const inkMaterial = (o) => baseInk({ brushScale: 0.07, dotCell: 4.5, ...o });
import { NOISE } from '../../shared/gfx/glsl.js';
import { FOLD_FRONT, FOLD_BACK } from '../../shared/ui/marks.js';
import { V, rnd, mergedBoxes, canvasTex, labelPlane, lightMaterial, BOARD, BOARD_ID, routeChain, route45 } from './board.js';
import { TOWER, pathShapes, markBadge } from './tower.js';

export const jpFont = '"Zen Kaku Gothic New", "Hiragino Sans", sans-serif';
export const dispFont = '"Chakra Petch", "Arial Narrow", sans-serif';
export const monoFont = '"JetBrains Mono Variable", ui-monospace, monospace';

// Places, in route order. Each gets a big printed label on the board, read from where the camera arrives.
export const SITES = {
  core: { x: TOWER.cx, z: TOWER.cz },
  npu: { x: -470, z: 330 },
  enclave: { x: 120, z: 430 },
  dimm: { x0: 250, pitch: 56, z0: -480, z1: 264 },
  io: { x: -1000, z0: -720, z1: -150 },
};
export const SCREEN_Z = [-360, -120, 120];

const box = (parent, w, h, d, x, y, z, m) => { const b = new THREE.Mesh(new THREE.BoxGeometry(w, h, d), m); b.position.set(x, y + h / 2, z); parent.add(b); return b; };

/** a flat decal lying on a part's top face (same id as the part, so it is never outlined) */
function topDecal(w, d, x, y, z, draw, id, { res = 512, rot = 0, emissive = false } = {}) {
  const m = labelPlane(w, d, draw, { res, id, emissive, bloom: false });
  m.rotation.set(-Math.PI / 2, 0, rot); m.position.set(x, y + 0.08, z);
  return m;
}

// ---------------------------------------------------------------- power stages (VRM fortress)
export function buildVRM(pal, parts, silk) {
  const g = new THREE.Group();
  const { cx, cz } = TOWER;
  const sink = inkMaterial({ base: pal.sink, brush: 0.14, spec: 0.9, rim: 1, dotCell: 4.5 });
  const sinkDark = inkMaterial({ base: pal.sinkDark, brush: 0.14, spec: 0.6, rim: 1 });
  const seam = inkMaterial({ base: pal.signal, emissive: true });
  // north row: chokes, power stages, heatsink with fins
  for (let i = 0; i < 12; i++) { const x = -300 + i * 40; parts.box3(x, 0, -292, 30, 28, 30, pal.choke); silk?.ao(x, -292, 34, 34, 4, 0.8); silk?.text(`L${i + 1}`, x - 12, -273, 4.5); parts.chip(x, -340, 22, 16, 3.5, { pins: false, color: pal.ic }); }
  for (let i = 0; i < 10; i++) { const z = -250 + i * 40; parts.box3(-256, 0, z, 30, 28, 30, pal.choke); silk?.ao(-256, z, 34, 34, 4, 0.8); silk?.text(`L${i + 13}`, -238, z + 12, 4.5); parts.chip(-302, z, 16, 22, 3.5, { pins: false, color: pal.ic }); }
  const finsN = [], finsW = [];
  for (let x = -325; x <= 165; x += 10) finsN.push({ p: [x, 48, -344], s: [3.2, 36, 52] });
  for (let z = -312; z <= 136; z += 10) finsW.push({ p: [-306, 48, z], s: [52, 36, 3.2] });
  box(g, 500, 24, 54, -80, 6, -344, sinkDark); box(g, 54, 24, 450, -306, 6, -88, sinkDark);
  g.add(new THREE.Mesh(mergedBoxes(finsN), sink), new THREE.Mesh(mergedBoxes(finsW), sink));
  // armour plates facing the socket, with a lit seam
  box(g, 500, 34, 5, -80, 6, -314, sink); box(g, 5, 34, 450, -276, 6, -88, sink);
  box(g, 470, 2.2, 1.6, -80, 30, -311.2, seam); box(g, 1.6, 2.2, 420, -273.2, 30, -88, seam);
  // a heat pipe ties the two blocks together
  const pts = [V(-306, 74, 130), V(-306, 74, -300), V(-306, 74, -330), V(-290, 74, -344), V(-260, 74, -344), V(150, 74, -344)];
  g.add(new THREE.Mesh(new THREE.TubeGeometry(new THREE.CatmullRomCurve3(pts, false, 'centripetal'), 80, 5, 10, false), inkMaterial({ base: pal.copperPipe, spec: 1, rim: 1, brush: 0.15 })));
  // 8-pin power input at the corner
  box(g, 64, 30, 34, -360, 0, -420, inkMaterial({ base: pal.connector, brush: 0.15, spec: 0.5, rim: 1 }));
  for (let i = 0; i < 4; i++) for (let j = 0; j < 2; j++) box(g, 9, 2, 9, -381 + i * 14, 30, -428 + j * 16, inkMaterial({ base: pal.ink2, spec: 0 }));
  if (silk) {
    silk.ao(-80, -344, 510, 64, 8, 0.9); silk.ao(-306, -88, 64, 460, 8, 0.9); silk.ao(-360, -420, 70, 40, 5, 0.9);
    silk.text('VRM  ·  22 PHASE', -320, -384, 7, { weight: '700' });
    silk.text('EPS_12V', -392, -444, 6, { weight: '700' });
    silk.text('電源', -330, -470, 26, { weight: '700', family: jpFont, base: 'alphabetic' });
    silk.text('POWER', -270, -472, 14, { weight: '700', family: dispFont, base: 'alphabetic', track: 2 });
  }
  return g;
}

// ---------------------------------------------------------------- memory row (the gallery)
const lightBarMaterial = (base, hot, phase) => new THREE.RawShaderMaterial({
  glslVersion: THREE.GLSL3,
  vertexShader: /* glsl */ `in vec3 position; in vec3 normal; uniform mat4 modelMatrix, viewMatrix, projectionMatrix; out vec3 vW; out vec3 vN;
    void main(){ vec4 w = modelMatrix * vec4(position, 1.0); vW = w.xyz; vN = normalize(mat3(viewMatrix) * mat3(modelMatrix) * normal); gl_Position = projectionMatrix * viewMatrix * w; }`,
  fragmentShader: /* glsl */ `precision highp float;
    uniform vec3 uBase, uHot; uniform float uStep, uOn, uId, uPhase, uBoost;
    in vec3 vW; in vec3 vN;
    layout(location = 0) out highp vec4 gColor; layout(location = 1) out highp vec4 gNormal;
    void main(){
      // a bright pulse runs the length of each module, offset per module
      float w = fract(vW.z / 420.0 - uStep * (0.32 + uBoost * 0.5) + uPhase);
      float pulse = smoothstep(0.0, 0.05, w) * (1.0 - smoothstep(0.05, 0.3, w));
      float seg = step(0.12, fract(vW.z / 18.0));
      vec3 c = mix(uBase * (0.55 + 0.25 * seg), uHot, pulse * 0.85);
      c *= uOn; c += uBase * 0.05 * (1.0 - uOn);
      gColor = vec4(c, 1.0);
      gNormal = vec4(normalize(vN) * 0.5 + 0.5, uId / 255.0);
    }`,
  uniforms: { uBase: { value: new THREE.Color(base) }, uHot: { value: new THREE.Color(hot) }, uStep: shared.uStep, uOn: { value: 1 }, uId: { value: glowId() }, uPhase: { value: phase }, uBoost: { value: 0 } },
});

export function buildMemory(pal, parts, silk, featured, fonts) {
  const g = new THREE.Group();
  const D = SITES.dimm;
  const slotMat = inkMaterial({ base: pal.slot, brush: 0.14, spec: 0.5, rim: 1 });
  const latchMat = inkMaterial({ base: pal.latch, brush: 0.14, spec: 0.6, rim: 1 });
  const spreader = inkMaterial({ base: pal.dimm, brush: 0.14, spec: 0.9, rim: 1, dotCell: 4.5 });
  const pcb = inkMaterial({ base: pal.dimmPcb, brush: 0.1, spec: 0.5, rim: 0.6 });
  const bars = [];
  const zc = (D.z0 + D.z1) / 2, L = D.z1 - D.z0;
  for (let k = 0; k < 4; k++) {
    const x = D.x0 + k * D.pitch;
    box(g, 16, 20, L + 28, x, 0, zc, slotMat);
    for (const s of [-1, 1]) box(g, 18, 34, 16, x, 0, zc + s * (L / 2 + 20), latchMat);
    box(g, 7.6, 12, L, x, 18, zc, pcb);
    box(g, 7, 160, L - 4, x, 30, zc, spreader);
    // sculpted shoulder under the light bar
    box(g, 9, 6, L - 20, x, 188, zc, inkMaterial({ base: pal.dimmTop, brush: 0.1, spec: 1, rim: 1 }));
    const bar = new THREE.Mesh(new THREE.BoxGeometry(8, 11, L - 30), lightBarMaterial(pal.signal, pal.hot, k * 0.21));
    bar.position.set(x, 199.5, zc); g.add(bar); bars.push(bar);
    if (silk) { silk.ao(x, zc, 26, L + 40, 6, 0.85); silk.text(`DIMM_${'AB'[k >> 1]}${(k % 2) + 1}`, x - 8, D.z1 + 44, 6.5, { weight: '700', rot: -Math.PI / 2 }); }
  }
  // the west face of the first module carries the work: three screens
  const x0 = D.x0 - 3.6;
  const screens = [];
  featured.forEach((p, i) => {
    const scr = labelPlane(212, 119, (c, W, H) => drawScreen(c, W, H, p, fonts.imgs?.[i], pal), { emissive: true, res: 1024 });
    scr.rotation.y = -Math.PI / 2; scr.position.set(x0 - 1.8, 108, SCREEN_Z[i]); scr.userData.exhibit = i;
    g.add(scr); screens.push(scr);
    // bezel
    box(g, 1.6, 127, 220, x0 - 0.8, 44.5, SCREEN_Z[i], inkMaterial({ base: pal.bezel, brush: 0.1, spec: 0.6, rim: 1 }));
  });
  // printed band along the top of the module
  const band = labelPlane(L - 30, 20, (c, W, H) => {
    c.fillStyle = pal.dimm; c.fillRect(0, 0, W, H);
    c.fillStyle = pal.silk; c.font = `700 ${H * 0.62}px ${monoFont}`; c.textBaseline = 'middle';
    const s = 'XINI MEMORY  ·  4 × 32 GB  ·  DDR5  ·  ON-DIE ECC  ·  記憶  ·  ';
    let x = W * 0.01; while (x < W) { c.fillText(s, x, H * 0.55); x += c.measureText(s).width; }
  }, { res: 2048, bloom: false });
  band.rotation.y = -Math.PI / 2; band.position.set(x0 - 0.4, 178, zc); g.add(band);
  if (silk) {
    // floor label reads from the aisle, facing east
    silk.text('記憶', 150, -470, 54, { weight: '700', family: jpFont, rot: Math.PI / 2, stretch: 1.8 });
    silk.text('MEMORY', 88, -480, 26, { weight: '700', family: dispFont, rot: Math.PI / 2, track: 3, stretch: 1.8 });
    silk.line([[200, -500], [200, 240]], 1.4);
    for (let z = -470; z < 240; z += 60) silk.line([[186, z], [200, z + 14], [186, z + 28]], 1.2);
  }
  return { group: g, screens, bars, redraw: () => screens.forEach((s) => s.userData.redraw()) };
}

function drawScreen(c, W, H, p, img, pal) {
  c.fillStyle = '#05080a'; c.fillRect(0, 0, W, H);
  if (img) { const sc = Math.max(W / img.width, (H * 0.8) / img.height); c.drawImage(img, (W - img.width * sc) / 2, 0, img.width * sc, img.height * sc); }
  c.fillStyle = 'rgba(2,6,5,0.84)'; c.fillRect(0, H * 0.74, W, H * 0.26);
  c.fillStyle = pal.signal; c.fillRect(0, H * 0.74, W, H * 0.012);
  c.fillStyle = '#ffffff'; c.font = `700 ${Math.round(H * 0.15)}px ${dispFont}`; c.textBaseline = 'alphabetic';
  c.fillText(p.name.toUpperCase(), W * 0.035, H * 0.94);
  c.fillStyle = pal.signal; c.font = `600 ${Math.round(H * 0.042)}px ${monoFont}`;
  c.fillText((p.kicker + '  ·  ' + p.tags.slice(0, 3).join(' · ')).toUpperCase(), W * 0.037, H * 0.8);
  c.fillStyle = 'rgba(0,0,0,0.16)'; for (let y = 0; y < H; y += 4) c.fillRect(0, y, W, 1.4);
}

// ---------------------------------------------------------------- neural core
export function buildNeural(pal, parts, silk) {
  const g = new THREE.Group();
  const { x, z } = SITES.npu;
  const sub = inkMaterial({ base: pal.substrate, brush: 0.14, spec: 0.5, rim: 0.8 });
  const steel = inkMaterial({ base: pal.steel, brush: 0.14, spec: 0.9, rim: 1 });
  box(g, 200, 6, 200, x, 0, z, sub);
  for (const [w, d, dx, dz] of [[200, 10, 0, -95], [200, 10, 0, 95], [10, 180, -95, 0], [10, 180, 95, 0]]) box(g, w, 4, d, x + dx, 6, z + dz, steel);
  // the die glows with its own pattern; memory stacks either side
  const dieId = 186;
  box(g, 96, 5, 96, x, 6, z, inkMaterial({ base: pal.ic, brush: 0.1, spec: 0.6, rim: 1, id: dieId }));
  const die = topDecal(92, 92, x, 11, z, (c, W, H) => {
    c.fillStyle = '#020604'; c.fillRect(0, 0, W, H);
    c.strokeStyle = pal.signal; c.fillStyle = pal.signal; c.lineWidth = 2;
    const n = 9;
    for (let i = 0; i < n; i++) for (let j = 0; j < n; j++) {
      const X = (i + 0.5) * W / n, Y = (j + 0.5) * H / n;
      c.globalAlpha = 0.35; c.strokeRect(X - W / n * 0.42, Y - H / n * 0.42, W / n * 0.84, H / n * 0.84);
      c.globalAlpha = 0.9; c.beginPath(); c.arc(X, Y, 3 + ((i * 7 + j * 3) % 4), 0, Math.PI * 2); c.fill();
    }
    c.globalAlpha = 0.6; c.lineWidth = 1.5;
    for (let k = 0; k < 40; k++) { const a = [(k * 37) % n, (k * 11) % n], b = [(k * 23 + 3) % n, (k * 5 + 1) % n]; c.beginPath(); c.moveTo((a[0] + 0.5) * W / n, (a[1] + 0.5) * H / n); c.lineTo((b[0] + 0.5) * W / n, (b[1] + 0.5) * H / n); c.stroke(); }
    c.globalAlpha = 1;
  }, glowId(), { res: 512, emissive: true });
  g.add(die);
  for (const sx of [-1, 1]) for (const sz of [-1, 1]) {
    box(g, 30, 11, 44, x + sx * 70, 6, z + sz * 26, inkMaterial({ base: pal.hbm, brush: 0.1, spec: 0.8, rim: 1 }));
  }
  // the network floating above: an icosphere shell, an inner d20 and a core, all linked
  const C = V(x, 176, z);
  const lattice = new THREE.Group(); lattice.position.copy(C); g.add(lattice);
  // the d20: an icosahedron shell, a counter-turned inner one, a core, all linked
  const icoO = new THREE.IcosahedronGeometry(84, 0), icoI = new THREE.IcosahedronGeometry(40, 0);
  icoI.rotateY(Math.PI / 5); icoI.rotateX(0.4);
  const outer = uniqueVerts(icoO), inner = uniqueVerts(icoI);
  const nodes = [...outer, ...inner, V(0, 0, 0)];
  const edges = [];
  edgeList(icoO, outer).forEach(([a, b]) => edges.push([a, b, 1.25]));
  edgeList(icoI, inner).forEach(([a, b]) => edges.push([outer.length + a, outer.length + b, 0.9]));
  inner.forEach((p, i) => {
    const near = outer.map((q, k) => [q.distanceTo(p), k]).sort((u, v) => u[0] - v[0]).slice(0, 2);
    near.forEach(([, k]) => edges.push([outer.length + i, k, 0.5]));
    edges.push([outer.length + i, nodes.length - 1, 0.6]);
  });
  // faint faces make it read as a solid crystal from a distance
  const faceMesh = new THREE.Mesh(icoO.clone(), lightMaterial({
    color: pal.signal,
    vertex: /* glsl */ `in vec3 position; in vec3 normal; uniform mat4 modelMatrix, viewMatrix, projectionMatrix; uniform vec3 cameraPosition; out float vF;
      void main(){ vec4 w = modelMatrix * vec4(position, 1.0); vec3 n = normalize(mat3(modelMatrix) * normal); vF = 1.0 - abs(dot(n, normalize(cameraPosition - w.xyz))); gl_Position = projectionMatrix * viewMatrix * w; }`,
    fragment: /* glsl */ `precision highp float; uniform vec3 uColor; uniform float uAmt; in float vF;
      layout(location = 0) out highp vec4 gColor; layout(location = 1) out highp vec4 gNormal;
      void main(){ gColor = vec4(uColor, (0.025 + vF * vF * 0.09) * uAmt); gNormal = vec4(0.0); }`,
    uniforms: { uAmt: { value: 1 } },
  }));
  lattice.add(faceMesh);
  const nodeMat = inkMaterial({ base: pal.hot, emissive: true, instanced: true });
  const nodeMesh = new THREE.InstancedMesh(new THREE.OctahedronGeometry(1, 0), nodeMat, nodes.length);
  const M = new THREE.Matrix4(), Q = new THREE.Quaternion(), up = V(0, 1, 0);
  nodes.forEach((p, i) => { const s = i === nodes.length - 1 ? 10 : i >= outer.length ? 3.6 : 5; M.compose(p, Q.identity(), V(s, s, s)); nodeMesh.setMatrixAt(i, M); });
  lattice.add(nodeMesh);
  const edgeMat = inkMaterial({ base: pal.signal, emissive: true, instanced: true });
  const edgeMesh = new THREE.InstancedMesh(new THREE.BoxGeometry(1, 1, 1), edgeMat, edges.length);
  edges.forEach(([a, b, w], i) => {
    const pa = nodes[a], pb = nodes[b], d = pb.clone().sub(pa), len = d.length();
    Q.setFromUnitVectors(up, d.normalize()); M.compose(pa.clone().add(pb).multiplyScalar(0.5), Q, V(0.9 * w, len, 0.9 * w)); edgeMesh.setMatrixAt(i, M);
  });
  lattice.add(edgeMesh);
  // sparks running along the links
  const nS = 18, sparkMesh = new THREE.InstancedMesh(new THREE.BoxGeometry(2.4, 2.4, 2.4), inkMaterial({ base: '#ffffff', emissive: true, instanced: true }), nS);
  lattice.add(sparkMesh);
  const sparks = Array.from({ length: nS }, (_, i) => ({ e: Math.floor(rnd() * edges.length), u: rnd(), v: 0.5 + rnd() * 1.2 }));
  // projection beam from the die
  const beamGeo = new THREE.CylinderGeometry(84, 46, 160, 40, 1, true); beamGeo.translate(0, 80, 0);
  const beam = new THREE.Mesh(beamGeo, lightMaterial({
    color: pal.signal,
    vertex: /* glsl */ `in vec3 position; in vec2 uv; uniform mat4 modelMatrix, viewMatrix, projectionMatrix; out vec2 vUv; out float vY;
      void main(){ vUv = uv; vY = position.y / 160.0; gl_Position = projectionMatrix * viewMatrix * modelMatrix * vec4(position, 1.0); }`,
    fragment: /* glsl */ `precision highp float; uniform vec3 uColor; uniform float uStep, uAmt; in vec2 vUv; in float vY;
      layout(location = 0) out highp vec4 gColor; layout(location = 1) out highp vec4 gNormal;
      void main(){ float scan = 0.65 + 0.35 * step(0.5, fract(vY * 18.0 - uStep * 1.5)); float a = (1.0 - vY) * 0.16 * scan * uAmt;
        gColor = vec4(uColor, a); gNormal = vec4(0.0); }`,
    uniforms: { uStep: shared.uStep, uAmt: { value: 1 } },
  }));
  beam.position.set(x, 11, z); g.add(beam);
  // decoupling and legend
  parts.row(x - 90, z + 128, x + 90, z + 128, 8, 'can', { r: 7, h: 20 });
  parts.row(x + 128, z - 80, x + 128, z + 80, 6, 'can', { r: 7, h: 20 });
  parts.sprinkle(x, z, 200, 200, 70, 6, 16);
  if (silk) {
    silk.ao(x, z, 210, 210, 8, 0.9);
    silk.footprint(x, z, 206, 206, 4);
    silk.text('U7', x - 104, z - 118, 10, { weight: '700' });
    // read from the south-west, where the camera arrives
    silk.text('神経', x - 150, z + 190, 56, { weight: '700', family: jpFont, rot: Math.PI / 4, stretch: 2.2 });
    silk.text('NEURAL CORE', x - 80, z + 240, 24, { weight: '700', family: dispFont, rot: Math.PI / 4, track: 2, stretch: 2 });
    silk.text('NPU-01  ·  LOCAL INFERENCE', x - 50, z + 286, 8, { rot: Math.PI / 4, stretch: 2 });
  }
  const update = (t, boost = 0) => {
    const step = Math.floor(t * 12) / 12;
    lattice.rotation.set(0.18 + Math.sin(step * 0.3) * 0.05, step * 0.22, 0.08);
    sparks.forEach((s, i) => {
      const [a, b] = edges[s.e];
      let u = s.u + step * s.v * (1 + boost * 2);
      const k = Math.floor(u); u -= k;
      if (k % 2) u = 1 - u;
      M.compose(nodes[a].clone().lerp(nodes[b], u), Q.identity(), V(1, 1, 1)); sparkMesh.setMatrixAt(i, M);
    });
    sparkMesh.instanceMatrix.needsUpdate = true;
  };
  return { group: g, update, lattice, nodeMesh, edgeMat, nodeMat, beam, faceMat: faceMesh.material, center: C };
}
function uniqueVerts(geo) {
  const p = geo.attributes.position, out = [];
  for (let i = 0; i < p.count; i++) { const v = V(p.getX(i), p.getY(i), p.getZ(i)); if (!out.some((q) => q.distanceToSquared(v) < 1e-3)) out.push(v); }
  return out;
}
function edgeList(geo, verts) {
  const p = geo.attributes.position, idx = (i) => verts.findIndex((q) => q.distanceToSquared(V(p.getX(i), p.getY(i), p.getZ(i))) < 1e-3), set = new Set(), out = [];
  for (let i = 0; i < p.count; i += 3) {
    const t = [idx(i), idx(i + 1), idx(i + 2)];
    for (const [a, b] of [[t[0], t[1]], [t[1], t[2]], [t[2], t[0]]]) { const k = a < b ? `${a}_${b}` : `${b}_${a}`; if (!set.has(k)) { set.add(k); out.push([a, b]); } }
  }
  return out;
}

// ---------------------------------------------------------------- secure enclave
export function buildEnclave(pal, parts, silk) {
  const g = new THREE.Group();
  const { x, z } = SITES.enclave;
  const canId = 188;
  const can = inkMaterial({ base: pal.shield, brush: 0.12, spec: 0.9, rim: 1, id: canId, dotCell: 4.5 });
  box(g, 190, 26, 150, x, 0, z, can);
  g.add(topDecal(190, 150, x, 26, z, (c, W, H) => {
    c.fillStyle = pal.shield; c.fillRect(0, 0, W, H);
    c.fillStyle = 'rgba(0,0,0,0.5)';
    for (let j = 0; j < 14; j++) for (let i = 0; i < 18; i++) { const X = (i + 0.5 + (j % 2) * 0.5) * W / 18.5, Y = (j + 0.5) * H / 14; if (Math.hypot(X - W / 2, Y - H / 2) < H * 0.36) continue; c.beginPath(); c.arc(X, Y, W * 0.0085, 0, Math.PI * 2); c.fill(); }
    c.fillStyle = 'rgba(0,0,0,0.75)'; c.font = `700 ${H * 0.07}px ${monoFont}`; c.fillText('SE-0', W * 0.04, H * 0.1);
  }, canId, { res: 1024 }));
  // vault boss on the lid
  const boss = new THREE.Mesh(new THREE.CylinderGeometry(44, 46, 7, 40), inkMaterial({ base: pal.shieldDark, brush: 0.12, spec: 0.9, rim: 1 }));
  boss.position.set(x, 29.5, z); g.add(boss);
  for (let i = 0; i < 8; i++) { const a = (i / 8) * Math.PI * 2; const b = new THREE.Mesh(new THREE.CylinderGeometry(3.4, 3.4, 3, 10), inkMaterial({ base: pal.nickel, spec: 1, rim: 1 })); b.position.set(x + Math.cos(a) * 36, 34.5, z + Math.sin(a) * 36); g.add(b); }
  const lockMat = inkMaterial({ base: pal.laser, emissive: true });
  const lock = new THREE.Mesh(new THREE.CylinderGeometry(13, 13, 3, 32), lockMat); lock.position.set(x, 34.5, z); g.add(lock);
  const lockIn = new THREE.Mesh(new THREE.CylinderGeometry(8, 8, 3.4, 32), inkMaterial({ base: pal.shieldDark, spec: 0.5 })); lockIn.position.set(x, 34.7, z); g.add(lockIn);
  box(g, 3, 1, 10, x, 36.2, z + 3, lockMat);
  // laser fence and a scanning sheet
  const laser = inkMaterial({ base: pal.laser, emissive: true });
  const W = 260, Dd = 220, posts = [[-1, -1], [1, -1], [1, 1], [-1, 1]];
  posts.forEach(([sx, sz]) => box(g, 3.4, 66, 3.4, x + sx * W / 2, 0, z + sz * Dd / 2, laser));
  posts.forEach(([sx, sz]) => box(g, 9, 4, 9, x + sx * W / 2, 0, z + sz * Dd / 2, inkMaterial({ base: pal.shieldDark, spec: 0.5 })));
  for (const y of [14, 31, 48]) {
    box(g, W, 0.9, 0.9, x, y, z - Dd / 2, laser); box(g, W, 0.9, 0.9, x, y, z + Dd / 2, laser);
    box(g, 0.9, 0.9, Dd, x - W / 2, y, z, laser); box(g, 0.9, 0.9, Dd, x + W / 2, y, z, laser);
  }
  const sheet = new THREE.Group(); g.add(sheet);
  const sheetMesh = new THREE.Mesh(new THREE.PlaneGeometry(W, Dd).rotateX(-Math.PI / 2), lightMaterial({
    color: pal.laser,
    vertex: /* glsl */ `in vec3 position; in vec2 uv; uniform mat4 modelMatrix, viewMatrix, projectionMatrix; out vec2 vUv;
      void main(){ vUv = uv; gl_Position = projectionMatrix * viewMatrix * modelMatrix * vec4(position, 1.0); }`,
    fragment: /* glsl */ `precision highp float; uniform vec3 uColor; in vec2 vUv;
      layout(location = 0) out highp vec4 gColor; layout(location = 1) out highp vec4 gNormal;
      void main(){ float l = step(0.5, fract(vUv.y * 40.0)); gColor = vec4(uColor, 0.07 + l * 0.05); gNormal = vec4(0.0); }`,
  }));
  sheet.add(sheetMesh);
  for (const [w, d, dx, dz] of [[W, 1.4, 0, -Dd / 2], [W, 1.4, 0, Dd / 2], [1.4, Dd, -W / 2, 0], [1.4, Dd, W / 2, 0]]) box(sheet, w, 0.9, d, dx, -0.45, dz, laser);
  sheet.position.set(x, 30, z);
  // the key store beside it
  parts.chip(x - 190, z - 20, 36, 36, 4.5, { label: 'TPM', pitch: 3.4 });
  parts.row(x - 210, z + 40, x - 170, z + 40, 3, 'cap');
  parts.sprinkle(x, z, 300, 260, 50, 4, 20);
  if (silk) {
    silk.ao(x, z, 200, 160, 7, 0.9);
    silk.hazard(x, z, W + 34, Dd + 34, 11, 9);
    silk.text('U9', x - W / 2 - 16, z - Dd / 2 - 26, 10, { weight: '700' });
    silk.text('認証', x - 214, z - 30, 46, { weight: '700', family: jpFont, rot: 0.7, stretch: 2.4 });
    silk.text('SECURE ENCLAVE', x - 150, z + 36, 18, { weight: '700', family: dispFont, rot: 0.7, track: 2, stretch: 2.2 });
    silk.text('NO UNSIGNED CODE PAST THIS LINE', x - 128, z + 78, 6.5, { rot: 0.7, stretch: 2 });
    // lock glyph on the board by the key store
    silk.rect(x - 190, z - 60, 18, 12, 1.4);
    silk.line([[x - 196, z - 66], [x - 196, z - 74], [x - 184, z - 74], [x - 184, z - 66]], 1.4);
  }
  const update = (t) => {
    const step = Math.floor(t * 12) / 12;
    sheet.position.y = 4 + (Math.sin(step * 1.7) * 0.5 + 0.5) * 56;
    lockMat.uniforms.uBase.value.set(pal.laser).multiplyScalar(0.6 + 0.4 * (Math.floor(t * 2.5) % 2));
  };
  return { group: g, update, laserMat: laser, lockMat, sheet };
}

// ---------------------------------------------------------------- the I/O edge: ports, the shield, light from outside
export function buildIO(pal, parts, silk) {
  const g = new THREE.Group();
  const steel = inkMaterial({ base: pal.ioSteel, brush: 0.14, spec: 0.9, rim: 1 });
  const dark = inkMaterial({ base: pal.connector, brush: 0.14, spec: 0.5, rim: 1 });
  const gold = inkMaterial({ base: pal.goldPart, brush: 0.12, spec: 1, rim: 1 });
  const X = -942;
  const ports = [
    { z: -600, w: 110, h: 128, d: 64, label: 'USB 10G' },
    { z: -520, w: 120, h: 168, d: 78, label: 'LAN 2.5G' },
    { z: -446, w: 100, h: 112, d: 60, label: 'HDMI · DP' },
    { z: -378, w: 110, h: 124, d: 66, label: 'USB-C 20G' },
    { z: -230, w: 100, h: 170, d: 72, label: 'AUDIO' },
  ];
  ports.forEach((p) => {
    box(g, p.w, p.h, p.d, X - (110 - p.w) / 2, 0, p.z, steel);
    box(g, p.w + 6, 7, p.d + 6, X - (110 - p.w) / 2, 0, p.z, dark);
    for (let k = 0; k < 3; k++) box(g, 10, 7, 8, X - (110 - p.w) / 2 - p.w / 2 + 16 + k * (p.w - 32) / 2, p.h, p.z - p.d / 4 + (k % 2) * p.d / 2, steel);
    for (let k = 0; k < 3; k++) box(g, 2, p.h - 30, 3, X - (110 - p.w) / 2 + p.w / 2 + 1, 14, p.z - p.d / 2 + 12 + k * (p.d - 24) / 2, steel);
    // solder legs and a lip on the inner face
    box(g, 4, p.h - 16, p.d - 12, X - (110 - p.w) / 2 + p.w / 2 + 1, 8, p.z, dark);
    for (let k = 0; k < 4; k++) box(g, 2.4, 6, 2.4, X + p.w / 2 + 6 - (110 - p.w) / 2, 0, p.z - p.d / 2 + 8 + k * (p.d - 16) / 3, gold);
    silk?.ao(X - (110 - p.w) / 2, p.z, p.w + 8, p.d + 8, 6, 0.9);
    silk?.text(p.label, X + 66, p.z, 7, { weight: '700', rot: -Math.PI / 2, align: 'center' });
  });
  for (const z of [-690, -655]) { const a = new THREE.Mesh(new THREE.CylinderGeometry(7, 7, 46, 6), gold); a.position.set(-960, 23, z); g.add(a); silk?.aoDisc(-960, z, 10, 4, 0.9); }
  // two buttons with status lights
  const ledG = inkMaterial({ base: pal.signal, emissive: true }), ledR = inkMaterial({ base: pal.laser, emissive: true });
  [[-322, ledG], [-292, ledR]].forEach(([z, m]) => { box(g, 40, 28, 26, -950, 0, z, dark); box(g, 6, 3, 6, -934, 28, z, m); });
  // the shield plate, with vents and the mark cut out of it
  const H = 330, Z0 = -720, Z1 = -150;
  const sh = new THREE.Shape();
  sh.moveTo(-Z0, 0); sh.lineTo(-Z1, 0); sh.lineTo(-Z1, H); sh.lineTo(-Z0, H); sh.lineTo(-Z0, 0);
  const holes = [];
  const markC = { u: 435, v: 250, s: 120 / 104 };
  pathShapes(FOLD_FRONT, true).concat(pathShapes(FOLD_BACK, true)).forEach((ms) => {
    const pts = ms.getPoints().map((p) => new THREE.Vector2(markC.u + p.x * markC.s, markC.v + p.y * markC.s));
    holes.push(pts);
  });
  for (const [u0, u1] of [[196, 356], [514, 690]]) for (let r = 0; r < 2; r++) for (let u = u0; u < u1; u += 40) holes.push([[u, 226 + r * 36], [u + 26, 226 + r * 36], [u + 26, 236 + r * 36], [u, 236 + r * 36]].map(([a, b]) => new THREE.Vector2(a, b)));
  holes.forEach((pts) => sh.holes.push(new THREE.Path(pts)));
  const shield = new THREE.Mesh(new THREE.ShapeGeometry(sh, 4), inkMaterial({ base: pal.ioShield, brush: 0.12, spec: 0.8, rim: 1, side: THREE.DoubleSide }));
  shield.rotation.y = Math.PI / 2; shield.position.set(-1004, 0, 0); g.add(shield);
  // outside: bright daylight behind the shield
  const outside = new THREE.Mesh(new THREE.PlaneGeometry(560, 150), inkMaterial({ base: pal.outside, emissive: true }));
  outside.rotation.y = Math.PI / 2; outside.position.set(-1016, 252, -435); g.add(outside);
  // light shafts: each opening extruded into the case along the light direction, colour only
  const Ld = V(1, -0.95, 0.14).normalize(), len = 560;
  const pos = [], fade = [];
  const toWorld = (p) => V(-1004, p.y, -p.x);
  const floorPatch = [];
  holes.forEach((pts, hi) => {
    const W = pts.map(toWorld);
    for (let i = 0; i < W.length; i++) {
      const a = W[i], b = W[(i + 1) % W.length], a2 = a.clone().addScaledVector(Ld, len), b2 = b.clone().addScaledVector(Ld, len);
      for (const [p, f] of [[a, 0], [b, 0], [b2, 1], [a, 0], [b2, 1], [a2, 1]]) { pos.push(p.x, p.y, p.z); fade.push(f); }
    }
    if (hi < 5) floorPatch.push(W.map((p) => p.clone().addScaledVector(Ld, -p.y / Ld.y)));
  });
  const shaftGeo = new THREE.BufferGeometry();
  shaftGeo.setAttribute('position', new THREE.Float32BufferAttribute(pos, 3));
  shaftGeo.setAttribute('fade', new THREE.Float32BufferAttribute(fade, 1));
  const shaftMat = lightMaterial({
    color: pal.outside,
    vertex: /* glsl */ `in vec3 position; in float fade; uniform mat4 modelMatrix, viewMatrix, projectionMatrix; out float vF; out vec3 vW;
      void main(){ vF = fade; vec4 w = modelMatrix * vec4(position, 1.0); vW = w.xyz; gl_Position = projectionMatrix * viewMatrix * w; }`,
    fragment: /* glsl */ `precision highp float; uniform vec3 uColor, uLd, cameraPosition; uniform float uAmt, uStep; in float vF; in vec3 vW;
      layout(location = 0) out highp vec4 gColor; layout(location = 1) out highp vec4 gNormal;
      void main(){
        // light scatters forward: the shafts are brightest looking back toward the opening
        float fw = max(0.0, -dot(normalize(vW - cameraPosition), uLd));
        float a = pow(1.0 - vF, 1.4) * (0.018 + 0.15 * fw * fw * fw) * uAmt * step(0.0, vW.y);
        gColor = vec4(uColor, a); gNormal = vec4(0.0);
      }`,
    uniforms: { uAmt: { value: 1 }, uStep: shared.uStep, uLd: { value: Ld.clone() } },
  });
  const shafts = new THREE.Mesh(shaftGeo, shaftMat); shafts.frustumCulled = false; g.add(shafts);
  // the mark of light lands on the board
  const patchPos = [];
  floorPatch.forEach((poly) => {
    const sh2 = new THREE.Shape(poly.map((p) => new THREE.Vector2(p.x, p.z)));
    const tri = THREE.ShapeUtils.triangulateShape(sh2.getPoints(), []);
    const P = sh2.getPoints();
    tri.forEach((t) => t.forEach((k) => patchPos.push(P[k].x, 0.9, P[k].y)));
  });
  const patchGeo = new THREE.BufferGeometry(); patchGeo.setAttribute('position', new THREE.Float32BufferAttribute(patchPos, 3));
  const patchMat = lightMaterial({
    color: pal.outside,
    vertex: /* glsl */ `in vec3 position; uniform mat4 modelMatrix, viewMatrix, projectionMatrix; void main(){ gl_Position = projectionMatrix * viewMatrix * modelMatrix * vec4(position, 1.0); }`,
    fragment: /* glsl */ `precision highp float; uniform vec3 uColor; uniform float uAmt; layout(location = 0) out highp vec4 gColor; layout(location = 1) out highp vec4 gNormal;
      void main(){ gColor = vec4(uColor, 0.32 * uAmt); gNormal = vec4(0.0); }`,
    uniforms: { uAmt: { value: 1 } },
  });
  g.add(new THREE.Mesh(patchGeo, patchMat));
  // controllers that serve the ports
  parts.chip(-820, -560, 38, 38, 4, { label: 'U21 LAN' });
  parts.chip(-822, -200, 30, 30, 3.5, { label: 'U24 CODEC' });
  parts.chip(-760, -420, 34, 34, 4, { label: 'U22 USB' });
  parts.sprinkle(-820, -560, 38, 38, 26); parts.sprinkle(-822, -200, 30, 30, 22); parts.sprinkle(-760, -420, 34, 34, 22);
  for (let i = 0; i < 6; i++) parts.can(-860 + (i % 3) * 22, -150 + Math.floor(i / 3) * 22, 8, 22, pal.audioCap, pal.audioCapTop);
  if (silk) {
    silk.text('接続', -856, -380, 62, { weight: '700', family: jpFont, rot: -Math.PI / 2, stretch: 1.8 });
    silk.text('I/O', -770, -380, 36, { weight: '700', family: dispFont, rot: -Math.PI / 2, stretch: 1.8 });
    silk.text('REAR PANEL  ·  OUT TO THE WORLD', -730, -380, 8, { rot: -Math.PI / 2, stretch: 1.8 });
    silk.line([[-884, -720], [-884, -150]], 1.2);
  }
  return { group: g, shaftMat, patchMat, outside, shafts };
}

// ---------------------------------------------------------------- expansion, chipset, edge connectors and the rest of the city
export function buildRest(pal, parts, silk) {
  const g = new THREE.Group();
  const slot = inkMaterial({ base: pal.slot, brush: 0.14, spec: 0.5, rim: 1 });
  const armour = inkMaterial({ base: pal.ioSteel, brush: 0.14, spec: 1, rim: 1 });
  const dark = inkMaterial({ base: pal.connector, brush: 0.14, spec: 0.5, rim: 1 });
  // PCIe slots: long rails across the south
  box(g, 572, 24, 20, -436, 0, 560, armour); box(g, 22, 30, 22, -138, 0, 560, inkMaterial({ base: pal.latch, spec: 0.6, rim: 1 }));
  box(g, 560, 1, 3, -436, 24, 560, inkMaterial({ base: pal.goldPart, spec: 1, rim: 0.3 }));
  box(g, 572, 22, 18, -436, 0, 680, slot); box(g, 22, 28, 20, -138, 0, 680, inkMaterial({ base: pal.latch, spec: 0.6, rim: 1 }));
  // storage under a heatsink between them
  const m2Id = 184;
  box(g, 330, 12, 66, -460, 0, 620, inkMaterial({ base: pal.anod, brush: 0.12, spec: 0.8, rim: 1, id: m2Id }));
  g.add(topDecal(330, 66, -460, 12, 620, (c, W, H) => {
    c.fillStyle = pal.anod; c.fillRect(0, 0, W, H);
    c.fillStyle = 'rgba(255,255,255,0.08)'; for (let x = 0; x < W; x += 14) c.fillRect(x, 0, 6, H);
    c.fillStyle = pal.silk; c.font = `700 ${H * 0.32}px ${dispFont}`; c.textBaseline = 'middle'; c.fillText('M.2_1  STORAGE', W * 0.05, H * 0.52);
    c.fillStyle = pal.signal; c.fillRect(W * 0.7, H * 0.44, W * 0.25, H * 0.12);
  }, m2Id, { res: 1024 }));
  // chipset under a sculpted heatsink
  const csId = 182;
  box(g, 190, 10, 190, 560, 0, 520, inkMaterial({ base: pal.sinkDark, brush: 0.14, spec: 0.7, rim: 1 }));
  box(g, 160, 24, 160, 560, 10, 520, inkMaterial({ base: pal.sink, brush: 0.14, spec: 0.9, rim: 1, id: csId }));
  g.add(topDecal(160, 160, 560, 34, 520, (c, W, H) => {
    c.fillStyle = pal.sink; c.fillRect(0, 0, W, H);
    c.strokeStyle = 'rgba(0,0,0,0.35)'; c.lineWidth = W * 0.012; for (let k = -W; k < W * 2; k += W * 0.06) { c.beginPath(); c.moveTo(k, 0); c.lineTo(k - H, H); c.stroke(); }
    c.fillStyle = pal.anod; c.fillRect(W * 0.12, H * 0.34, W * 0.76, H * 0.32);
    c.fillStyle = pal.silk; c.font = `700 ${H * 0.16}px ${jpFont}`; c.textBaseline = 'middle'; c.fillText('制御', W * 0.17, H * 0.5);
    c.font = `700 ${H * 0.11}px ${dispFont}`; c.fillText('CONTROL', W * 0.45, H * 0.52);
  }, csId, { res: 1024 }));
  box(g, 150, 2, 1.4, 560, 20, 600.8, inkMaterial({ base: pal.signal, emissive: true }));
  // edge connectors: main power, storage, headers
  box(g, 44, 50, 238, 940, 0, -140, dark);
  for (let i = 0; i < 12; i++) for (let j = 0; j < 2; j++) box(g, 9, 2, 9, 931 + j * 18, 50, -224 + i * 15, inkMaterial({ base: pal.ink2, spec: 0 }));
  for (let i = 0; i < 4; i++) box(g, 34, 30, 46, 950, 0, 140 + i * 58, dark);
  box(g, 52, 20, 22, 720, 0, 700, dark); box(g, 44, 16, 22, 560, 0, 700, dark);
  for (const [x, z] of [[-430, -620], [700, -650], [880, 610], [-700, 700]]) box(g, 22, 14, 10, x, 0, z, inkMaterial({ base: pal.latch, spec: 0.5, rim: 1 }));
  // the clock battery: a silver stadium
  const bat = new THREE.Mesh(new THREE.CylinderGeometry(48, 48, 9, 48), inkMaterial({ base: pal.nickel, spec: 1, rim: 1, brush: 0.1 })); bat.position.set(330, 8, 640); g.add(bat);
  const holder = new THREE.Mesh(new THREE.CylinderGeometry(54, 54, 4, 48), dark); holder.position.set(330, 2, 640); g.add(holder);
  // status display by the main power
  const code = labelPlane(34, 20, (c, W, H) => { c.fillStyle = '#060908'; c.fillRect(0, 0, W, H); c.fillStyle = pal.laser; c.font = `700 ${H * 0.8}px ${monoFont}`; c.textAlign = 'center'; c.textBaseline = 'middle'; c.fillText('A0', W / 2, H * 0.55); }, { emissive: true, res: 128 });
  code.rotation.x = -Math.PI / 2; code.position.set(860, 6.1, -330); g.add(code); box(g, 40, 6, 26, 860, 0, -330, dark);
  const leds = [];
  ['CPU', 'DRAM', 'VGA', 'BOOT'].forEach((n, i) => { const m = inkMaterial({ base: i === 3 ? pal.signal : pal.ledOff, emissive: true }); box(g, 6, 2.5, 4, 820, 0, -300 + i * 14, m); leds.push(m); silk?.text(n, 800, -300 + i * 14, 4.5, { align: 'right' }); });
  // controller chips scattered through the city
  [[720, 420, 56, 56, 'U31 SIO'], [150, 200, 24, 24, 'U12 CLK'], [640, 300, 26, 20, 'U40 BIOS'], [-700, 160, 40, 40, 'U18'], [420, 650, 30, 30, 'U33'], [-240, 640, 26, 26, 'U27'], [800, 160, 34, 34, 'U35'], [-560, -620, 40, 30, 'U20'], [520, -620, 44, 44, 'U38'], [780, -500, 30, 30, 'U39'], [-880, 300, 36, 36, 'U16'], [-860, 560, 30, 30, 'U15']].forEach(([x, z, w, d, l]) => { parts.chip(x, z, w, d, 4, { label: l }); parts.sprinkle(x, z, w, d, 18); });
  // random filler parts in the empty blocks
  const keep = [[-80, -120, 380, 380], [-80, -340, 560, 110], [-306, -88, 110, 480], [334, -108, 230, 820], [-470, 330, 300, 300], [120, 430, 330, 290], [-940, -435, 160, 620], [-436, 620, 620, 160], [560, 520, 210, 210], [940, -140, 80, 260], [950, 230, 60, 260], [330, 640, 120, 120], [860, -320, 80, 120]];
  const free = (x, z, r) => Math.abs(x) < BOARD.w / 2 - 40 && Math.abs(z) < BOARD.h / 2 - 40 && !keep.some(([kx, kz, kw, kd]) => Math.abs(x - kx) < kw / 2 + r && Math.abs(z - kz) < kd / 2 + r);
  let n = 0;
  for (let tries = 0; tries < 600 && n < 34; tries++) {
    const x = (rnd() - 0.5) * BOARD.w, z = (rnd() - 0.5) * BOARD.h, w = 14 + rnd() * 30, d = 14 + rnd() * 30;
    if (!free(x, z, Math.max(w, d))) continue;
    parts.chip(x, z, w, d, 3 + rnd() * 2, { label: `U${50 + n}`, pins: rnd() < 0.7 }); parts.sprinkle(x, z, w, d, 10); n++;
  }
  let c = 0;
  for (let tries = 0; tries < 900 && c < 70; tries++) {
    const x = (rnd() - 0.5) * BOARD.w, z = (rnd() - 0.5) * BOARD.h, r = 5 + rnd() * 6;
    if (!free(x, z, r + 6)) continue;
    parts.can(x, z, r, 14 + rnd() * 18, rnd() < 0.7 ? pal.can : pal.can2); c++;
  }
  for (let tries = 0, k = 0; tries < 3000 && k < 900; tries++) {
    const x = (rnd() - 0.5) * BOARD.w, z = (rnd() - 0.5) * BOARD.h;
    if (!free(x, z, 4)) continue;
    const rot = rnd() < 0.5; parts.passive(x, z, rot ? 2.2 : 4.2, rot ? 4.2 : 2.2, 1.6); k++;
  }
  if (silk) {
    silk.ao(-436, 560, 580, 30, 5, 0.9); silk.ao(-436, 680, 580, 28, 5, 0.9); silk.ao(-460, 620, 336, 72, 6, 0.85); silk.ao(560, 520, 200, 200, 8, 0.9);
    silk.ao(940, -140, 52, 246, 6, 0.9); silk.aoDisc(330, 640, 56, 6, 0.9);
    silk.text('PCIE_1  ×16', -720, 536, 9, { weight: '700' }); silk.text('PCIE_2  ×4', -720, 704, 9, { weight: '700' });
    silk.text('ATX_24P', 900, -270, 7, { weight: '700', rot: Math.PI / 2 });
    silk.text('BAT1  +', 380, 700, 7, { weight: '700' });
    for (const [x, z] of [[-950, -700], [950, -700], [950, 700], [-950, 700], [-80, 700], [330, -660], [-660, 120]]) { silk.ring(x, z, 8, 16); silk.aoDisc(x, z, 18, 4, 0.5); }
    // board identity, bottom left
    silk.path(FOLD_FRONT, -880, 620, 60); silk.path(FOLD_BACK, -880, 620, 60);
    silk.text('XINI', -842, 606, 30, { weight: '700', family: dispFont, track: 3 });
    silk.text('MB-01  REV 2.6  ·  2026', -842, 634, 9);
    silk.text('DESIGNED AND BUILT BY XINI', -842, 650, 7);
  }
  // status lights all over the city: they read as windows from above
  const ledCols = [pal.signal, pal.amber, pal.laser, pal.blue, '#ffffff'];
  const L = [];
  for (let tries = 0; tries < 2000 && L.length < 90; tries++) {
    const x = (rnd() - 0.5) * (BOARD.w - 80), z = (rnd() - 0.5) * (BOARD.h - 80);
    if (!free(x, z, 3)) continue;
    L.push({ x, z, c: ledCols[Math.floor(rnd() * ledCols.length)], r: rnd(), rate: 0.6 + rnd() * 2.5 });
  }
  const ledMesh = new THREE.InstancedMesh(new THREE.BoxGeometry(2.4, 1.3, 3.4), inkMaterial({ base: '#ffffff', emissive: true, instanced: true, instanceColor: true }), L.length);
  const M = new THREE.Matrix4(), col = new THREE.Color(), off = new THREE.Color(pal.ledOff);
  L.forEach((l, i) => { M.makeTranslation(l.x, 0.65, l.z); ledMesh.setMatrixAt(i, M); ledMesh.setColorAt(i, col.set(l.c)); silk?.pad(l.x, l.z - 2.6, 3, 1.2); silk?.pad(l.x, l.z + 2.6, 3, 1.2); });
  ledMesh.frustumCulled = false; g.add(ledMesh);
  const updateLeds = (t) => {
    const step = Math.floor(t * 12) / 12;
    L.forEach((l, i) => { const on = l.r < 0.55 || Math.sin(step * l.rate * 3 + l.r * 40) > -0.2; ledMesh.setColorAt(i, on ? col.set(l.c) : off); });
    ledMesh.instanceColor.needsUpdate = true;
  };
  // power cables: sleeved bundles that rise from the connectors and leave the board, a sense of the case above
  const sleeve = inkMaterial({ base: pal.sleeve ?? '#1a1f26', brush: 0.25, stroke: 0.3, spec: 0.5, rim: 1 });
  const comb = inkMaterial({ base: pal.signal, emissive: true, bloom: false });
  const bundle = (pts, n = 6, r = 4.2) => {
    const curve = new THREE.CatmullRomCurve3(pts, false, 'centripetal');
    const frames = curve.computeFrenetFrames(80, false);
    for (let k = 0; k < n; k++) {
      const a = (k / n) * Math.PI * 2, off = r * 1.9;
      const shifted = curve.getSpacedPoints(80).map((p, i) => p.clone().addScaledVector(frames.normals[i], Math.cos(a) * off).addScaledVector(frames.binormals[i], Math.sin(a) * off));
      g.add(new THREE.Mesh(new THREE.TubeGeometry(new THREE.CatmullRomCurve3(shifted), 120, r, 8, false), sleeve));
    }
    for (let i = 1; i < 6; i++) { const u = i / 6, p = curve.getPointAt(u), t = curve.getTangentAt(u); const c = new THREE.Mesh(new THREE.CylinderGeometry(r * 3.6, r * 3.6, 6, 16), comb); c.position.copy(p); c.quaternion.setFromUnitVectors(V(0, 1, 0), t); g.add(c); }
  };
  bundle([V(940, 50, -140), V(930, 220, -260), V(760, 640, -560), V(380, 1060, -880), V(-260, 1360, -1160)]);
  bundle([V(-360, 30, -420), V(-390, 160, -500), V(-560, 560, -700), V(-860, 1000, -900), V(-1200, 1300, -1000)], 4, 3.6);
  return { group: g, leds, updateLeds };
}

// ---------------------------------------------------------------- buses: the processor talks to every district
export function buildBuses(tr) {
  const { cx, cz } = TOWER;
  const D = SITES.dimm;
  // memory: four channels fan out under the slots
  for (let k = 0; k < 4; k++) {
    const z0 = cz - 90 + k * 46, x1 = D.x0 + k * D.pitch;
    const zf = z0 + (k - 1.5) * 90;
    tr.bus(routeChain([[cx + 120, z0], [D.x0 - 60, z0], [x1 - 14, zf], [x1 - 14, zf + [-120, -220, 220, 150][k]]]), 9, 4.4, 2.2);
  }
  tr.bus([[cx - 60, cz + 120], [cx - 60, 330], [-300, 490], [-300, 552]], 16, 4.4, 2.2);           // to the big slot
  tr.bus([[cx - 120, cz + 80], [cx - 120, 8], [-420, 228]], 12, 4.4, 2.1);              // to the neural core
  tr.bus([[cx + 120, cz + 120], [250, 210], [440, 400], [466, 426]], 10, 4.4, 2.1);                // to the chipset
  tr.bus([[464, 540], [262, 540]], 6, 4, 1.4);                                                     // chipset → enclave
  tr.bus([[656, 470], [800, 470], [930, 340], [930, 150]], 8, 3.6, 1.4);                           // chipset → storage ports
  tr.bus([[464, 600], [300, 600], [220, 680], [-125, 680]], 8, 3.6, 1.4);                         // chipset → second slot
  tr.bus([[cx - 120, cz - 110], [-560, cz - 110], [-830, -500], [-884, -500]], 10, 4.4, 2.0);     // → network and USB
  tr.bus([[cx - 120, cz + 20], [-600, cz + 20], [-850, -350], [-884, -350]], 8, 4.4, 2.0);        // → display and USB-C
  tr.bus([[-806, -200], [-884, -230]], 6, 3.4, 1.2);                                               // codec → audio
  tr.bus([[-700, 160], [-560, 300], [-560, 380], [-574, 394]], 6, 3.6, 1.3);
  tr.bus([[720, 392], [720, 250], [640, 170], [400, 170]], 6, 3.6, 1.3);
  tr.bus([[150, 188], [150, 120], [100, 70]], 5, 3, 1.1);
  tr.bus([[860, -317], [880, -260], [918, -230]], 4, 3, 1.1);
  // short local routes between neighbours, in pairs and fours
  for (let i = 0; i < 160; i++) {
    const x = (rnd() - 0.5) * (BOARD.w - 120), z = (rnd() - 0.5) * (BOARD.h - 120);
    const L1 = 30 + rnd() * 110, L2 = 20 + rnd() * 80, dir = Math.floor(rnd() * 4), s = rnd() < 0.5 ? 1 : -1;
    const a = [x, z];
    const b = dir % 2 ? [x + L1 * (dir === 1 ? 1 : -1), z] : [x, z + L1 * (dir === 0 ? 1 : -1)];
    const c = dir % 2 ? [b[0] + L2 * Math.sign(b[0] - x) * 0.7, b[1] + L2 * s * 0.7] : [b[0] + L2 * s * 0.7, b[1] + L2 * Math.sign(b[1] - z) * 0.7];
    tr.bus([a, b, c], 1 + Math.floor(rnd() * 4), 3, 0.9);
  }
}

/** dust: specks of light that drift round the camera */
export function buildDust(pal, count = 1600) {
  const pos = new Float32Array(count * 3), seed = new Float32Array(count);
  for (let i = 0; i < count; i++) { pos[i * 3] = rnd() * 700; pos[i * 3 + 1] = rnd() * 700; pos[i * 3 + 2] = rnd() * 700; seed[i] = rnd(); }
  const geo = new THREE.BufferGeometry();
  geo.setAttribute('position', new THREE.BufferAttribute(pos, 3)); geo.setAttribute('seed', new THREE.BufferAttribute(seed, 1));
  const mat = lightMaterial({
    color: pal.dust,
    vertex: /* glsl */ `in vec3 position; in float seed; uniform mat4 viewMatrix, projectionMatrix; uniform vec3 uCam; uniform float uTime, uPx, uScale;
      out float vA;
      void main(){
        vec3 p = position + vec3(sin(uTime * 0.11 + seed * 30.0) * 30.0, uTime * (2.0 + seed * 4.0), cos(uTime * 0.09 + seed * 20.0) * 30.0);
        p = mod(p - uCam + 350.0, 700.0) - 350.0 + uCam;
        p.y = max(p.y, 2.0);
        vec4 mv = viewMatrix * vec4(p, 1.0);
        float d = -mv.z;
        vA = smoothstep(350.0, 120.0, length(p - uCam)) * (0.35 + 0.65 * fract(seed * 7.3)) * smoothstep(4.0, 24.0, d);
        gl_PointSize = clamp(uScale * uPx * (1.0 + seed * 1.5) * 300.0 / max(d, 1.0), 1.0, 7.0 * uPx);
        gl_Position = projectionMatrix * mv;
      }`,
    fragment: /* glsl */ `precision highp float; uniform vec3 uColor; in float vA;
      layout(location = 0) out highp vec4 gColor; layout(location = 1) out highp vec4 gNormal;
      void main(){ vec2 q = gl_PointCoord - 0.5; float r = length(q); if (r > 0.5) discard; gColor = vec4(uColor, vA * 0.55 * step(r, 0.36)); gNormal = vec4(0.0); }`,
    uniforms: { uCam: { value: new THREE.Vector3() }, uTime: shared.uTime, uPx: shared.uPx, uScale: { value: 1.2 } },
  });
  const pts = new THREE.Points(geo, mat); pts.frustumCulled = false; pts.renderOrder = 50;
  return pts;
}
