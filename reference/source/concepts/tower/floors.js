import * as THREE from 'three';
import { glowId, shared } from '../../shared/gfx/ink-material.js';
import { labelPlane, lightMaterial, mergedBoxes, canvasTex, QUIET_GLOW } from '../machine/board.js';
import { inkMaterial, V, T, FLOORS } from './build.js';

// The five open floors of the tower, each staged on the north side of the atrium so the camera,
// hanging in the shaft, looks straight into it. The gallery uses three walls.
export const jpFont = '"Zen Kaku Gothic New", "Hiragino Sans", sans-serif';
export const dispFont = '"Anton", "Big Shoulders Display Variable", sans-serif';
export const monoFont = '"JetBrains Mono Variable", ui-monospace, monospace';
const box = (parent, w, h, d, x, y, z, m) => { const b = new THREE.Mesh(new THREE.BoxGeometry(w, h, d), m); b.position.set(x, y + h / 2, z); parent.add(b); return b; };

/** a neon sign: kanji over a latin word, emissive, on the back wall of a floor */
function neonSign(jp, en, pal, w = 70, h = 34) {
  const m = labelPlane(w, h, (c, W, H) => {
    c.clearRect(0, 0, W, H); c.fillStyle = '#0a0607'; c.fillRect(0, 0, W, H);
    c.fillStyle = pal.signal; c.textAlign = 'left'; c.textBaseline = 'alphabetic';
    c.font = `700 ${H * 0.62}px ${jpFont}`; c.fillText(jp, W * 0.04, H * 0.68);
    c.fillStyle = pal.lamp; c.font = `400 ${H * 0.26}px ${dispFont}`; c.fillText(en.toUpperCase(), W * 0.05 + c.measureText(jp).width * 0 + W * 0.0, H * 0.94);
    c.fillStyle = pal.signal; c.fillRect(0, 0, W, H * 0.03); c.fillRect(0, H * 0.97, W, H * 0.03);
  }, { emissive: true, res: 512 });
  return m;
}

// ---------------------------------------------------------------- systems: a hall of racks
export function buildSystems(pal) {
  const g = new THREE.Group(); const y0 = FLOORS.systems;
  const rackMat = inkMaterial({ base: pal.rack, brush: 0.12, spec: 0.6, rim: 1 });
  const face = canvasTex(256, 1024, (c, W, H) => {
    c.fillStyle = '#0b0809'; c.fillRect(0, 0, W, H);
    for (let u = 0; u < 42; u++) {
      const y = 24 + u * 23; c.fillStyle = '#17110f'; c.fillRect(14, y, W - 28, 18);
      for (let k = 0; k < 9; k++) { const on = ((u * 7 + k * 13) % 11) < 6; c.fillStyle = on ? (k % 4 === 0 ? pal.signal : (k % 3 ? pal.lamp : pal.cyan)) : '#2a1e1c'; c.fillRect(24 + k * 9, y + 6, 4, 4); }
      c.fillStyle = '#2a201e'; for (let x = 120; x < W - 20; x += 8) c.fillRect(x, y + 4, 4, 10);
    }
  });
  const faceMat = inkMaterial({ base: '#ffffff', map: face, mapAmt: 1, emissive: true, bloom: false });
  const rows = [-78, -100];
  rows.forEach((z, r) => {
    for (let k = -5; k <= 5; k++) {
      const x = k * 19;
      box(g, 16, 72, 20, x, y0, z, rackMat);
      const f = new THREE.Mesh(new THREE.PlaneGeometry(14, 68), faceMat); f.position.set(x, y0 + 36, z + 10.05); g.add(f);
    }
  });
  // racks also line the side halls, glimpsed at the edges of the frame
  for (const sx of [-1, 1]) for (let k = -2; k <= 2; k++) { const z = k * 19; box(g, 20, 72, 16, sx * 92, y0, z, rackMat); const f = new THREE.Mesh(new THREE.PlaneGeometry(14, 68), faceMat); f.position.set(sx * 81.9, y0 + 36, z); f.rotation.y = sx > 0 ? -Math.PI / 2 : Math.PI / 2; g.add(f); }
  // cable trays overhead, raised floor, a sign
  const trays = [];
  for (const z of [-72, -96]) trays.push({ p: [0, y0 + 80, z], s: [210, 2, 10] });
  for (let x = -100; x <= 100; x += 25) trays.push({ p: [x, y0 + 84, -84], s: [1.5, 8, 1.5] });
  g.add(new THREE.Mesh(mergedBoxes(trays), inkMaterial({ base: pal.steel, spec: 0.8, rim: 1 })));
  const cables = [];
  for (let i = 0; i < 14; i++) cables.push({ p: [-100 + i * 15, y0 + 82, -72], s: [3, 2.4, 9] });
  g.add(new THREE.Mesh(mergedBoxes(cables), inkMaterial({ base: pal.cable, spec: 0.5, rim: 1 })));
  const sign = neonSign('構築', 'Systems', pal, 64, 30); sign.position.set(-60, y0 + 70, -112.4); g.add(sign);
  return { group: g };
}

