import * as THREE from 'three';
import { RoundedBoxGeometry } from 'three/examples/jsm/geometries/RoundedBoxGeometry.js';
import { mergeGeometries } from 'three/examples/jsm/utils/BufferGeometryUtils.js';
import { inkMaterial as baseInk, shared } from './shared/gfx/ink-material.js';
import { COLOR } from './shared/gfx/glsl.js';
import { FOLD_FRONT, FOLD_BACK } from './shared/ui/marks.js';
import { V, canvasTex, labelPlane, lightMaterial } from './board.js';
const inkMaterial = (o) => baseInk({ brushScale: 0.07, dotCell: 4.5, ...o });

// The core: a pick-and-place gantry beside the socket builds a small system board, one part at a time.
// Six chips wait in the feeder (UI, 3D, API, NET, DB, OPS). When the visitor arrives the head travels,
// drops, picks, travels, drops and places each one; a placed chip lights its LED. With the sixth in, the
// board's traces draw on and data starts to run: a whole system, built by one operator. Then the head
// inspects the work. All motion is stepped on twos, like a stop-motion machine.
const MONO = '"JetBrains Mono Variable", ui-monospace, monospace';
const DISP = '"Chakra Petch", sans-serif';
const JP = '"Zen Kaku Gothic New", sans-serif';
const minJerk = (x) => { x = Math.min(1, Math.max(0, x)); return x * x * x * (10 + x * (-15 + 6 * x)); };
const seg = (t, a, b) => Math.min(1, Math.max(0, (t - a) / (b - a)));
const step12 = (t) => Math.floor(t * 12) / 12;

// rails run north-south, open at the south end where the camera looks in; the bridge rides them along z,
// the carriage runs along the bridge in x
export const GANTRY = { xW: -305, xE: -95, zN: 160, zS: 330, H: 122, feedZ: 190, keep: [-322, 124, -62, 346] };
const LABELS = ['UI', '3D', 'AI', 'NET', 'DB', 'OPS'];
const MOD = { x: -200, z: 262, w: 158, d: 96 };
const CHIP = 26, CHIP_H = 6, DECK_Y = 9, TRAY_Y = 8;

/** static parts are merged per material: one draw for each */
function collector() {
  const byMat = new Map(), M = new THREE.Matrix4(), E = new THREE.Euler();
  return {
    add(geo, mat, x, y, z, rx = 0, ry = 0, rz = 0) {
      const g = geo.index ? geo.toNonIndexed() : geo.clone();
      for (const k of Object.keys(g.attributes)) if (!['position', 'normal', 'uv'].includes(k)) g.deleteAttribute(k);
      g.clearGroups();
      g.applyMatrix4(M.makeRotationFromEuler(E.set(rx, ry, rz)).setPosition(x, y, z));
      if (!byMat.has(mat)) byMat.set(mat, []);
      byMat.get(mat).push(g);
    },
    build(parent) { byMat.forEach((list, mat) => parent.add(new THREE.Mesh(mergeGeometries(list), mat))); },
  };
}
const rb = (w, h, d, r = 2, s = 2) => new RoundedBoxGeometry(w, h, d, s, Math.min(r, w / 2 - 0.01, h / 2 - 0.01, d / 2 - 0.01));
const cyl = (r, h, n = 24, r2 = r) => new THREE.CylinderGeometry(r2, r, h, n);

/** the mark as canvas paths in a box of size s at (x, y) */
function drawMark(c, x, y, s) {
  const k = s / 104;
  for (const d of [FOLD_BACK, FOLD_FRONT]) {
    for (const sub of d.split('M').filter((q) => q.trim())) {
      const pts = sub.replace(/Z/g, '').trim().split(/\s*L\s*/).map((p) => p.split(',').map(Number));
      c.beginPath(); pts.forEach(([px, py], i) => (i ? c.lineTo : c.moveTo).call(c, x + (px - 8) * k, y + (py - 8) * k)); c.closePath(); c.fill();
    }
  }
}

