// v5 #12: every flight between two stops (29 ordered pairs; the finale, I/O → Power on, is left as it is) turns the
// short way. The real rig flies each at 60 fps (nothing rendered) and the camera's orientation is logged every
// frame: total rotation ≤ the shortest rotation between the start and end orientations + 30°, and peak angular
// speed ≤ 120°/s. Clearance from solid parts is tools/flightqa.mjs's job (run it with the same pairs).
//   node tools/v5/check-12-jumps.mjs [outDir]
import { mkdirSync, writeFileSync } from 'node:fs';
import { launch, BASE } from './lib.mjs';

const out = process.argv[2] || '.shots/v5-checks/12';
mkdirSync(out, { recursive: true });
const pairs = [];
for (let a = 0; a < 6; a++) for (let b = 0; b < 6; b++) if (a !== b && !(a === 5 && b === 0)) pairs.push([a, b]);

const browser = await launch();
const page = await browser.newPage({ viewport: { width: 1440, height: 900 } });
await page.goto(BASE + '?skipintro&dpr=1', { waitUntil: 'load' });
await page.waitForFunction(() => window.__xini?.ready, null, { timeout: 120000 });
const rows = await page.evaluate((pairs) => {
  const W = window.__xini.world; W.paused = true;
  const rig = W.rig, cam = W.camera, stops = W.route.stops, dt = 1 / 60, deg = 180 / Math.PI;
  const angle = (q0, q1) => 2 * Math.acos(Math.min(1, Math.abs(q0.dot(q1))));
  const res = [];
  for (const [a, b] of pairs) {
    rig.flight = null; rig.index = a; rig.pose = rig.copyPose(stops[a]); rig.settle = null; rig.q = null;
    rig.offset.p.set(0, 0, 0); rig.offset.t.set(0, 0, 0); rig.offsetTarget.p.set(0, 0, 0); rig.offsetTarget.t.set(0, 0, 0);
    rig.update(dt); rig.apply();
    const q0 = cam.quaternion.clone(), prev = q0.clone();
    const dur = rig.go(b);
    let total = 0, peak = 0, top = -Infinity;
    for (let t = 0; t < dur + 1.0; t += dt) {
      rig.update(dt); rig.apply();
      const d = angle(prev, cam.quaternion);
      total += d; peak = Math.max(peak, d / dt); top = Math.max(top, cam.position.y);
      prev.copy(cam.quaternion);
    }
    res.push({ a, b, dur, shortest: angle(q0, cam.quaternion) * deg, total: total * deg, peak: peak * deg, top });
  }
  return res;
}, pairs);
await browser.close();

let fail = 0;
console.log('flight  dur(s)  shortest  total   excess  peak°/s  top y   result');
for (const r of rows) {
  const ok = r.total <= r.shortest + 30 && r.peak <= 120;
  if (!ok) fail++;
  console.log(`${r.a}->${r.b}    ${r.dur.toFixed(2).padStart(5)}  ${r.shortest.toFixed(0).padStart(6)}°  ${r.total.toFixed(0).padStart(5)}°  ${(r.total - r.shortest).toFixed(0).padStart(5)}°  ${r.peak.toFixed(0).padStart(6)}  ${r.top.toFixed(0).padStart(5)}   ${ok ? 'PASS' : 'FAIL'}`);
}
writeFileSync(`${out}/jumps.json`, JSON.stringify(rows, null, 1));
console.log(`\n${rows.length - fail}/${rows.length} pass`);
process.exit(fail ? 1 : 0);