// ---------------------------------------------------------------- lab: the d20 over a dais
export function buildLab(pal) {
  const g = new THREE.Group(); const y0 = FLOORS.ai;
  const C = V(0, y0 + 50, -88);
  const dais = new THREE.Mesh(new THREE.CylinderGeometry(26, 30, 5, 48), inkMaterial({ base: pal.concreteDark, brush: 0.15, spec: 0.5, rim: 1 })); dais.position.set(C.x, y0 + 2.5, C.z); g.add(dais);
  const ringM = new THREE.Mesh(new THREE.TorusGeometry(27, 0.8, 6, 64), inkMaterial({ base: pal.signal, emissive: true })); ringM.rotation.x = Math.PI / 2; ringM.position.set(C.x, y0 + 5.2, C.z); g.add(ringM);
  const lat = new THREE.Group(); lat.position.copy(C); g.add(lat);
  const ico = new THREE.IcosahedronGeometry(24, 0), inner = new THREE.IcosahedronGeometry(11, 0); inner.rotateY(0.6);
  const verts = (geo) => { const p = geo.attributes.position, o = []; for (let i = 0; i < p.count; i++) { const v = V(p.getX(i), p.getY(i), p.getZ(i)); if (!o.some((q) => q.distanceToSquared(v) < 1e-3)) o.push(v); } return o; };
  const edges = (geo, vs) => { const p = geo.attributes.position, idx = (i) => vs.findIndex((q) => q.distanceToSquared(V(p.getX(i), p.getY(i), p.getZ(i))) < 1e-3), set = new Set(), o = []; for (let i = 0; i < p.count; i += 3) { const t = [idx(i), idx(i + 1), idx(i + 2)]; for (const [a, b] of [[t[0], t[1]], [t[1], t[2]], [t[2], t[0]]]) { const k = a < b ? `${a}_${b}` : `${b}_${a}`; if (!set.has(k)) { set.add(k); o.push([a, b]); } } } return o; };
  const vo = verts(ico), vi = verts(inner);
  const nodes = [...vo, ...vi, V(0, 0, 0)];
  const E = [...edges(ico, vo).map(([a, b]) => [a, b, 0.5]), ...edges(inner, vi).map(([a, b]) => [vo.length + a, vo.length + b, 0.35]), ...vi.map((_, i) => [vo.length + i, nodes.length - 1, 0.25])];
  const M = new THREE.Matrix4(), Q = new THREE.Quaternion(), up = V(0, 1, 0);
  const em = new THREE.InstancedMesh(new THREE.BoxGeometry(1, 1, 1), inkMaterial({ base: pal.signal, emissive: true, instanced: true }), E.length);
  E.forEach(([a, b, w], i) => { const pa = nodes[a], pb = nodes[b], d = pb.clone().sub(pa), L = d.length(); Q.setFromUnitVectors(up, d.normalize()); M.compose(pa.clone().add(pb).multiplyScalar(0.5), Q, V(w, L, w)); em.setMatrixAt(i, M); });
  lat.add(em);
  const nm = new THREE.InstancedMesh(new THREE.OctahedronGeometry(1, 0), inkMaterial({ base: pal.lamp, emissive: true, instanced: true }), nodes.length);
  nodes.forEach((p, i) => { const s = i === nodes.length - 1 ? 3.5 : i >= vo.length ? 1.2 : 1.8; M.compose(p, Q.identity(), V(s, s, s)); nm.setMatrixAt(i, M); });
  lat.add(nm);
  const beamGeo = new THREE.CylinderGeometry(26, 20, 40, 32, 1, true); beamGeo.translate(0, 20, 0);
  const beam = new THREE.Mesh(beamGeo, lightMaterial({
    color: pal.signal,
    vertex: /* glsl */ `in vec3 position; uniform mat4 modelMatrix, viewMatrix, projectionMatrix; out float vY; void main(){ vY = position.y / 40.0; gl_Position = projectionMatrix * viewMatrix * modelMatrix * vec4(position, 1.0); }`,
    fragment: /* glsl */ `precision highp float; uniform vec3 uColor; uniform float uStep; in float vY; layout(location = 0) out highp vec4 gColor; layout(location = 1) out highp vec4 gNormal;
      void main(){ float s = 0.6 + 0.4 * step(0.5, fract(vY * 12.0 - uStep)); gColor = vec4(uColor, (1.0 - vY) * 0.14 * s); gNormal = vec4(0.0); }`,
    uniforms: { uStep: shared.uStep },
  }));
  beam.position.set(C.x, y0 + 5, C.z); g.add(beam);
  // terminals round the dais
  const desk = inkMaterial({ base: pal.concreteDark, brush: 0.15, spec: 0.4, rim: 1 });
  const scr = inkMaterial({ base: pal.screen, emissive: true });
  for (const [x, z, ry] of [[-50, -72, 0.5], [50, -72, -0.5], [-62, -102, 0.9], [62, -102, -0.9]]) {
    const d = new THREE.Group(); d.position.set(x, y0, z); d.rotation.y = ry; g.add(d);
    box(d, 22, 9, 10, 0, 0, 0, desk);
    const s = new THREE.Mesh(new THREE.BoxGeometry(18, 11, 0.8), scr); s.position.set(0, 17, -3); s.rotation.x = -0.15; d.add(s);
  }
  const sign = neonSign('知能', 'Intelligence', pal, 64, 30); sign.position.set(56, y0 + 70, -112.4); g.add(sign);
  const update = (t, boost = 0) => { const st = Math.floor(t * 12) / 12; lat.rotation.set(0.25, st * 0.3 * (1 + boost * 3), 0.1); };
  return { group: g, update, center: C };
}

