// Development captures: one page load, several stops, optional greyscale copies and draw-call stats.
// node tools/caps.mjs <url> <outDir> [w=1200] [h=750] [stops=0,1,2,3,4,5] [settle=4.2] [grey=0]
import { launch } from './browser.mjs';
import { execFileSync } from 'node:child_process';
import fs from 'node:fs';
const [, , url, outDir, w = '1200', h = '750', list = '0,1,2,3,4,5', settle = '4.2', grey = '0'] = process.argv;
fs.mkdirSync(outDir, { recursive: true });
const b = await launch();
const p = await b.newPage({ viewport: { width: +w, height: +h }, isMobile: +w < 700, hasTouch: +w < 700 });
p.on('pageerror', (e) => console.log('pageerror:', e.message));
p.on('console', (m) => { if (m.type() === 'error' || (m.type() === 'warning' && !/toNonIndexed/.test(m.text()))) console.log(m.type(), m.text().slice(0, 300)); });
const t0 = Date.now();
await p.goto(url + (url.includes('?') ? '&' : '?') + 'skipintro&dpr=1', { waitUntil: 'load' });
await p.waitForFunction(() => window.__xini && window.__xini.ready, null, { timeout: 400000 });
console.log('ready', ((Date.now() - t0) / 1000).toFixed(1) + 's');
await p.evaluate(() => window.__xini.stats());
const files = [];
for (const s of list.split(',')) {
  const i = +s;
  if (i) {
    await p.evaluate((k) => window.__xini.goto(k), i);
    // fly all the way in (multi-stop jumps take longer), then let the stop settle
    await p.evaluate(() => { const W = window.__xini.world; for (let k = 0; k < 40 && W.rig.flying; k++) window.__xini.advance(0.25); });
    await p.evaluate((d) => window.__xini.advance(d), +settle);
  }
  await p.waitForTimeout(1200);
  // software rendering draws a frame every second or so: bring the leader up to date for this stop by hand, then
  // finish every print-in animation (twice, in case a late frame restarted one)
  const finishAll = () => p.evaluate(() => { const W = window.__xini.world; W.director.cards?.update(W); document.querySelector('.title')?.classList.remove('is-on'); document.getAnimations().forEach((a) => { try { a.finish(); } catch (e) {} }); });
  await finishAll(); await p.waitForTimeout(250); await finishAll();
  const f = `${outDir}/${w}x${h}-${i}.png`;
  await p.screenshot({ path: f, timeout: 240000 }); files.push(f);
  const st = await p.evaluate(() => window.__xini.stats());
  console.log('stop', i, st ? `calls ${st.calls} tris ${(st.triangles / 1e6).toFixed(2)}M progs ${st.programs}` : '');
}
await b.close();
if (+grey) execFileSync('python3', ['-c', `
from PIL import Image, ImageOps
for f in ${JSON.stringify(files)}:
    ImageOps.grayscale(Image.open(f)).save(f.replace('.png','-grey.png'))`]);
console.log('done', ((Date.now() - t0) / 1000).toFixed(0) + 's');
