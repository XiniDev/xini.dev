// Contact sheet of every stop of a world. node tools/stops.mjs <url> <outDir> [w] [h] [settle]
import { launch } from './browser.mjs';
import { execFileSync } from 'node:child_process';
import fs from 'node:fs';
const [, , url, outDir, w = '1440', h = '900', settle = '4.2'] = process.argv;
fs.mkdirSync(outDir, { recursive: true });
const b = await launch();
const p = await b.newPage({ viewport: { width: +w, height: +h }, isMobile: +w < 700, hasTouch: +w < 700 });
p.on('pageerror', (e) => console.log('pageerror:', e.message));
p.on('console', (m) => { if (m.type() === 'error') console.log('error', m.text().slice(0, 300)); });
await p.goto(url + (url.includes('?') ? '&' : '?') + 'skipintro&dpr=1', { waitUntil: 'load' });
await p.waitForFunction(() => window.__xini && window.__xini.ready, null, { timeout: 400000 });
const files = [];
for (let i = 0; i < 6; i++) {
  if (i) { await p.evaluate((s) => window.__xini.goto(s), i); await p.evaluate((s) => window.__xini.advance(s), +settle); }
  await p.waitForTimeout(1700);
  const f = `${outDir}/${w}x${h}-${i}.png`;
  await p.evaluate(() => { document.querySelector('.title')?.classList.remove('is-on'); document.getAnimations().forEach((a) => { try { a.finish(); } catch (e) {} }); });
  await p.screenshot({ path: f, timeout: 240000 }); files.push(f);
}
await b.close();
const tw = +w > +h ? 720 : 300, th = Math.round(tw * (+h / +w)), cols = +w > +h ? 2 : 6;
execFileSync('python3', ['-c', `
from PIL import Image
fs=${JSON.stringify(files)}
ims=[Image.open(f).resize((${tw},${th})) for f in fs]
rows=(len(ims)+${cols}-1)//${cols}
W=Image.new('RGB',(${cols}*${tw}+(${cols}-1)*6,rows*${th}+(rows-1)*6),'white')
for i,im in enumerate(ims): W.paste(im,((i%${cols})*(${tw}+6),(i//${cols})*(${th}+6)))
W.save('${outDir}/sheet-${w}x${h}.png')`]);
console.log('sheet', `${outDir}/sheet-${w}x${h}.png`);
