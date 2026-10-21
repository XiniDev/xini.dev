import * as THREE from 'three';
import { paintMaterial, crystalMaterial, paintShared } from '../../shared/gfx/paint-material.js';
import { inkMaterial, glowId } from '../../shared/gfx/ink-material.js';
import { ringGeometry, runeStrip, crystalGeometry, finialGeometry, plateGeometry, GLYPH_NAMES } from '../core/parts.js';
import { lightMaterial, labelPlane } from '../machine/board.js';
import { markBadge } from '../machine/tower.js';

// The armillary: brass bands engraved with runes, a crystal heart, a spindle with Deco finials.
// It hangs over the city at dusk and turns on twos. Around it: the gear house that drives it,
// the seal on the horizon ring, the orrery of project plates, and the gate on a sky platform.
export const V = (x, y, z) => new THREE.Vector3(x, y, z);
export const C = V(0, 540, 0);
const seqOf = (k) => Array.from({ length: 16 }, (_, i) => GLYPH_NAMES[(i * (k + 3) + k * 5) % GLYPH_NAMES.length]);

export function buildArmillary(pal) {
  const g = new THREE.Group(); g.position.copy(C);
  const rings = [];
  const energyLine = inkMaterial({ base: pal.energy, emissive: true });
  const spec = [
    { R: 360, h: 30, t: 9, tilt: [0, 0, Math.PI / 2], spin: 0.05, rep: 7 },
    { R: 312, h: 26, t: 8, tilt: [0.41, 0, 0], spin: -0.07, rep: 6 },
    { R: 264, h: 24, t: 7, tilt: [0, 0, 0], spin: 0.09, rep: 5 },
    { R: 206, h: 20, t: 6, tilt: [0, 0, 1.05], spin: -0.12, rep: 4 },
    { R: 152, h: 16, t: 5, tilt: [-0.7, 0, 0], spin: 0.16, rep: 3 },
  ];
  spec.forEach((s, k) => {
    const holder = new THREE.Group(); holder.rotation.set(...s.tilt); g.add(holder);
    const mat = paintMaterial({ base: pal.brass, face: true, tangent: true, inlay: true, inlayCol: pal.patina, runes: runeStrip(seqOf(k)), runeRepeat: s.rep, charge: 1, energy: 1, strokeScale: 0.05, stroke: 0.22, hatch: 0.5, spec: 0.9, bevel: 1, wear: 0.6 });
    const ring = new THREE.Mesh(ringGeometry(s.R, s.h, s.t, { chamfer: Math.min(s.t, s.h) * 0.18, segs: 320 }), mat);
    holder.add(ring);
    // a channel of energy along the inner edge reads from across the bay
    const line = new THREE.Mesh(new THREE.TorusGeometry(s.R - s.t / 2 - 0.6, 1.1, 6, 260), energyLine);
    line.rotation.x = Math.PI / 2; ring.add(line);
    rings.push({ holder, ring, mat, spin: s.spin, R: s.R, line });
  });
  // the fixed horizon ring on four legs, and the spindle with its finials
  const brass = paintMaterial({ base: pal.brass, strokeScale: 0.05, stroke: 0.22, hatch: 0.45, spec: 0.9 });
  const brassDark = paintMaterial({ base: pal.brassDark, strokeScale: 0.05, stroke: 0.22, hatch: 0.5, spec: 0.7 });
  const horizon = new THREE.Mesh(ringGeometry(410, 22, 14, { chamfer: 3, segs: 320 }), paintMaterial({ base: pal.brassDark, face: true, tangent: true, inlay: true, inlayCol: pal.patina, strokeScale: 0.05, hatch: 0.5, spec: 0.7 }));
  g.add(horizon);
  const rod = new THREE.Mesh(new THREE.CylinderGeometry(4.5, 4.5, 900, 16), brass); g.add(rod);
  for (const s of [-1, 1]) { const f = new THREE.Mesh(finialGeometry(120), brass); f.position.y = s * 450; if (s < 0) f.rotation.x = Math.PI; g.add(f); }
  // the crystal heart
  const crystal = new THREE.Mesh(crystalGeometry(5, { h: 1.5, r: 0.32, sides: 7 }), crystalMaterial({ deep: pal.crystalDeep, mid: pal.crystalMid, bright: pal.crystalMid2 ?? pal.crystalBright, hot: pal.crystalBright }));
  crystal.scale.setScalar(118); g.add(crystal);
  const cradle = new THREE.Mesh(new THREE.TorusGeometry(46, 3.2, 10, 64), brass); cradle.rotation.x = Math.PI / 2; g.add(cradle);
  const glowMat = inkMaterial({ base: pal.energy, emissive: true });
  // the core lights the bands from inside: a soft halo that only adds light
  const halo = new THREE.Mesh(new THREE.SphereGeometry(150, 32, 16), lightMaterial({
    color: pal.energy,
    vertex: /* glsl */ `in vec3 position; in vec3 normal; uniform mat4 modelMatrix, viewMatrix, projectionMatrix; uniform vec3 cameraPosition; out float vF;
      void main(){ vec4 w = modelMatrix * vec4(position, 1.0); vec3 n = normalize(mat3(modelMatrix) * normal); vF = abs(dot(n, normalize(cameraPosition - w.xyz))); gl_Position = projectionMatrix * viewMatrix * w; }`,
    fragment: /* glsl */ `precision highp float; uniform vec3 uColor; uniform float uAmt; in float vF; layout(location = 0) out highp vec4 gColor; layout(location = 1) out highp vec4 gNormal;
      void main(){ gColor = vec4(uColor, pow(vF, 3.0) * 0.16 * uAmt); gNormal = vec4(0.0); }`,
    uniforms: { uAmt: { value: 1 } },
  }));
  g.add(halo);
  const update = (t, charge = 1) => {
    const st = Math.floor(t * 12) / 12;
    rings.forEach((r) => { r.ring.rotation.y = st * r.spin; r.mat.uniforms.uCharge.value = charge; r.mat.uniforms.uChargeHead.value = charge; });
    crystal.rotation.y = st * 0.2;
    crystal.material.uniforms.uPulse.value = 0.4 + 0.3 * Math.sin(st * 2.2);
  };
  return { group: g, rings, crystal, update, halo, brass, brassDark, glowMat, energyLine };
}

