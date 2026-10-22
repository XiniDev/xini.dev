// v5 #4: the music follows the visit.
// 1. A scripted visit through every stop (and the finale back to Power on) with sound on: no console errors,
//    and once settled at each stop music.getState().stop is that stop (with the lag from departure).
// 2. At the Enclave, section reads 'main' no later than one beat (0.67 s) after the cube solves.
// 3. Frame pacing at The core: requestAnimationFrame intervals over 10 s, sound off vs on, p95 within 10%.
import { launch, open, goTo } from './lib.mjs';

const browser = await launch();
const { page, context, errors } = await open(browser, { audio: true });
const box = await page.locator('.bar__sound').boundingBox();
await page.mouse.click(box.x + box.width / 2, box.y + box.height / 2);
await page.mouse.move(box.x - 300, box.y + 400);
await page.waitForTimeout(1200);

// a watcher in the page: when each flight departs, when the music's stop changes, when the cube solves and the
// music's section turns to 'main'
await page.evaluate(() => {
  const w = window.__xini.world, m = window.__xini.sfx.music, W = (window.__watch = { log: [], solvedAt: null, mainAt: null });
  let lastStop = m.getState().stop, flying = false;
  const loop = () => {
    const now = performance.now(), st = m.getState();
    if (w.rig.flying && !flying) W.log.push({ ev: 'depart', to: w.rig.flight.to, t: now });
    flying = w.rig.flying;
    if (st.stop !== lastStop) { W.log.push({ ev: 'music', stop: st.stop, t: now }); lastStop = st.stop; }
    if (W.armed && W.solvedAt === null && w.director.enc.solved) W.solvedAt = now;
    if (W.solvedAt !== null && W.mainAt === null && st.section === 'main') W.mainAt = now;
    requestAnimationFrame(loop);
  };
  loop();
});

const rows = [];
for (const i of [1, 2, 3, 4, 5, 0]) {
  if (i === 3) await page.evaluate(() => { window.__watch.armed = true; });
  await goTo(page, i);
  if (i === 3) await page.waitForFunction(() => window.__watch.mainAt !== null, null, { timeout: 15000 }).catch(() => {});
  await page.waitForTimeout(1000);
  const r = await page.evaluate((n) => {
    const L = window.__watch.log, dep = [...L].reverse().find((e) => e.ev === 'depart' && e.to === n), ch = L.find((e) => e.ev === 'music' && e.stop === n && dep && e.t >= dep.t);
    return { stop: window.__xini.sfx.music.getState().stop, lag: dep && ch ? (ch.t - dep.t) / 1000 : null };
  }, i);
  rows.push({ i, ...r, ok: r.stop === i });
}
const enc = await page.evaluate(() => ({ solvedAt: window.__watch.solvedAt, mainAt: window.__watch.mainAt }));
const resolveLag = enc.solvedAt !== null && enc.mainAt !== null ? (enc.mainAt - enc.solvedAt) / 1000 : null;

// frame pacing at The core
await goTo(page, 1);
const pace = async () => page.evaluate(() => new Promise((res) => {
  const d = []; let last = performance.now(); const end = last + 10000;
  const f = (t) => { d.push(t - last); last = t; if (t < end) requestAnimationFrame(f); else { d.sort((a, b) => a - b); res({ p95: d[Math.floor(d.length * 0.95)], mean: d.reduce((a, b) => a + b, 0) / d.length, n: d.length }); } };
  requestAnimationFrame(f);
}));
const on = await pace();
await page.mouse.click(box.x + box.width / 2, box.y + box.height / 2);
await page.waitForTimeout(1200);
const off = await pace();
await context.close(); await browser.close();

let fail = 0;
for (const r of rows) { if (!r.ok) fail++; console.log(`stop ${r.i}: music stop ${r.stop}, changed ${r.lag === null ? '?' : r.lag.toFixed(2) + ' s'} after departure  ${r.ok ? 'PASS' : 'FAIL'}`); }
const encOk = resolveLag !== null && resolveLag <= 0.67;
if (!encOk) fail++;
console.log(`Enclave: section 'main' ${resolveLag === null ? 'never seen' : resolveLag.toFixed(3) + ' s'} after the cube solved (≤ 0.67)  ${encOk ? 'PASS' : 'FAIL'}`);
const paceOk = on.p95 <= off.p95 * 1.1;
if (!paceOk) fail++;
console.log(`frame pacing at The core: p95 ${on.p95.toFixed(2)} ms with sound vs ${off.p95.toFixed(2)} ms without (mean ${on.mean.toFixed(2)} / ${off.mean.toFixed(2)}, ${on.n}/${off.n} frames)  ${paceOk ? 'PASS' : 'FAIL'}`);
if (errors.length) { fail++; console.log('console errors:\n  ' + errors.join('\n  ')); } else console.log('console errors: none  PASS');
process.exit(fail ? 1 : 0);
