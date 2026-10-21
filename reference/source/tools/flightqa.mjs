// Flight QA: flies every leg of the route with the real rig at 60 fps (nothing is rendered), measures the
// camera's clearance from solid parts and its rotation (speed and spikes), and draws a top-down map of
// the parts, the stops and the paths.
// node tools/flightqa.mjs <url> <outDir> [legs=0-1,1-2,...] [minClear=14]
import { launch } from './browser.mjs';
import { execFileSync } from 'node:child_process';
import fs from 'node:fs';
import path from 'node:path';
const [, , url, outDir, legsArg = '', minClearArg = '14'] = process.argv;
const minClear = +minClearArg;
fs.mkdirSync(outDir, { recursive: true });
const b = await launch();
const p = await b.newPage({ viewport: { width: 1200, height: 750 } });
p.on('pageerror', (e) => console.log('pageerror:', e.message));
await p.goto(url + (url.includes('?') ? '&' : '?') + 'skipintro&dpr=1', { waitUntil: 'load' });
await p.waitForFunction(() => window.__xini && window.__xini.ready, null, { timeout: 400000 });
const data = await p.evaluate((legsArg) => {
  const W = window.__xini.world; W.paused = true;
  const scene = W.scene, rig = W.rig, cam = W.camera;
  // let the director settle mechanisms into their rest state, then freeze the scene
  scene.updateMatrixWorld(true);
  const boxes = [];
  const visible = (o) => { for (let x = o; x; x = x.parent) if (!x.visible) return false; return true; };
  const topName = (o) => { let x = o; while (x.parent && x.parent !== scene) x = x.parent; return x.name || `${x.type}#${scene.children.indexOf(x)}`; };
  scene.traverse((o) => {
    if (!o.isMesh || !visible(o) || o.userData.noClear) return;
    const m = o.material;
    if (!m || m.transparent || m.blending === 2 || m.depthWrite === false) return;
    const g = o.geometry; if (!g.boundingBox) g.computeBoundingBox();
    if (!isFinite(g.boundingBox.min.x)) return;
    const push = (bx) => {
      const sx = bx.max.x - bx.min.x, sz = bx.max.z - bx.min.z;
      if (sx > 1500 || sz > 1500) return; // the board, the case floor, the sky
      boxes.push([bx.min.x, bx.min.y, bx.min.z, bx.max.x, bx.max.y, bx.max.z].map((v) => +v.toFixed(1)).concat([topName(o)]));
    };
    if (o.isInstancedMesh) {
      const mi = o.matrixWorld.clone();
      for (let i = 0; i < o.count; i++) {
        o.getMatrixAt(i, mi);
        if (Math.abs(mi.determinant()) < 1e-9) continue;
        push(g.boundingBox.clone().applyMatrix4(o.matrixWorld.clone().multiply(mi)));
      }
      return;
    }
    const wb = g.boundingBox.clone().applyMatrix4(o.matrixWorld);
    if (wb.max.x - wb.min.x > 1500 || wb.max.z - wb.min.z > 1500) return; // the board, the case floor, the sky
    const big =Math.max(wb.max.x - wb.min.x, wb.max.y - wb.min.y, wb.max.z - wb.min.z) > 150;
    if (!big || !g.attributes.position) { push(wb); return; }
    // large or curved meshes (tubes, arches, merged parts): bin triangles into 30-unit cells
    const pos = g.attributes.position, idx = g.index, v = wb.min.clone(), cells = new Map(), C = 30;
    const tri = idx ? idx.count / 3 : pos.count / 3;
    const P = [wb.min.clone(), wb.min.clone(), wb.min.clone()];
    for (let f = 0; f < tri; f++) {
      for (let k = 0; k < 3; k++) { const i = idx ? idx.getX(f * 3 + k) : f * 3 + k; P[k].fromBufferAttribute(pos, i).applyMatrix4(o.matrixWorld); }
      v.copy(P[0]).add(P[1]).add(P[2]).multiplyScalar(1 / 3);
      const key = `${Math.floor(v.x / C)},${Math.floor(v.y / C)},${Math.floor(v.z / C)}`;
      let c = cells.get(key);
      if (!c) { c = wb.clone().makeEmpty(); cells.set(key, c); }
      c.expandByPoint(P[0]); c.expandByPoint(P[1]); c.expandByPoint(P[2]);
    }
    cells.forEach((c) => push(c));
  });
  const stops = W.route.stops, n = stops.length;
  const legs = legsArg ? legsArg.split(',').map((s) => s.split('-').map(Number)) : stops.map((_, i) => [i, (i + 1) % n]);
  const dt = 1 / 60;
  const clear = (P) => {
    let dmin = P.y, which = -1;
    for (let k = 0; k < boxes.length; k++) {
      const B = boxes[k];
      const dx = Math.max(B[0] - P.x, 0, P.x - B[3]), dy = Math.max(B[1] - P.y, 0, P.y - B[4]), dz = Math.max(B[2] - P.z, 0, P.z - B[5]);
      const d = Math.hypot(dx, dy, dz);
      if (d < dmin) { dmin = d; which = k; }
    }
    return [dmin, which];
  };
  const out = [];
  for (const [a, bb] of legs) {
    rig.flight = null; rig.index = a; rig.pose = rig.copyPose(stops[a]); rig.settle = null; rig.q = null;
    rig.offset.p.set(0, 0, 0); rig.offset.t.set(0, 0, 0); rig.offsetTarget.p.set(0, 0, 0); rig.offsetTarget.t.set(0, 0, 0);
    rig.update(dt); rig.apply();
    const dur = rig.go(bb);
    const samples = [];
    const prevQ = cam.quaternion.clone(), dq = cam.quaternion.clone();
    for (let t = 0; t < dur + 1.0; t += dt) {
      rig.update(dt); rig.apply();
      const P = cam.position;
      const [dmin, which] = clear(P);
      dq.copy(prevQ).invert().multiply(cam.quaternion);
      if (dq.w < 0) { dq.x = -dq.x; dq.y = -dq.y; dq.z = -dq.z; dq.w = -dq.w; }
      const ang = 2 * Math.acos(Math.min(1, dq.w)), s = Math.sqrt(Math.max(1e-12, 1 - dq.w * dq.w));
      const w = [dq.x / s * ang / dt, dq.y / s * ang / dt, dq.z / s * ang / dt];
      prevQ.copy(cam.quaternion);
      samples.push([t, P.x, P.y, P.z, rig.lookAt.x, rig.lookAt.y, rig.lookAt.z, dmin, which, ...w, cam.fov, rig.flying ? 1 : 0].map((v) => (typeof v === 'number' ? +v.toFixed(3) : v)));
    }
    out.push({ a, b: bb, dur, samples });
  }
  return { boxes, stops: stops.map((s) => ({ id: s.id, p: s.p.toArray(), t: s.t.toArray() })), out };
}, legsArg);
await b.close();
// ---- report
const deg = 180 / Math.PI;
const rows = [];
for (const L of data.out) {
  const S = L.samples;
  let cmin = 1e9, cAt = 0, cBox = -1, wmax = 0, amax = 0, aAt = 0, len = 0, bad = 0;
  for (let i = 0; i < S.length; i++) {
    const s = S[i];
    if (s[7] < cmin) { cmin = s[7]; cAt = s[0]; cBox = s[8]; }
    if (s[7] < minClear) bad++;
    const w = Math.hypot(s[9], s[10], s[11]); wmax = Math.max(wmax, w);
    if (i > 1) {
      const q = S[i - 1];
      const a = Math.hypot(s[9] - q[9], s[10] - q[10], s[11] - q[11]) * 60;
      if (a > amax) { amax = a; aAt = s[0]; }
      len += Math.hypot(s[1] - q[1], s[2] - q[2], s[3] - q[3]);
    }
  }
  const box = cBox >= 0 ? data.boxes[cBox] : null;
  const fast = []; let f0 = -1;
  for (let i = 0; i < S.length; i++) { const w = Math.hypot(S[i][9], S[i][10], S[i][11]) * deg; if (w > 120 && f0 < 0) f0 = S[i][0]; if ((w <= 120 || i === S.length - 1) && f0 >= 0) { fast.push(`${f0.toFixed(2)}-${S[i][0].toFixed(2)}`); f0 = -1; } }
  if (fast.length) console.log(`${L.a}->${L.b} fast rotation (>120 deg/s):`, fast.join(', '));
  rows.push({ leg: `${L.a}->${L.b}`, dur: L.dur.toFixed(2), len: len.toFixed(0), clear: cmin.toFixed(1), at: cAt.toFixed(2), part: box ? `${box[6]} [${box.slice(0, 6).join(',')}]` : 'board', lowFrames: bad, maxDegS: (wmax * deg).toFixed(0), maxDegS2: (amax * deg).toFixed(0), spikeAt: aAt.toFixed(2) });
}
console.table(rows);
fs.writeFileSync(path.join(outDir, 'flightqa.json'), JSON.stringify(data));
fs.writeFileSync(path.join(outDir, 'flightqa-report.json'), JSON.stringify(rows, null, 1));
execFileSync('python3', [path.join(path.dirname(new URL(import.meta.url).pathname), 'flightqa-plot.py'), path.join(outDir, 'flightqa.json'), path.join(outDir, 'map.png'), String(minClear)], { stdio: 'inherit' });
console.log('saved', path.join(outDir, 'map.png'));
