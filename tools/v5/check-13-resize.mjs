// v5 #13: the layout follows a resize or a rotation without a reload. At each stop: load at one size, resize to
// another, wait 500 ms, and compare with a fresh load at the second size: the card's rectangle and the leader
// trace's end point within 4 px (and the leader shown or hidden alike), and the camera itself within 1 unit.
//   node tools/v5/check-13-resize.mjs [stops=0,1,2,3,4,5]
import { launch, open, goTo } from './lib.mjs';

const CASES = [[[1440, 900], [390, 844]], [[390, 844], [1440, 900]], [[390, 844], [844, 390]]];
const stops = (process.argv[2] || '0,1,2,3,4,5').split(',').map(Number);
const IDS = ['top', 'systems', 'ai', 'security', 'work', 'contact'];

const measure = (page, i) => page.evaluate(async (id) => {
  // let the card's print-in and the leader's draw-in finish
  await new Promise((r) => setTimeout(r, 900));
  const c = document.querySelector(`.stop--${id} .card`).getBoundingClientRect();
  const lead = document.querySelector('.lead'), via = lead?.querySelector('.lead__via');
  const shown = !!lead && lead.classList.contains('is-on') && !lead.classList.contains('is-hidden');
  const w = window.__xini.world, cam = [...w.camera.position.toArray(), ...w.rig.lookAt.toArray(), w.camera.fov];
  return { card: [c.left, c.top, c.width, c.height].map((v) => +v.toFixed(1)), lead: shown ? [+via.getAttribute('cx'), +via.getAttribute('cy')] : null, cam };
}, IDS[i]);

const browser = await launch();
let fail = 0;
for (const [A, B] of CASES) {
  for (const i of stops) {
    const a = await open(browser, { size: A });
    await goTo(a.page, i, 15000);
    await a.page.setViewportSize({ width: B[0], height: B[1] });
    await a.page.waitForTimeout(500);
    const got = await measure(a.page, i);
    await a.context.close();
    const b = await open(browser, { size: B });
    await goTo(b.page, i, 15000);
    const want = await measure(b.page, i);
    await b.context.close();
    const dc = Math.max(...got.card.map((v, k) => Math.abs(v - want.card[k])));
    const dl = got.lead && want.lead ? Math.hypot(got.lead[0] - want.lead[0], got.lead[1] - want.lead[1]) : got.lead === want.lead ? 0 : Infinity;
    // (and the framing itself: the camera where a fresh load puts it)
    const dcam = Math.max(...got.cam.map((v, k) => Math.abs(v - want.cam[k])));
    const ok = dc <= 4 && dl <= 4 && dcam <= 1;
    if (!ok) fail++;
    console.log(`${A.join('x')} → ${B.join('x')}  stop ${i}: camera off by ${dcam.toFixed(2)}; card off by ${dc.toFixed(1)} px; leader ${dl === Infinity ? `${got.lead ? 'shown' : 'hidden'} vs ${want.lead ? 'shown' : 'hidden'}` : `off by ${dl.toFixed(1)} px`}  ${ok ? 'PASS' : 'FAIL'}`);
  }
}
await browser.close();
process.exit(fail ? 1 : 0);