export function buildGantry(pal, parts, silk) {
  const G = GANTRY, { xW, xE, zN, zS, H } = G;
  const g = new THREE.Group();
  const brass = inkMaterial({ base: pal.brassDark, brush: 0.12, spec: 0.5, rim: 0.6 });
  const brassDark = inkMaterial({ base: '#56411f', brush: 0.12, spec: 0.45, rim: 0.6 });
  // the frame is dark steel: in brass, the bridge was the most saturated thing at the stop and outweighed the board
  // it builds. Brass is kept for the part that moves (the carriage) and a thin lit edge on the bridge
  const beam = inkMaterial({ base: '#2e3a38', brush: 0.12, spec: 0.45, rim: 0.4 });
  const brassLit = inkMaterial({ base: pal.brass, brush: 0.1, spec: 0.8, rim: 0.7 });
  // (low rims: the case light's rim is brass, and on every post and rail it turned the whole frame brass)
  const steel = inkMaterial({ base: pal.steel, brush: 0.12, spec: 0.6, rim: 0.3 });
  const dark = inkMaterial({ base: pal.anod, brush: 0.12, spec: 0.7, rim: 0.4 });
  const dark2 = inkMaterial({ base: pal.anod2, brush: 0.12, spec: 0.8, rim: 0.4 });
  const feet = inkMaterial({ base: pal.shieldDark, brush: 0.14, spec: 0.6, rim: 1 });
  const hazard = inkMaterial({ base: pal.brassDark, brush: 0.1, spec: 0.6, rim: 1 });
  const S = collector();
  // ---- frame: two rails on four posts, a beam across the north end, collars
  const L = zS - zN + 28, xc = (xW + xE) / 2, zc = (zN + zS) / 2;
  for (const x of [xW, xE]) {
    S.add(rb(16, 14, L, 3), steel, x, H - 7, zc);
    S.add(rb(2.4, 2, L - 12, 0.8), brass, x + (x === xW ? 5 : -5), H + 1, zc);   // a thin running edge in brass
    for (const z of [zN, zS]) {
      S.add(rb(14, H - 14, 14, 2.5), dark, x, (H - 14) / 2, z);
      S.add(rb(30, 6, 30, 2), feet, x, 3, z);
      S.add(rb(20, 10, 20, 2.5), dark2, x, H - 19, z);
      for (const k of [0, 1, 2, 3]) S.add(cyl(1.8, 2, 8), steel, x + (k % 2 ? 10 : -10), 6.5, z + (k > 1 ? 10 : -10));
    }
  }
  S.add(rb(xE - xW - 14, 10, 10, 2), dark, xc, H - 30, zN);
  S.add(rb(xE - xW - 30, 3, 11, 1), hazard, xc, H - 23.5, zN);           // painted warning strip on the end beam
  // cable tray on the east rail for the drag chain
  const chainX = xE + 21;
  S.add(rb(14, 3, L - 20, 1), dark2, chainX, H - 15, zc);
  S.add(rb(2, 8, L - 20, 0.6), dark2, chainX + 7, H - 10, zc);
  // ---- feeder: a tray of six pockets along the north side, three tape reels behind it
  const pocketX = LABELS.map((_, k) => -275 + k * 30);
  S.add(rb(196, TRAY_Y, 40, 3), dark, -200, TRAY_Y / 2, G.feedZ);
  S.add(rb(202, 2, 46, 1), brassDark, -200, 1, G.feedZ);
  const tray = labelPlane(192, 36, (c, W, Hh) => {
    c.fillStyle = '#0f1513'; c.fillRect(0, 0, W, Hh);
    const k = W / 192;
    pocketX.forEach((x, i) => {
      const X = (x + 296) * k;
      c.fillStyle = '#050807'; c.fillRect(X - 14.5 * k, 3 * k, 29 * k, 29 * k);
      c.strokeStyle = 'rgba(230,223,202,0.5)'; c.lineWidth = 0.5 * k; c.strokeRect(X - 14.5 * k, 3 * k, 29 * k, 29 * k);
      c.fillStyle = 'rgba(230,223,202,0.8)'; c.font = `700 ${2.6 * k}px ${MONO}`; c.textAlign = 'center'; c.fillText(String(i + 1).padStart(2, '0'), X, 35 * k);
    });
  }, { res: 1024, bloom: false });
  tray.rotation.x = -Math.PI / 2; tray.position.set(-200, TRAY_Y + 0.08, G.feedZ); g.add(tray);
  const reelMat = inkMaterial({ base: pal.sheen, brush: 0.1, spec: 1, rim: 1 });
  const tape = inkMaterial({ base: '#0b0f0e', brush: 0.1, spec: 0.5, rim: 0.6 });
  const reelZ = 146, RR = 19, RY = 24;
  for (const x of [-255, -200, -145]) {
    // reels stand side on to the camera, like a rack of reels on a feeder
    for (const dx of [-3.6, 3.6]) S.add(cyl(RR, 1.2, 36).rotateZ(Math.PI / 2), reelMat, x + dx, RY, reelZ);
    S.add(cyl(RR - 5, 6, 36).rotateZ(Math.PI / 2), tape, x, RY, reelZ);
    S.add(cyl(4.5, 9, 14).rotateZ(Math.PI / 2), steel, x, RY, reelZ);
    S.add(rb(14, 6, 14, 2), dark, x, 3, reelZ);
    S.add(rb(3, RY - 4, 3, 1), dark2, x - 6, RY / 2 + 2, reelZ);
    S.add(rb(8, 0.8, G.feedZ - reelZ - 20, 0.3), tape, x, 6.5, (reelZ + G.feedZ - 20) / 2 + 2);   // tape into the feeder
  }
  // reel stickers: one small atlas, three planes merged into one mesh
  const reelTex = canvasTex(768, 256, (c) => {
    [['UI · 3D'], ['AI · NET'], ['DB · OPS']].forEach(([t], i) => {
      const X = i * 256;
      c.fillStyle = '#efe9d9'; c.fillRect(X, 0, 256, 256);
      c.fillStyle = '#121615'; c.font = `700 54px ${MONO}`; c.textAlign = 'center'; c.textBaseline = 'middle'; c.fillText(t, X + 128, 96);
      c.font = `600 34px ${MONO}`; c.fillText('XN · REEL', X + 128, 176);
      c.fillRect(X + 24, 214, 208, 6);
    });
  });
  const stickers = [-255, -200, -145].map((x, i) => {
    const pg = new THREE.PlaneGeometry(16, 8).toNonIndexed();
    const uv = pg.attributes.uv; for (let k = 0; k < uv.count; k++) uv.setX(k, (i + uv.getX(k)) / 3);
    pg.rotateY(Math.PI / 2); pg.translate(x + 4.4, RY + 7, reelZ); return pg;
  });
  g.add(new THREE.Mesh(mergeGeometries(stickers), inkMaterial({ base: '#ffffff', map: reelTex, mapAmt: 1, brush: 0.05, spec: 0.2, rim: 0 })));
  // ---- the system board being built: on standoffs, with six footprints and its own legend
  S.add(rb(MOD.w, 5, MOD.d, 1.5), inkMaterial({ base: pal.heroPcb, brush: 0.1, spec: 0.5, rim: 0.7 }), MOD.x, DECK_Y - 2.5, MOD.z);
  for (const sx of [-1, 1]) for (const sz of [-1, 1]) S.add(cyl(3.2, 4, 12), brass, MOD.x + sx * (MOD.w / 2 - 8), 2, MOD.z + sz * (MOD.d / 2 - 8));
  const target = (i) => [MOD.x - 50 + 50 * (i % 3), MOD.z - 22 + 44 * Math.floor(i / 3)];
  const DW = MOD.w - 3, DD = MOD.d - 3, dk = 1024 / DW;
  const deckP = (x, z) => [(x - MOD.x + DW / 2) * dk, (z - MOD.z + DD / 2) * dk];
  // traces: [from, to] chip pairs, routed as buses of three
  const buses = [[0, 1], [1, 2], [0, 3], [2, 5], [3, 4], [4, 5], [1, 4]];
  const busPath = ([a, b]) => {
    const [ax, az] = target(a), [bx, bz] = target(b), h = CHIP / 2;
    if (az === bz) return [[ax + h, az], [bx - h, bz]];
    return [[ax, az + h], [bx, bz - h]];
  };
  const deck = labelPlane(DW, DD, (c, W, Hh) => {
    c.fillStyle = pal.heroPcb; c.fillRect(0, 0, W, Hh);
    // copper under the mask, a shade lighter
    c.fillStyle = 'rgba(80,160,120,0.08)'; c.fillRect(6 * dk, 6 * dk, W - 12 * dk, Hh - 24 * dk);
    // dim gold traces, always there
    c.strokeStyle = 'rgba(215,174,96,0.46)'; c.lineWidth = 0.9 * dk; c.lineCap = 'round';
    buses.forEach((bus) => {
      const [[ax, az], [bx, bz]] = busPath(bus), hz = az === bz;
      for (const o of [-3, 0, 3]) { const [X0, Y0] = deckP(ax + (hz ? 0 : o), az + (hz ? o : 0)), [X1, Y1] = deckP(bx + (hz ? 0 : o), bz + (hz ? o : 0)); c.beginPath(); c.moveTo(X0, Y0); c.lineTo(X1, Y1); c.stroke(); }
    });
    // footprints, refs and pads
    LABELS.forEach((_, i) => {
      const [x, z] = target(i), [X, Y] = deckP(x, z), h = (CHIP / 2 + 2.4) * dk, Lb = 5 * dk;
      c.strokeStyle = 'rgba(236,230,212,0.85)'; c.lineWidth = 0.55 * dk;
      for (const [sx, sy] of [[-1, -1], [1, -1], [1, 1], [-1, 1]]) { c.beginPath(); c.moveTo(X + sx * h - sx * Lb, Y + sy * h); c.lineTo(X + sx * h, Y + sy * h); c.lineTo(X + sx * h, Y + sy * h - sy * Lb); c.stroke(); }
      c.fillStyle = 'rgba(236,230,212,0.9)'; c.beginPath(); c.arc(X - h - 1.6 * dk, Y - h - 1.6 * dk, 0.8 * dk, 0, Math.PI * 2); c.fill();
      c.fillStyle = 'rgba(215,174,96,0.85)';
      for (let k = 0; k < 7; k++) for (const sy of [-1, 1]) c.fillRect(X - 10 * dk + k * 3.3 * dk - 0.6 * dk, Y + sy * (CHIP / 2 + 0.6) * dk - 0.9 * dk, 1.2 * dk, 1.8 * dk);
      c.fillStyle = 'rgba(236,230,212,0.85)'; c.font = `700 ${2.6 * dk}px ${MONO}`; c.textAlign = 'left'; c.textBaseline = 'alphabetic';
      c.fillText(`U${i + 1}`, X + h - 4 * dk, Y - h - 1.2 * dk);
    });
    // gold fingers along the south edge, mounting holes, title and the mark
    c.fillStyle = 'rgba(215,174,96,0.95)';
    for (let k = 0; k < 30; k++) c.fillRect((14 + k * 4.3) * dk, Hh - 6 * dk, 2.6 * dk, 5.2 * dk);
    for (const [sx, sy] of [[8, 8], [DW - 8, 8], [8, DD - 8], [DW - 8, DD - 8]]) { c.beginPath(); c.arc(sx * dk, sy * dk, 3.4 * dk, 0, Math.PI * 2); c.arc(sx * dk, sy * dk, 2 * dk, 0, Math.PI * 2, true); c.fill(); }
    c.fillStyle = 'rgba(236,230,212,0.9)'; c.font = `700 ${4 * dk}px ${DISP}`; c.textAlign = 'left'; c.fillText('XN-SYS-01', 14 * dk, 7.6 * dk);
    c.font = `600 ${2.2 * dk}px ${MONO}`; c.fillText('ONE BOARD · SIX PARTS · REV A', 14 * dk, 11.2 * dk);
    drawMark(c, DW * dk - 20 * dk, 2.6 * dk, 9 * dk);
  }, { res: 1024, bloom: false });
  deck.rotation.x = -Math.PI / 2; deck.position.set(MOD.x, DECK_Y + 0.06, MOD.z); g.add(deck);
  // the same traces as light: they draw on when the board is complete, then data runs along them
  const traceTex = canvasTex(1024, Math.round(1024 * DD / DW), (c) => {
    c.fillStyle = '#000'; c.fillRect(0, 0, 1024, 1024);
    c.lineWidth = 1.1 * dk; c.lineCap = 'round';
    buses.forEach((bus, bi) => {
      const [[ax, az], [bx, bz]] = busPath(bus), hz = az === bz;
      for (const o of [-3, 0, 3]) {
        const [X0, Y0] = deckP(ax + (hz ? 0 : o), az + (hz ? o : 0)), [X1, Y1] = deckP(bx + (hz ? 0 : o), bz + (hz ? o : 0));
        const gr = c.createLinearGradient(X0, Y0, X1, Y1);
        gr.addColorStop(0, `rgb(255,0,${bi * 32})`); gr.addColorStop(1, `rgb(255,255,${bi * 32})`);
        c.strokeStyle = gr; c.beginPath(); c.moveTo(X0, Y0); c.lineTo(X1, Y1); c.stroke();
      }
    });
  });
  const traces = new THREE.Mesh(new THREE.PlaneGeometry(DW, DD).rotateX(-Math.PI / 2), lightMaterial({
    color: pal.signal,
    vertex: /* glsl */ `in vec3 position; in vec2 uv; uniform mat4 modelMatrix, viewMatrix, projectionMatrix; out vec2 vUv;
      void main(){ vUv = uv; gl_Position = projectionMatrix * viewMatrix * modelMatrix * vec4(position, 1.0); }`,
    fragment: /* glsl */ `precision highp float; uniform sampler2D uTex; uniform vec3 uColor, uHot; uniform float uAmt, uDraw, uStep; uniform float uBus[7]; in vec2 vUv;
      layout(location = 0) out highp vec4 gColor; layout(location = 1) out highp vec4 gNormal;
      void main(){
        vec4 t = texture(uTex, vUv);
        float cov = smoothstep(0.15, 0.6, t.r), along = t.g / max(t.r, 0.02);
        int bi = int(floor(t.b / max(t.r, 0.02) * 255.0 / 32.0 + 0.5));
        float lit = 0.0;
        for (int k = 0; k < 7; k++) if (k == bi) lit = uBus[k];
        float on = cov * max(step(along, uDraw), lit * 0.8);
        float pulse = step(0.82, fract(along * 2.5 - uStep * 1.4)) * step(0.999, uDraw);
        gColor = vec4(mix(uColor, uHot, pulse), on * uAmt * (0.6 + 0.4 * pulse)); gNormal = vec4(0.0);
      }`,
    uniforms: { uTex: { value: traceTex }, uHot: { value: new THREE.Color(pal.hot) }, uAmt: { value: 1 }, uDraw: { value: 0 }, uStep: { value: 0 }, uBus: { value: new Array(7).fill(0) } },
  }));
  traces.position.set(MOD.x, DECK_Y + 0.2, MOD.z); g.add(traces);
  // status LEDs, one beside each footprint, and the module's power LED
  const ledMat = inkMaterial({ base: '#ffffff', emissive: true, instanced: true, instanceColor: true });
  const leds = new THREE.InstancedMesh(new THREE.BoxGeometry(4.4, 1.6, 2.6), ledMat, 7);
  const M = new THREE.Matrix4(), Q = new THREE.Quaternion(), C = new THREE.Color();
  LABELS.forEach((_, i) => { const [x, z] = target(i); M.makeTranslation(x + CHIP / 2 + 4.5, DECK_Y + 0.8, z + CHIP / 2 - 1); leds.setMatrixAt(i, M); });
  M.makeTranslation(MOD.x + MOD.w / 2 - 12, DECK_Y + 0.8, MOD.z - MOD.d / 2 + 14); leds.setMatrixAt(6, M);
  const ledOff = new THREE.Color(pal.ledOff), ledOn = new THREE.Color(pal.signal), ledAmber = new THREE.Color(pal.brassDark);
  for (let i = 0; i < 7; i++) leds.setColorAt(i, ledOff);
  g.add(leds);
  // ---- the six chips: each one mesh that moves from the tray, onto the nozzle, onto the board
  const atlas = canvasTex(768, 512, (c) => {
    c.clearRect(0, 0, 768, 512);
    LABELS.forEach((t, i) => {
      const X = (i % 3) * 256, Y = Math.floor(i / 3) * 256;
      c.fillStyle = 'rgba(236,230,212,0.95)'; c.font = `700 ${t.length > 2 ? 78 : 96}px ${DISP}`; c.textAlign = 'center'; c.textBaseline = 'middle';
      c.fillText(t, X + 128, Y + 118);
      c.font = `600 22px ${MONO}`; c.fillStyle = 'rgba(236,230,212,0.7)'; c.fillText(`XN-${String(i + 1).padStart(2, '0')}`, X + 128, Y + 186);
      c.beginPath(); c.arc(X + 46, Y + 46, 12, 0, Math.PI * 2); c.fill();
    });
  });
  const chipMat = inkMaterial({ base: pal.ic, map: atlas, mapAmt: 1, brush: 0.1, spec: 0.7, rim: 1 });
  const chips = LABELS.map((_, i) => {
    const geo = rb(CHIP, CHIP_H, CHIP, 1.1, 2);
    const p = geo.attributes.position, n = geo.attributes.normal, uv = geo.attributes.uv;
    const cu = (i % 3) / 3, cv = 1 - (Math.floor(i / 3) + 1) / 2;
    for (let k = 0; k < p.count; k++) {
      if (n.getY(k) > 0.9) uv.setXY(k, cu + (p.getX(k) / CHIP + 0.5) / 3, cv + (0.5 - p.getZ(k) / CHIP) / 2);
      else uv.setXY(k, cu + 0.01, cv + 0.01);
    }
    const m = new THREE.Mesh(geo, chipMat); m.userData.dynamic = true; g.add(m); return m;
  });
  const chipHome = (i) => V(pocketX[i], TRAY_Y + CHIP_H / 2, G.feedZ);
  const chipPlaced = (i) => { const [x, z] = target(i); return V(x, DECK_Y + CHIP_H / 2, z); };
  // ---- the bridge (moves along z), the carriage (along x on the bridge) and the head (up and down)
  const bridge = new THREE.Group(); bridge.userData.dynamic = true; g.add(bridge);
  const span = xE - xW + 44;
  const Bc = collector();
  Bc.add(rb(span, 24, 28, 4), beam, xc, H + 14, 0);
  Bc.add(rb(span - 16, 4, 30, 1.5), dark2, xc, H + 28, 0);
  Bc.add(rb(span - 20, 2.4, 3, 0.8), brassLit, xc, H + 30.6, 13.5);   // the lit edge
  for (const x of [xW, xE]) {
    Bc.add(rb(32, 28, 46, 4), dark, x, H + 10, 0);
    Bc.add(rb(34, 4, 48, 1.5), dark2, x, H + 25.5, 0);
    for (const sz of [-1, 1]) Bc.add(cyl(5, 5, 16).rotateZ(Math.PI / 2), steel, x + (x === xW ? -16.5 : 16.5), H + 1, sz * 14);
  }
  Bc.add(rb(10, 18, 10, 2), dark2, chainX - 4, H + 6, 0);   // chain bracket
  Bc.build(bridge);
  const carriage = new THREE.Group(); bridge.add(carriage);
  const Cc = collector();
  Cc.add(rb(42, 46, 50, 5), dark2, 0, H + 14, 0);
  Cc.add(rb(46, 7, 38, 2), dark2, 0, H + 40, 0);
  Cc.add(rb(46, 2, 3, 0.8), brassLit, 0, H + 43.6, 19.5);    // a lit brass edge on the carriage's top
  Cc.add(rb(22, 28, 12, 3), dark, 0, H - 4, 22);         // z-axis housing
  Cc.add(rb(12, 18, 12, 2), dark, 17, H - 12, 24);        // vision camera
  Cc.add(cyl(4.5, 6, 16), steel, 17, H - 24, 24);
  Cc.build(carriage);
  const visMat = inkMaterial({ base: pal.hot, emissive: true });
  const vis = new THREE.Mesh(new THREE.TorusGeometry(6, 1.3, 6, 24).rotateX(Math.PI / 2), visMat); vis.position.set(17, H - 27.5, 24); carriage.add(vis);
  const cLedMat = inkMaterial({ base: pal.signal, emissive: true });
  const cLed = new THREE.Mesh(new THREE.BoxGeometry(14, 3, 1.2), cLedMat); cLed.position.set(0, H + 26, 21.6); carriage.add(cLed);
  const head = new THREE.Group(); head.position.z = 22; carriage.add(head);
  const Hc = collector();
  Hc.add(rb(11, 112, 11, 2), steel, 0, 68, 0);
  Hc.add(cyl(2.2, 14, 12, 3.2), dark2, 0, 6, 0);
  Hc.add(cyl(7, 4, 18), dark, 0, 14, 0);
  Hc.add(rb(16, 3, 16, 1), brassDark, 0, 125, 0);
  Hc.build(head);
  const ringMat = inkMaterial({ base: pal.signal, emissive: true });
  const ring = new THREE.Mesh(new THREE.TorusGeometry(9.5, 1.4, 8, 32).rotateX(Math.PI / 2), ringMat); ring.position.y = 19; head.add(ring);
  const ringOn = new THREE.Color(pal.cream), ringIdle = new THREE.Color(pal.signalDeep);
  const workGeo = new THREE.CylinderGeometry(7, 34, 1, 28, 1, true).translate(0, -0.5, 0);
  // the lamp under the head: a cone of warm dots, printed in its own ink and thinning toward the board, so the
  // part being placed reads lit without the chip labels under it washing out
  const work = new THREE.Mesh(workGeo, lightMaterial({
    color: pal.light, print: true,
    vertex: /* glsl */ `in vec3 position; in vec2 uv; uniform mat4 modelMatrix, viewMatrix, projectionMatrix; out float vY;
      void main(){ vY = -position.y; gl_Position = projectionMatrix * viewMatrix * modelMatrix * vec4(position, 1.0); }`,
    fragment: /* glsl */ `precision highp float; ${COLOR} uniform vec3 uColor; uniform float uAmt, uPx; in float vY;
      layout(location = 0) out highp vec4 gColor; layout(location = 1) out highp vec4 gNormal;
      void main(){ float k = vY < 0.34 ? 1.0 : (vY < 0.68 ? 0.5 : 0.16); float d = halftone(gl_FragCoord.xy, 6.5 * uPx, 0.785, 0.26 * k * uAmt);
        gColor = vec4(uColor, d * step(0.01, uAmt)); gNormal = vec4(0.0); }`,
    uniforms: { uAmt: { value: 0 }, uPx: shared.uPx },
  }));
  work.frustumCulled = false; head.add(work);
  // the carriage's z is offset by the head's position on its front face
  const HEADZ = 22;
  // ---- drag chain on the east rail: a U loop from a fixed point to the bridge
  const nLinks = 22, chainR = 12, runs = 124, zf = zN + 10, yL = H - 10.5, yU = yL + 2 * chainR;
  const chainLen = runs + Math.PI * chainR, pitch = chainLen / nLinks;
  const chain = new THREE.InstancedMesh(rb(10, 5, pitch * 0.92, 1, 1), inkMaterial({ base: '#1a201e', brush: 0.1, spec: 0.7, rim: 1, instanced: true }), nLinks);
  chain.frustumCulled = false; g.add(chain);
  const xAxis = V(1, 0, 0);
  const layChain = (zm) => {
    const a = (runs + (zm - zf)) / 2, zb = zf + a;
    for (let i = 0; i < nLinks; i++) {
      const s = (i + 0.5) * pitch;
      let pz, py, th;
      if (s < a) { pz = zf + s; py = yL; th = 0; }
      else if (s < a + Math.PI * chainR) { const f = (s - a) / chainR; pz = zb + Math.sin(f) * chainR; py = yL + chainR - Math.cos(f) * chainR; th = -f; }
      else { pz = zb - (s - a - Math.PI * chainR); py = yU; th = -Math.PI; }
      Q.setFromAxisAngle(xAxis, th); M.compose(V(chainX, py, pz), Q, V(1, 1, 1)); chain.setMatrixAt(i, M);
    }
    chain.instanceMatrix.needsUpdate = true;
  };
  // ---- stack light at the north-east post
  const SL = { x: xE + 26, z: zN - 4 };
  S.add(rb(5, 150, 5, 1.5), dark2, SL.x, 75, SL.z);
  S.add(rb(16, 5, 16, 1.5), feet, SL.x, 2.5, SL.z);
  S.add(cyl(6.6, 4, 20), dark, SL.x, 152, SL.z);
  S.add(cyl(6.6, 3, 20), dark, SL.x, 186, SL.z);
  const lamp = (col, y) => { const m = new THREE.Mesh(cyl(6, 9, 20), inkMaterial({ base: col, emissive: true })); m.position.set(SL.x, y, SL.z); g.add(m); return m.material.uniforms.uGain; };
  const lampG = lamp(pal.signal, 158.5), lampA = lamp(pal.brassDark, 168), lampR = lamp(pal.heatDeep, 177.5);
  S.build(g);
  // ---- legend on the board
  if (silk) {
    silk.ao(xc, zc, xE - xW + 40, zS - zN + 40, 8, 0.5);
    silk.ao(MOD.x, MOD.z, MOD.w + 6, MOD.d + 6, 6, 0.9);
    silk.ao(-200, G.feedZ, 200, 46, 5, 0.85);
    for (const x of [xW, xE]) for (const z of [zN, zS]) silk.ao(x, z, 32, 32, 5, 0.9);
    silk.footprint(xc, zc, xE - xW + 40, zS - zN + 40, 0);
    silk.text('U1', xW - 30, zN - 6, 10, { weight: '700' });
    // (a label under the gantry's feet, small enough to read as print: larger, it read as a second headline; at the
    // frame's foot it was cropped and ran into the route strip)
    silk.text('組裝', xW + 4, zS + 64, 24, { weight: '700', family: JP, base: 'alphabetic' });
    silk.text('ASSEMBLY', xW + 60, zS + 62, 10.5, { weight: '700', family: DISP, base: 'alphabetic', track: 2 });
    silk.text('PICK + PLACE  ·  6 PARTS  ·  ONE OPERATOR', xW + 60, zS + 70, 4.6);
  }
  parts.keep(xW - 8, zS + 34, xW + 230, zS + 116); // nothing is placed over the legend, or between it and the camera
  parts.sprinkle(xc, zc, xE - xW + 70, zS - zN + 70, 26, 6, 18);

  // ---------------------------------------------------------------- motion
  const park = { x: -200, z: 236, y: 74 };
  const pos = { ...park };
  const T = 0.82;                     // one chip, on twos: travel, drop, pick, rise, travel, drop, place
  let t0 = -1, done = 0, from = { ...park }, complete = -1, lastPick = -1, inspect0 = 0;
  const apply = () => {
    bridge.position.z = pos.z - HEADZ;
    carriage.position.x = pos.x;
    head.position.y = pos.y;
    layChain(pos.z - HEADZ);
  };
  const placeChips = (heldK) => {
    chips.forEach((m, i) => {
      if (i === heldK) m.position.set(pos.x, pos.y - CHIP_H / 2 - 0.4, pos.z);
      else if (i < done) m.position.copy(chipPlaced(i));
      else m.position.copy(chipHome(i));
    });
  };
  const setLeds = (s) => {
    for (let i = 0; i < 6; i++) leds.setColorAt(i, i < done ? ledOn : ledOff);
    leds.setColorAt(6, complete >= 0 ? ledOn : (t0 >= 0 ? (Math.floor(s * 4) % 2 ? ledAmber : ledOff) : ledAmber));
    leds.instanceColor.needsUpdate = true;
  };
  apply(); placeChips(-1);
  const api = {
    group: g, chips, wake: 1,
    onComplete: null,
    /** start (or resume) building when the visitor arrives */
    start(t) { if (done >= 6) return; t0 = t - done * T; from = { ...pos }; },
    stop() { if (done < 6) { t0 = -1; from = { ...pos }; } },
    reset() { done = 0; complete = -1; t0 = -1; traces.material.uniforms.uDraw.value = 0; placeChips(-1); },
    get done() { return done; },
    update(t, dt, sfx) {
      const s = step12(t);
      let held = -1;
      traces.material.uniforms.uStep.value = s;
      if (t0 >= 0 && done < 6) {
        const e = Math.max(0, s - t0);
        const k = Math.min(5, Math.floor(e / T)), u = (e - k * T) / T;
        const fx = pocketX[k], fz = G.feedZ, [tx, tz] = target(k);
        const prev = k === 0 ? from : (() => { const [px, pz] = target(k - 1); return { x: px, z: pz, y: 74 }; })();
        const pickY = TRAY_Y + CHIP_H + 0.4, placeY = DECK_Y + CHIP_H + 0.4;
        if (u < 0.26) { const m = minJerk(u / 0.26); pos.x = prev.x + (fx - prev.x) * m; pos.z = prev.z + (fz - prev.z) * m; pos.y = 74 + (prev.y - 74) * (1 - m); }
        else if (u < 0.44) { pos.x = fx; pos.z = fz; pos.y = 74 - (74 - pickY) * Math.sin(Math.PI * seg(u, 0.26, 0.44)); }
        else if (u < 0.74) { const m = minJerk(seg(u, 0.44, 0.74)); pos.x = fx + (tx - fx) * m; pos.z = fz + (tz - fz) * m; pos.y = 74; }
        else { pos.x = tx; pos.z = tz; pos.y = 74 - (74 - placeY) * Math.sin(Math.PI * Math.min(1, seg(u, 0.74, 0.96))); }
        const picked = u >= 0.35, put = u >= 0.85;
        if (picked && lastPick !== k) { lastPick = k; sfx?.play('pick'); }
        if (picked && !put) held = k;
        const n = put ? k + 1 : k;
        if (n > done) { done = n; sfx?.play('chipSeat'); api.flashAt = t; }
        if (done >= 6) { t0 = -1; complete = t; from = { ...pos }; api.onComplete?.(t); }
      } else if (api.wake < 0.5) {
        // standing by while the visitor is elsewhere: the head holds still
      } else if (done >= 6) {
        // inspection: hover over each part in turn and flash the camera
        const e = s - complete;
        const back = minJerk(seg(e, 0, 0.5));
        const k = Math.floor(Math.max(0, e - 0.6) / 0.7) % 6, u = (Math.max(0, e - 0.6) % 0.7) / 0.7;
        const [ax, az] = target((k + 5) % 6), [bx, bz] = target(k), m = minJerk(seg(u, 0, 0.45));
        const ix = e < 0.6 ? ax : ax + (bx - ax) * m, iz = e < 0.6 ? az : az + (bz - az) * m;
        pos.x = from.x + (ix - from.x) * back; pos.z = from.z + (iz - from.z) * back; pos.y = from.y + (52 - from.y) * back;
        if (e > 0.6 && u > 0.55 && u < 0.7) api.flashAt = t;
        traces.material.uniforms.uDraw.value = minJerk(seg(e, 0, 0.7)) * 1.001;
      }
      else if (t0 < 0 && done === 0) {
        // waiting for the visitor: the head calibrates over the feeder, on twos
        pos.x = park.x + Math.sin(s * 0.9) * 46; pos.z = G.feedZ + 6 + Math.sin(s * 0.5) * 8; pos.y = 64 + Math.abs(Math.sin(s * 1.8)) * 10;
        if (Math.floor(s * 12) % 17 === 0) api.flashAt = t;
      }
      placeChips(held);
      setLeds(s);
      // lights: the head ring is bright while it holds a part, the vision ring flashes on each placement; away
      // from the core the whole machine stands by (wake)
      const w = api.wake;
      ringMat.uniforms.uGain.value = (held >= 0 ? 1.1 : 0.4) * w;
      visMat.uniforms.uGain.value = (api.flashAt != null && t - api.flashAt < 0.12 ? 1.0 : 0.16) * w;
      cLedMat.uniforms.uGain.value = (t0 >= 0 ? (Math.floor(s * 6) % 2 ? 0.9 : 0.3) : 0.45) * w;
      traces.material.uniforms.uAmt.value = 0.25 + 0.75 * w;
      buses.forEach(([a, b], k) => { traces.material.uniforms.uBus.value[k] = Math.max(a, b) < done ? 1 : 0; });
      ringMat.uniforms.uBase.value.copy(held >= 0 ? ringOn : ringIdle);
      work.scale.y = Math.max(1, pos.y - DECK_Y); work.material.uniforms.uAmt.value = w * (t0 >= 0 || held >= 0 ? 1 : 0.5);
      ledMat.uniforms.uGain.value = 0.3 + 0.7 * w;
      // the stack light: green while it works, a green blink when the board is complete; amber and red stay dark
      const blink = complete >= 0 && t - complete < 1.4 ? Math.floor(s * 6) % 2 : 1;
      lampA.value = 0.12;
      lampG.value = (t0 >= 0 || done >= 6 ? 0.6 * blink + 0.04 : 0.1) * w;
      lampR.value = 0.12;
      apply();
    },
  };
  return api;
}
