// Frames of the boot sequence and of the finale (the last stop back to the first), on a frozen clock.
// node tools/boot.mjs <url> <outDir> [w=960] [h=600] [bootTimes=...] [finaleFractions=...]
import { launch } from './browser.mjs';
import fs from 'node:fs';
const [, , url, outDir, w = '960', h = '600', bootArg = '0.08,0.3,0.6,0.95,1.2,1.45,1.7,1.93,2.1,2.6', finArg = '0.12,0.3,0.42,0.52,0.66,0.82,0.97'] = process.argv;
fs.mkdirSync(outDir, { recursive: true });
const b = await launch();
const finishAll = (p) => p.evaluate(() => { const W = window.__xini.world; if (!W.director.intro) W.director.cards?.update(W); document.getAnimations().forEach((a) => { try { a.finish(); } catch (e) {} }); });
const shoot = async (p, f) => { await p.waitForTimeout(700); await finishAll(p); await p.waitForTimeout(250); await finishAll(p); await p.screenshot({ path: f, timeout: 240000 }); console.log('saved', f); };
if (bootArg !== '-') {
  const p = await b.newPage({ viewport: { width: +w, height: +h } });
  p.on('pageerror', (e) => console.log('pageerror:', e.message));
  await p.goto(url + (url.includes('?') ? '&' : '?') + 'dpr=1', { waitUntil: 'load' });
  await p.waitForFunction(() => window.__xini && window.__xini.ready, null, { timeout: 400000 });
  await p.evaluate(() => { const W = window.__xini.world; W.frozen = 0; if (W.director.intro) W.director.intro.t = 0; });
  let prev = 0;
  for (const t of bootArg.split(',').map(Number)) {
    await p.evaluate((d) => { const n = Math.round(d / (1 / 60)); for (let i = 0; i < n; i++) window.__xini.world.tick(1 / 60); }, t - prev); prev = t;
    await shoot(p, `${outDir}/boot-${t.toFixed(2)}.png`);
  }
  await p.close();
}
if (finArg !== '-') {
  const p = await b.newPage({ viewport: { width: +w, height: +h } });
  p.on('pageerror', (e) => console.log('pageerror:', e.message));
  await p.goto(url + (url.includes('?') ? '&' : '?') + 'skipintro&dpr=1', { waitUntil: 'load' });
  await p.waitForFunction(() => window.__xini && window.__xini.ready, null, { timeout: 400000 });
  await p.evaluate(() => { const W = window.__xini.world; W.frozen = 0; window.__xini.goto(5); for (let i = 0; i < 600 && (W.rig.flying || i < 60); i++) W.tick(1 / 60); });
  await p.evaluate(() => { window.__xini.goto(0); });
  const dur = await p.evaluate(() => window.__xini.world.rig.flight?.dur ?? 5);
  let prev = 0;
  for (const x of finArg.split(',').map(Number)) {
    const t = x * dur;
    await p.evaluate((d) => { const n = Math.round(d / (1 / 60)); for (let i = 0; i < n; i++) window.__xini.world.tick(1 / 60); }, t - prev); prev = t;
    await shoot(p, `${outDir}/finale-${x.toFixed(2)}.png`);
  }
  await p.close();
}
await b.close();
