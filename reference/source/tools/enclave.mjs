// The enclave's locks frame by frame: locked where the visitor stands, then the unlock (frozen clock).
// node tools/enclave.mjs <url> <outDir> [w=1200] [h=750] [locks=cage,firewall,cipher] [times=-1,0.35,0.7,1.1,1.6,2.6]
// A time of -1 is the locked frame; the others are seconds after the unlock starts.
import { launch } from './browser.mjs';
import fs from 'node:fs';
const [, , url, outDir, w = '1200', h = '750', lockArg = 'cage,firewall,cipher', timeArg = '-1,0.35,0.7,1.1,1.6,2.6'] = process.argv;
fs.mkdirSync(outDir, { recursive: true });
const b = await launch();
for (const lock of lockArg.split(',')) {
  const p = await b.newPage({ viewport: { width: +w, height: +h } });
  p.on('pageerror', (e) => console.log('pageerror:', e.message));
  await p.goto(url + (url.includes('?') ? '&' : '?') + `skipintro&dpr=1&enclave=${lock}`, { waitUntil: 'load' });
  await p.waitForFunction(() => window.__xini && window.__xini.ready, null, { timeout: 400000 });
  await p.evaluate(() => { const W = window.__xini.world; W.frozen = 0; window.__xini.goto(3); for (let i = 0; i < 2000 && (W.rig.flying || i < 30); i++) W.tick(1 / 60); });
  // lock it again where the visitor stands and let it idle a while, then play the unlock from its start
  await p.evaluate(() => { const W = window.__xini.world; W.director.enc.lock(); for (let i = 0; i < 360; i++) W.tick(1 / 60); });
  let prev = null;
  for (const tt of timeArg.split(',').map(Number)) {
    if (tt >= 0 && prev === null) { await p.evaluate(() => { const W = window.__xini.world; W.director.enc.unlock(W.time); }); prev = 0; }
    if (tt >= 0) { await p.evaluate((d) => { const W = window.__xini.world; for (let i = 0; i < Math.round(d * 60); i++) W.tick(1 / 60); }, tt - prev); prev = tt; }
    await p.waitForTimeout(500);
    await p.evaluate(() => { document.querySelector('.title')?.classList.remove('is-on'); document.getAnimations().forEach((a) => { try { a.finish(); } catch (e) {} }); });
    const f = `${outDir}/${lock}-${tt < 0 ? 'locked' : tt.toFixed(2)}.png`;
    await p.screenshot({ path: f, timeout: 240000 }); console.log('saved', f);
  }
  await p.close();
}
await b.close();