/** the gear house under the armillary: three brass gears that drive the rings */
function gearGeometry(r, teeth, depth, hole = 0.25) {
  const sh = new THREE.Shape();
  for (let i = 0; i < teeth * 2; i++) {
    const a0 = (i / (teeth * 2)) * Math.PI * 2, a1 = ((i + 1) / (teeth * 2)) * Math.PI * 2;
    const rr = i % 2 ? r : r * 1.12;
    const p0 = [Math.cos(a0) * rr, Math.sin(a0) * rr], p1 = [Math.cos(a1) * rr, Math.sin(a1) * rr];
    if (i === 0) sh.moveTo(...p0); else sh.lineTo(...p0);
    sh.lineTo(...p1);
  }
  const hp = new THREE.Path(); hp.absarc(0, 0, r * hole, 0, Math.PI * 2, true); sh.holes.push(hp);
  // spokes as cut-outs
  for (let k = 0; k < 5; k++) {
    const a = (k / 5) * Math.PI * 2 + 0.3, h = new THREE.Path(), r0 = r * 0.36, r1 = r * 0.78, w = 0.42;
    h.moveTo(Math.cos(a - w) * r0, Math.sin(a - w) * r0); h.lineTo(Math.cos(a + w) * r0, Math.sin(a + w) * r0);
    h.lineTo(Math.cos(a + w * 0.7) * r1, Math.sin(a + w * 0.7) * r1); h.lineTo(Math.cos(a - w * 0.7) * r1, Math.sin(a - w * 0.7) * r1);
    sh.holes.push(h);
  }
  const g = new THREE.ExtrudeGeometry(sh, { depth, bevelEnabled: true, bevelThickness: depth * 0.12, bevelSize: depth * 0.12, bevelSegments: 1, curveSegments: 6 });
  g.translate(0, 0, -depth / 2);
  return g.toNonIndexed();
}
export const GEARS = V(0, 150, 0);
export function buildGears(pal, A) {
  const g = new THREE.Group(); g.position.copy(GEARS);
  const mat = paintMaterial({ base: pal.brass, strokeScale: 0.06, stroke: 0.2, hatch: 0.5, spec: 0.9 });
  const matD = paintMaterial({ base: pal.brassDark, strokeScale: 0.06, stroke: 0.2, hatch: 0.55, spec: 0.7 });
  const gears = [
    { r: 62, n: 18, x: 0, y: 0, z: 0, s: 1 },
    { r: 38, n: 11, x: 96, y: -28, z: 2, s: -18 / 11 },
    { r: 30, n: 9, x: -86, y: 26, z: -2, s: -18 / 9 },
    { r: 22, n: 7, x: 130, y: 34, z: -4, s: (18 / 11) * (11 / 7) },
  ].map((o, i) => {
    const m = new THREE.Mesh(gearGeometry(o.r, o.n, 10), i % 2 ? matD : mat); m.position.set(o.x, o.y, o.z); g.add(m);
    const hub = new THREE.Mesh(new THREE.CylinderGeometry(o.r * 0.22, o.r * 0.22, 16, 20), matD); hub.rotation.x = Math.PI / 2; hub.position.copy(m.position); g.add(hub);
    return { m, s: o.s };
  });
  // the cage: two rings and struts, and the spindle running up into the armillary
  const cage = paintMaterial({ base: pal.brassDark, strokeScale: 0.06, hatch: 0.5, spec: 0.7 });
  for (const z of [-16, 16]) { const r = new THREE.Mesh(new THREE.TorusGeometry(150, 2.6, 8, 96), cage); r.position.z = z; g.add(r); }
  for (let k = 0; k < 8; k++) { const a = (k / 8) * Math.PI * 2; const s = new THREE.Mesh(new THREE.BoxGeometry(3, 3, 36), cage); s.position.set(Math.cos(a) * 150, Math.sin(a) * 150, 0); g.add(s); }
  const lamp = inkMaterial({ base: pal.energy, emissive: true });
  for (let k = 0; k < 12; k++) { const a = (k / 12) * Math.PI * 2; const s = new THREE.Mesh(new THREE.SphereGeometry(2.6, 8, 6), lamp); s.position.set(Math.cos(a) * 150, Math.sin(a) * 150, 18); g.add(s); }
  const update = (t) => { const st = Math.floor(t * 12) / 12; gears.forEach((o) => { o.m.rotation.z = st * 0.35 * o.s; }); };
  return { group: g, update };
}