// ---------------------------------------------------------------- vault: a door you could park a car in
export function buildVault(pal) {
  const g = new THREE.Group(); const y0 = FLOORS.security;
  const C = V(0, y0 + 46, -103);
  const wall = inkMaterial({ base: pal.concrete, brush: 0.22, spec: 0.1, rim: 0.8, stroke: 0.16 });
  box(g, 230, 90, 8, 0, y0, -108, wall);
  const steel = inkMaterial({ base: pal.vault, brush: 0.12, spec: 1, rim: 1, mid: 0.36, dark: 0.7 });
  const steelD = inkMaterial({ base: pal.vaultDark, brush: 0.12, spec: 0.8, rim: 1 });
  const door = new THREE.Group(); door.position.copy(C); g.add(door);
  const cyl = (r, d, z, m, seg = 64) => { const c = new THREE.Mesh(new THREE.CylinderGeometry(r, r, d, seg), m); c.rotation.x = Math.PI / 2; c.position.z = z; door.add(c); return c; };
  cyl(42, 4, 2, steelD); cyl(38, 6, 5, steel); cyl(30, 3, 9, steelD); cyl(12, 4, 11, steel);
  const rings = [36, 26, 18];
  rings.forEach((r) => { const t = new THREE.Mesh(new THREE.TorusGeometry(r, 0.9, 6, 72), steelD); t.position.z = 8.6; door.add(t); });
  const bolts = new THREE.Group(); bolts.position.z = 8; door.add(bolts);
  for (let i = 0; i < 12; i++) { const a = (i / 12) * Math.PI * 2; const b = new THREE.Mesh(new THREE.BoxGeometry(6, 3.2, 4), steel); b.position.set(Math.cos(a) * 33, Math.sin(a) * 33, 1); b.rotation.z = a; bolts.add(b); }
  const wheel = new THREE.Group(); wheel.position.z = 14; door.add(wheel);
  const wt = new THREE.Mesh(new THREE.TorusGeometry(9, 1.2, 8, 40), steel); wheel.add(wt);
  for (let i = 0; i < 4; i++) { const s = new THREE.Mesh(new THREE.BoxGeometry(1.4, 18, 1.4), steel); s.rotation.z = (i / 4) * Math.PI; wheel.add(s); }
  const lightRing = new THREE.Mesh(new THREE.TorusGeometry(44, 0.9, 6, 96), inkMaterial({ base: pal.signal, emissive: true })); lightRing.position.copy(C).add(V(0, 0, 1)); g.add(lightRing);
  // laser screen across the hall, hazard bands on the floor
  const laser = inkMaterial({ base: pal.signal, emissive: true });
  for (const y of [8, 20, 32, 44]) box(g, 200, 0.6, 0.6, 0, y0 + y, -66, laser);
  for (const x of [-100, 100]) box(g, 3, 52, 3, x, y0, -66, laser);
  const haz = labelPlane(200, 14, (c, W, H) => { c.fillStyle = pal.hazard; c.fillRect(0, 0, W, H); c.fillStyle = '#0a0607'; for (let x = -H; x < W + H; x += H * 1.4) { c.beginPath(); c.moveTo(x, 0); c.lineTo(x + H * 0.7, 0); c.lineTo(x - H * 0.3, H); c.lineTo(x - H, H); c.fill(); } }, { res: 1024, bloom: false });
  haz.rotation.x = -Math.PI / 2; haz.position.set(0, y0 + 0.1, -62); g.add(haz);
  const sign = neonSign('金庫', 'Vault', pal, 56, 26); sign.position.set(-78, y0 + 72, -103.6); g.add(sign);
  const update = (t) => { const st = Math.floor(t * 12) / 12; wheel.rotation.z = Math.sin(st * 0.7) * 0.5; bolts.rotation.z = Math.floor(st * 0.5) * (Math.PI / 24); };
  return { group: g, update, center: C, laserMat: laser };
}

