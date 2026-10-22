// v5 #11: arrivals land their impact frame with no stop name over it. The scene is frozen and stepped by hand to
// the frame the arrival's impact lands on, for two different arrivals, and captured.
import { mkdirSync } from 'node:fs';
import { launch, open } from './lib.mjs';

const out = process.argv[2] || '.shots/v5-checks/11';
mkdirSync(out, { recursive: true });
const browser = await launch();
const { page, context } = await open(browser, { query: '?skipintro&capture' });
let fail = 0;
for (const [from, to, mid] of [[1, 2, false], [2, 3, true], [2, 3, false]]) {
  await page.evaluate((f) => window.__xini.goto(f), from);
  await page.waitForFunction((f) => { const w = window.__xini.world; return w.rig.index === f && !w.rig.flying && !w.pending; }, from, { timeout: 15000 });
  await page.waitForTimeout(800);
  const r = await page.evaluate(async ([n, mid]) => {
    const X = window.__xini, w = X.world;
    X.freeze(); X.goto(n);
    let k = 0;
    // stepped by hand to the impact frame, or to 40 % of the flight (where the old title sat at full strength)
    while ((mid ? w.rig.progress < 0.4 : w.pending) && k++ < 400) X.advance(1 / 60, 1 / 60);
    const titles = [...document.querySelectorAll('.title, .title__text')].map((e) => e.textContent);
    const big = [...document.querySelectorAll('body *')].filter((e) => { if (e.closest('.card')) return false; const s = getComputedStyle(e); return parseFloat(s.fontSize) >= 48 && e.offsetParent !== null && e.textContent.trim() && s.visibility !== 'hidden' && +s.opacity > 0.05; }).map((e) => e.textContent.trim().slice(0, 40));
    return { landed: !w.pending, impact: w.impact.flash ?? w.impact.t ?? null, titles, big };
  }, [to, mid]);
  await page.waitForTimeout(150);
  const file = `${out}/${mid ? 'flight-40pct' : 'impact-arrive'}-${to}.png`;
  await page.screenshot({ path: file });
  const ok = (mid || r.landed) && r.titles.length === 0 && r.big.length === 0;
  if (!ok) fail++;
  console.log(`${mid ? 'mid-flight (40 %) to' : 'arrival at'} stop ${to}: title elements ${r.titles.length}; large visible text outside the cards ${JSON.stringify(r.big)} → ${file}  ${ok ? 'PASS' : 'FAIL'}`);
  await page.evaluate(() => window.__xini.unfreeze());
  await page.waitForTimeout(1500);
}
await context.close(); await browser.close();
process.exit(fail ? 1 : 0);