/** the seal: a disc of three rune dials on the horizon ring, facing south */
export const SEAL = V(0, C.y, 410 + 16);
export function buildSeal(pal) {
  const g = new THREE.Group(); g.position.copy(SEAL);
  const plate = paintMaterial({ base: pal.brassDark, strokeScale: 0.05, hatch: 0.55, spec: 0.7 });
  const disc = new THREE.Mesh(new THREE.CylinderGeometry(92, 92, 10, 72), plate); disc.rotation.x = Math.PI / 2; g.add(disc);
  const dials = [];
  [[84, 14, 0.18, 0], [62, 14, -0.27, 3], [40, 14, 0.4, 6]].forEach(([R, h, spin, k]) => {
    const mat = paintMaterial({ base: pal.brass, face: true, tangent: true, runes: runeStrip(seqOf(k + 2), { slots: 12 }), runeRepeat: 1, charge: 1, energy: 1, strokeScale: 0.06, hatch: 0.45, spec: 0.9 });
    const ring = new THREE.Mesh(ringGeometry(R - 7, 9, 14, { chamfer: 2, segs: 200 }), mat);
    ring.rotation.x = Math.PI / 2; ring.position.z = 7; g.add(ring); dials.push({ ring, spin, mat });
  });
  const core = markBadge(40, inkMaterial({ base: pal.energy, emissive: true }), inkMaterial({ base: pal.hot, emissive: true }), 3);
  core.position.z = 10; g.add(core);
  for (let i = 0; i < 8; i++) { const a = (i / 8) * Math.PI * 2; const b = new THREE.Mesh(new THREE.BoxGeometry(10, 24, 10), plate); b.position.set(Math.cos(a) * 96, Math.sin(a) * 96, 2); b.rotation.z = a + Math.PI / 2; g.add(b); }
  const update = (t) => { const st = Math.floor(t * 12) / 12; dials.forEach((d) => { d.ring.rotation.y = Math.round(st * d.spin * 6) / 6; }); };
  return { group: g, update };
}

