// Same hero frame of a world in each of its palettes. node tools/palettes.mjs <world> <outDir> <pal1,pal2,...> [w] [h] [stop]
import { launch } from './browser.mjs';
import fs from 'node:fs';
const [, , world, outDir, list, w = '1200', h = '750', stop = '0', base = 'http://127.0.0.1:5173'] = process.argv;
fs.mkdirSync(outDir, { recursive: true });
const b = await launch();
for (const pal of list.split(',')) {
  const p = await b.newPage({ viewport: { width: +w, height: +h } });
  p.on('pageerror', (e) => console.log('pageerror:', e.message));
  await p.goto(`${base}/concepts/${world}/index.html?palette=${pal}&skipintro&dpr=1`, { waitUntil: 'load' });
  await p.waitForFunction(() => window.__xini && window.__xini.ready, null, { timeout: 400000 });
  if (+stop) { await p.evaluate((s) => window.__xini.goto(s), +stop); await p.evaluate(() => window.__xini.advance(4.2)); }
  await p.waitForTimeout(1500);
  await p.evaluate(() => { document.querySelector('.title')?.classList.remove('is-on'); document.getAnimations().forEach((a) => { try { a.finish(); } catch (e) {} }); });
  await p.screenshot({ path: `${outDir}/${world}-${pal}.png`, timeout: 240000 });
  await p.close();
  console.log('saved', pal);
}
await b.close();
