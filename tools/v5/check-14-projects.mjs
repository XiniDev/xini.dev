// v5 #14: at Memory, a scroll step (wheel, arrow key, swipe) moves through the three projects, then flies to I/O;
// stepping back from I/O lands on the third project. One gesture is one step (a trackpad burst of 30 wheel events
// over 600 ms advances exactly one project). The route's ticks follow the project, and the pager still works.
import { launch, open, goTo } from './lib.mjs';

const state = (page) => page.evaluate(() => {
  const w = window.__xini.world;
  return { stop: w.rig.index, flying: w.rig.flying || !!w.pending, project: w.ui.project, ticks: [...document.querySelectorAll('.route__ticks rect')].map((r) => (r.classList.contains('on') ? 1 : 0)).join('') };
});
const settle = async (page) => { await page.waitForFunction(() => { const w = window.__xini.world; return !w.rig.flying && !w.pending && !w.nav.busy(); }, null, { timeout: 15000 }); await page.waitForTimeout(250); };
const fmt = (s) => `${s.stop === 4 ? `05 project ${s.project + 1}` : `0${s.stop + 1}`} [${s.ticks}]`;

const browser = await launch();
let fail = 0;
for (const size of ['desktop', 'phone']) {
  for (const how of ['wheel', 'keys', 'swipe']) {
    const { page, context } = await open(browser, { size, touch: how === 'swipe' });
    await goTo(page, 3, 15000); await goTo(page, 4, 15000); await settle(page);
    const [W, H] = size === 'phone' ? [390, 844] : [1440, 900];
    await page.mouse.move(W / 2, H / 3);
    const step = async (d) => {
      if (how === 'wheel') await page.mouse.wheel(0, 120 * d);
      else if (how === 'keys') await page.keyboard.press(d > 0 ? 'ArrowDown' : 'ArrowUp');
      else await page.evaluate((d) => {
        const t = (y) => new Touch({ identifier: 1, target: document.body, clientX: 200, clientY: y });
        const [a, b] = d > 0 ? [600, 300] : [300, 600];
        window.dispatchEvent(new TouchEvent('touchstart', { touches: [t(a)], changedTouches: [t(a)], bubbles: true }));
        window.dispatchEvent(new TouchEvent('touchmove', { touches: [t((a + b) / 2)], changedTouches: [t((a + b) / 2)], bubbles: true, cancelable: true }));
        window.dispatchEvent(new TouchEvent('touchend', { touches: [], changedTouches: [t(b)], bubbles: true }));
      }, d);
      await page.waitForTimeout(300); await settle(page);
      return state(page);
    };
    const seen = [await state(page)];
    for (const d of [1, 1, 1, -1]) seen.push(await step(d));
    const want = ['05 project 1 [100]', '05 project 2 [010]', '05 project 3 [001]', '06 [001]', '05 project 3 [001]'];
    const got = seen.map(fmt);
    const ok = got.join() === want.join();
    if (!ok) fail++;
    console.log(`${size} ${how.padEnd(5)}: ${got.join(' → ')}  ${ok ? 'PASS' : `FAIL (want ${want.join(' → ')})`}`);
    if (how === 'wheel') {
      // a trackpad burst from project 1: 30 small wheel events over 600 ms
      await page.evaluate(() => window.__xini.project(0)); await page.waitForTimeout(600); await settle(page);
      for (let k = 0; k < 30; k++) { await page.mouse.wheel(0, 14); await page.waitForTimeout(20); }
      await page.waitForTimeout(400); await settle(page);
      const b = await state(page);
      const bok = b.stop === 4 && b.project === 1;
      if (!bok) fail++;
      console.log(`${size} burst: 30 wheel events over 600 ms → ${fmt(b)}  ${bok ? 'PASS' : 'FAIL (want 05 project 2)'}`);
      // the pager still steps (and wraps)
      await page.click('.pager__next'); await page.waitForTimeout(500);
      const p1 = await state(page);
      await page.click('.pager__prev'); await page.waitForTimeout(500);
      const p2 = await state(page);
      const pok = p1.project === 2 && p2.project === 1 && p1.ticks === '001' && p2.ticks === '010';
      if (!pok) fail++;
      console.log(`${size} pager: next → ${fmt(p1)}, prev → ${fmt(p2)}  ${pok ? 'PASS' : 'FAIL'}`);
      // a step plays the pager and module cues and tells the music there is activity
      await page.evaluate(() => {
        const s = window.__xini.sfx, play = s.play.bind(s), act = s.activity.bind(s);
        window.__cues = []; s.play = (n, o) => { window.__cues.push(n); return play(n, o); }; s.activity = () => { window.__cues.push('activity'); return act(); };
      });
      await page.mouse.wheel(0, 120); await page.waitForTimeout(1200); await settle(page);
      const cues = await page.evaluate(() => window.__cues);
      const cok = ['pager', 'moduleSeat', 'activity'].every((c) => cues.includes(c));
      if (!cok) fail++;
      console.log(`${size} cues on a step: ${cues.join(', ')}  ${cok ? 'PASS' : 'FAIL'}`);
      // with the project index open, the wheel scrolls the index and the page stays put
      const before = await state(page);
      await page.click('.work__all'); await page.waitForTimeout(600);
      const box = await page.locator('.index__sheet').boundingBox();
      await page.mouse.move(box.x + box.width / 2, box.y + box.height / 2);
      for (let k = 0; k < 4; k++) { await page.mouse.wheel(0, 200); await page.waitForTimeout(250); }
      const ix = await page.evaluate(() => document.querySelector('.index__sheet').scrollTop);
      const after = await state(page);
      const iok = ix > 0 && after.stop === before.stop && after.project === before.project;
      if (!iok) fail++;
      console.log(`${size} index open: wheel scrolled it to ${ix}px; still ${fmt(after)}  ${iok ? 'PASS' : 'FAIL'}`);
    }
    await context.close();
  }
}
// the flight lands on the chosen screen: no slide after landing (forward lands on project 1, back from I/O on 3)
{
  const { page, context } = await open(browser);
  for (const [from, want] of [[3, 0], [5, 2]]) {
    await goTo(page, from, 15000); await page.waitForTimeout(800);
    const r = await page.evaluate(() => new Promise((res) => {
      const W = window.__xini.world; window.__xini.goto(4);
      const wait = () => { if (W.rig.flying || W.pending) return requestAnimationFrame(wait); const a = W.camera.position.clone(); setTimeout(() => res({ project: W.ui.project, drift: a.distanceTo(W.camera.position) }), 1500); };
      wait();
    }));
    const ok = r.project === want && r.drift < 4;
    if (!ok) fail++;
    console.log(`arrival from 0${from + 1}: project ${r.project + 1}, camera moved ${r.drift.toFixed(2)} units in the 1.5 s after landing  ${ok ? 'PASS' : 'FAIL'}`);
  }
  await context.close();
}
await browser.close();
process.exit(fail ? 1 : 0);