/** the orrery: project plates on arms, turning round the core inside the bands */
export const ORRERY_R = 232;
export function buildOrrery(pal, featured, holder) {
  const g = new THREE.Group(); g.position.copy(C);
  const arms = new THREE.Group(); g.add(arms);
  const frameMat = paintMaterial({ base: pal.brass, strokeScale: 0.08, hatch: 0.45, spec: 0.9 });
  const armMat = paintMaterial({ base: pal.brassDark, strokeScale: 0.08, hatch: 0.5, spec: 0.7 });
  const { frame, window: win, iw, ih } = plateGeometry(1.25, 0.86, 0.06, 0.07);
  const S = 100;
  const plates = featured.map((p, i) => {
    const a = (i / featured.length) * Math.PI * 2;
    const arm = new THREE.Mesh(new THREE.BoxGeometry(4, 4, ORRERY_R - 40), armMat);
    const pivot = new THREE.Group(); pivot.rotation.y = a; arms.add(pivot);
    arm.position.z = (ORRERY_R - 40) / 2 + 20; pivot.add(arm);
    const plate = new THREE.Group(); plate.position.z = ORRERY_R; pivot.add(plate);
    const f = new THREE.Mesh(frame, frameMat); f.scale.setScalar(S); plate.add(f);
    const scr = labelPlane(iw * 2 * S, ih * 2 * S, (c, W, H) => {
      c.fillStyle = '#0a0d14'; c.fillRect(0, 0, W, H);
      const img = holder.imgs?.[i];
      if (img) { const sc = Math.max(W / img.width, (H * 0.8) / img.height); c.drawImage(img, (W - img.width * sc) / 2, 0, img.width * sc, img.height * sc); }
      c.fillStyle = 'rgba(10,12,20,0.86)'; c.fillRect(0, H * 0.76, W, H * 0.24);
      c.fillStyle = pal.brass; c.fillRect(W * 0.04, H * 0.76, W * 0.92, H * 0.01);
      c.fillStyle = '#f2e9d8'; c.font = `400 ${Math.round(H * 0.13)}px "Gloock", serif`; c.textBaseline = 'alphabetic'; c.fillText(p.name, W * 0.04, H * 0.93);
      c.fillStyle = pal.energy; c.font = `600 ${Math.round(H * 0.035)}px "JetBrains Mono Variable", monospace`; c.fillText((p.kicker + '  ·  ' + p.tags.slice(0, 3).join(' · ')).toUpperCase(), W * 0.045, H * 0.815);
    }, { emissive: true, res: 1024 });
    scr.position.z = 0.4; scr.userData.exhibit = i; plate.add(scr);
    return { pivot, plate, scr, a };
  });
  let target = 0, cur = 0, lit = 0, litT = 0;
  // rest: plates parked off the camera's line to the core; show(i): plate i swings to the front
  const show = (i) => { target = i < 0 ? Math.PI / featured.length : -((i / featured.length) * Math.PI * 2); litT = i < 0 ? 0 : 1; };
  show(-1); cur = target;
  const update = (dt) => {
    cur += (target - cur) * (1 - Math.exp(-dt * 3.2)); arms.rotation.y = cur;
    lit += (litT - lit) * (1 - Math.exp(-dt * 4));
    plates.forEach((p) => p.scr.material.uniforms.uBase.value.setScalar(0.22 + 0.78 * lit));
  };
  const showLit = (on) => { litT = on ? 1 : 0; };
  return { group: g, plates, screens: plates.map((p) => p.scr), show, update, showLit };
}

