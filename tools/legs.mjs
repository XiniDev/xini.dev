// Stills from inside every flight: for each leg, frames at a few fractions of its duration (frozen clock).
// node tools/legs.mjs <url> <outDir> [w=960] [h=600] [legs=0-1,1-2,...] [fractions=0.3,0.55,0.8]
import { launch } from './browser.mjs';
import fs from 'node:fs';
const [, , url, outDir, w = '960', h = '600', legArg = '0-1,1-2,2-3,3-4,4-5', fracArg = '0.3,0.55,0.8'] = process.argv;
fs.mkdirSync(outDir, { recursive: true });
const b = await launch();
const p = await b.newPage({ viewport: { width: +w, height: +h } });
p.on('pageerror', (e) => console.log('pageerror:', e.message));
await p.goto(url + (url.includes('?') ? '&' : '?') + 'skipintro&dpr=1', { waitUntil: 'load' });
await p.waitForFunction(() => window.__xini && window.__xini.ready, null, { timeout: 400000 });
await p.evaluate(() => { window.__xini.world.frozen = 0; });
const tick = (d) => p.evaluate((d) => { const n = Math.round(d * 60); for (let i = 0; i < n; i++) window.__xini.world.tick(1 / 60); }, d);
for (const leg of legArg.split(',')) {
  const [a, c] = leg.split('-').map(Number);
  // be at the start stop, settled
  await p.evaluate((a) => { const W = window.__xini.world; if (W.rig.index !== a) window.__xini.goto(a); }, a);
  await p.evaluate(() => { const W = window.__xini.world; for (let i = 0; i < 900 && W.rig.flying; i++) W.tick(1 / 60); for (let i = 0; i < 60; i++) W.tick(1 / 60); });
  await p.evaluate((c) => window.__xini.goto(c), c);
  const dur = await p.evaluate(() => window.__xini.world.rig.flight?.dur ?? 2);
  let prev = 0;
  for (const f of fracArg.split(',').map(Number)) {
    await tick(f * dur - prev); prev = f * dur;
    await p.waitForTimeout(600);
    await p.evaluate(() => document.getAnimations().forEach((x) => { try { x.finish(); } catch (e) {} }));
    const file = `${outDir}/leg-${a}-${c}-${f.toFixed(2)}.png`;
    await p.screenshot({ path: file, timeout: 240000 }); console.log('saved', file);
  }
}
await b.close();