// ---------------------------------------------------------------- gallery: three walls of screens
export const SCREENS = [
  { p: V(-96, 0, 0), ry: Math.PI / 2 },   // west wall, faces east
  { p: V(0, 0, -96), ry: 0 },             // north wall
  { p: V(96, 0, 0), ry: -Math.PI / 2 },   // east wall, faces west
];
export function buildGallery(pal, featured, holder) {
  const g = new THREE.Group(); const y0 = FLOORS.work, yc = y0 + 46;
  const screens = [];
  const frame = inkMaterial({ base: pal.concreteDark, brush: 0.15, spec: 0.4, rim: 1 });
  const edge = inkMaterial({ base: pal.signal, emissive: true });
  featured.forEach((p, i) => {
    const S = SCREENS[i], grp = new THREE.Group(); grp.position.set(S.p.x, yc, S.p.z); grp.rotation.y = S.ry; g.add(grp);
    box(grp, 132, 80, 4, 0, -40, -2.5, frame);
    for (const [w, h, x, y] of [[132, 1.2, 0, 40], [132, 1.2, 0, -41]]) box(grp, w, h, 1.2, x, y, -0.2, edge);
    const scr = labelPlane(124, 70, (c, W, H) => {
      c.fillStyle = '#060405'; c.fillRect(0, 0, W, H);
      const img = holder.imgs?.[i];
      if (img) { const sc = Math.max(W / img.width, (H * 0.8) / img.height); c.drawImage(img, (W - img.width * sc) / 2, 0, img.width * sc, img.height * sc); }
      c.fillStyle = 'rgba(8,4,5,0.86)'; c.fillRect(0, H * 0.75, W, H * 0.25);
      c.fillStyle = pal.signal; c.fillRect(0, H * 0.75, W * 0.32, H * 0.014);
      c.fillStyle = '#ffffff'; c.font = `400 ${Math.round(H * 0.15)}px ${dispFont}`; c.textBaseline = 'alphabetic'; c.fillText(p.name.toUpperCase(), W * 0.035, H * 0.95);
      c.fillStyle = pal.signal; c.font = `600 ${Math.round(H * 0.04)}px ${monoFont}`; c.fillText((p.kicker + '  ·  ' + p.tags.slice(0, 3).join(' · ')).toUpperCase(), W * 0.037, H * 0.81);
      c.fillStyle = 'rgba(0,0,0,0.16)'; for (let y = 0; y < H; y += 4) c.fillRect(0, y, W, 1.4);
    }, { emissive: true, res: 1024 });
    scr.position.z = 0.2; scr.userData.exhibit = i; grp.add(scr); screens.push(scr);
  });
  return { group: g, screens, look: (i) => SCREENS[i].p.clone().setY(yc) };
}

// ---------------------------------------------------------------- lobby: street level, doors open to the rain
export function buildLobby(pal) {
  const g = new THREE.Group();
  const stone = inkMaterial({ base: pal.concreteDark, brush: 0.15, spec: 0.5, rim: 1 });
  const desk = new THREE.Group(); desk.position.set(0, 0, -72); g.add(desk);
  box(desk, 90, 11, 12, 0, 0, 0, stone);
  box(desk, 92, 1, 13, 0, 11, 0, inkMaterial({ base: pal.steel, spec: 1, rim: 1 }));
  box(desk, 86, 1.2, 0.6, 0, 3, 6.4, inkMaterial({ base: pal.signal, emissive: true }));
  // big letters on the back wall
  const name = labelPlane(150, 44, (c, W, H) => {
    c.clearRect(0, 0, W, H); c.fillStyle = '#0a0607'; c.fillRect(0, 0, W, H);
    c.fillStyle = pal.lamp; c.font = `400 ${H * 0.86}px ${dispFont}`; c.textAlign = 'center'; c.textBaseline = 'middle'; c.fillText('XINI', W / 2, H * 0.55);
  }, { emissive: true, res: 1024 });
  name.position.set(0, 50, -112.4); g.add(name);
  for (const x of [-40, 40]) box(g, 6, 90, 6, x, 0, -40, stone);
  return { group: g };
}