/** the gate: an Art Deco arch on a sky platform, the sigil at its keystone */
export const GATE = V(-560, 300, 520);
export function buildGate(pal) {
  const g = new THREE.Group(); g.position.copy(GATE); g.lookAt(V(C.x, GATE.y, C.z));
  const stone = paintMaterial({ base: pal.stone, strokeScale: 0.05, stroke: 0.12, hatch: 0.45, spec: 0.3 });
  const brass = paintMaterial({ base: pal.brass, strokeScale: 0.06, hatch: 0.45, spec: 0.9 });
  // platform with a stepped underside
  const plat = new THREE.Mesh(new THREE.CylinderGeometry(120, 90, 18, 8), stone); plat.position.y = -9; g.add(plat);
  const under = new THREE.Mesh(new THREE.ConeGeometry(88, 120, 8), stone); under.position.y = -78; under.rotation.x = Math.PI; g.add(under);
  const trim = new THREE.Mesh(new THREE.TorusGeometry(118, 2.4, 6, 8), brass); trim.rotation.x = Math.PI / 2; trim.rotation.z = Math.PI / 8; g.add(trim);
  // the floor carries a Deco inlay: nested octagons and rays in brass on dark stone
  const inlay = labelPlane(232, 232, (c, W, H) => {
    c.fillStyle = pal.stoneDark ?? '#2a2a34'; c.fillRect(0, 0, W, H);
    c.strokeStyle = pal.brass; c.lineWidth = W * 0.006; c.translate(W / 2, H / 2);
    const oct = (r) => { c.beginPath(); for (let i = 0; i <= 8; i++) { const a = (i / 8) * Math.PI * 2 + Math.PI / 8; const x = Math.cos(a) * r, y = Math.sin(a) * r; i ? c.lineTo(x, y) : c.moveTo(x, y); } c.stroke(); };
    [0.48, 0.42, 0.3, 0.16].forEach((k) => oct(W * k));
    for (let i = 0; i < 16; i++) { const a = (i / 16) * Math.PI * 2; c.beginPath(); c.moveTo(Math.cos(a) * W * 0.16, Math.sin(a) * W * 0.16); c.lineTo(Math.cos(a) * W * 0.3, Math.sin(a) * W * 0.3); c.stroke(); }
    c.fillStyle = pal.brass; for (let i = 0; i < 8; i++) { const a = (i / 8) * Math.PI * 2 + Math.PI / 8; c.save(); c.translate(Math.cos(a) * W * 0.36, Math.sin(a) * W * 0.36); c.rotate(a + Math.PI / 4); c.fillRect(-W * 0.012, -W * 0.012, W * 0.024, W * 0.024); c.restore(); }
  }, { res: 1024, bloom: false });
  inlay.rotation.x = -Math.PI / 2; inlay.position.y = 0.3; g.add(inlay);
  // two stepped pylons and a pointed arch
  for (const s of [-1, 1]) {
    for (const [w, h, y] of [[30, 120, 0], [24, 30, 120], [16, 26, 150]]) { const b = new THREE.Mesh(new THREE.BoxGeometry(w, h, 30), stone); b.position.set(s * 62, y + h / 2, 0); g.add(b); }
    const f = new THREE.Mesh(finialGeometry(60), brass); f.position.set(s * 62, 176, 0); g.add(f);
  }
  const arch = new THREE.Shape();
  arch.moveTo(-74, 120); arch.lineTo(-74, 150); arch.quadraticCurveTo(-60, 210, 0, 236); arch.quadraticCurveTo(60, 210, 74, 150); arch.lineTo(74, 120);
  arch.lineTo(50, 120); arch.lineTo(50, 146); arch.quadraticCurveTo(40, 192, 0, 210); arch.quadraticCurveTo(-40, 192, -50, 146); arch.lineTo(-50, 120); arch.lineTo(-74, 120);
  const archM = new THREE.Mesh(new THREE.ExtrudeGeometry(arch, { depth: 26, bevelEnabled: true, bevelThickness: 2, bevelSize: 2, bevelSegments: 1 }), stone); archM.position.z = -13; g.add(archM);
  // brass edging traces the arch on the face toward the camera, with a keystone
  const edgePts = [V(-76, 120, 15), V(-76, 150, 15), V(-62, 206, 15), V(0, 238, 15), V(62, 206, 15), V(76, 150, 15), V(76, 120, 15)];
  g.add(new THREE.Mesh(new THREE.TubeGeometry(new THREE.CatmullRomCurve3(edgePts, false, 'centripetal'), 80, 2.2, 8, false), brass));
  const inner = [V(-52, 120, 15), V(-52, 146, 15), V(-40, 194, 15), V(0, 212, 15), V(40, 194, 15), V(52, 146, 15), V(52, 120, 15)];
  g.add(new THREE.Mesh(new THREE.TubeGeometry(new THREE.CatmullRomCurve3(inner, false, 'centripetal'), 80, 1.6, 8, false), brass));
  for (const s of [-1, 1]) for (let k = 0; k < 4; k++) { const f = new THREE.Mesh(new THREE.BoxGeometry(2.4, 100, 2), brass); f.position.set(s * (54 + k * 5.5), 60, 15.5); g.add(f); }
  const sig = markBadge(34, inkMaterial({ base: pal.energy, emissive: true }), inkMaterial({ base: pal.hot, emissive: true }), 3);
  sig.position.set(0, 198, 15); g.add(sig);
  // light in the doorway
  const door = new THREE.Mesh(new THREE.PlaneGeometry(96, 140), lightMaterial({
    color: pal.energy,
    vertex: /* glsl */ `in vec3 position; in vec2 uv; uniform mat4 modelMatrix, viewMatrix, projectionMatrix; out vec2 vUv; void main(){ vUv = uv; gl_Position = projectionMatrix * viewMatrix * modelMatrix * vec4(position, 1.0); }`,
    fragment: /* glsl */ `precision highp float; uniform vec3 uColor; uniform float uStep; in vec2 vUv; layout(location = 0) out highp vec4 gColor; layout(location = 1) out highp vec4 gNormal;
      void main(){ float e = smoothstep(0.5, 0.0, abs(vUv.x - 0.5)) * smoothstep(1.0, 0.2, vUv.y); float l = 0.7 + 0.3 * step(0.5, fract(vUv.y * 9.0 - uStep)); gColor = vec4(uColor, e * 0.22 * l); gNormal = vec4(0.0); }`,
    uniforms: { uStep: paintShared.uStep },
  }));
  door.position.set(0, 70, 0); g.add(door);
  return { group: g };
}
