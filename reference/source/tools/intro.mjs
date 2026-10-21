// Capture the entrance and one flight of a world. node tools/intro.mjs <url> <outDir> [times...]
import { launch } from './browser.mjs';
import { execFileSync } from 'node:child_process';
import fs from 'node:fs';
const [, , url, outDir, ...rest] = process.argv;
const times = rest.length ? rest.map(Number) : [0.1, 0.6, 1.1, 1.6, 1.8, 2.4];
fs.mkdirSync(outDir, { recursive: true });
const b = await launch();
const p = await b.newPage({ viewport: { width: 1200, height: 750 } });
p.on('pageerror', (e) => console.log('pageerror:', e.message));
await p.goto(url + (url.includes('?') ? '&' : '?') + 'dpr=1', { waitUntil: 'load' });
await p.waitForFunction(() => window.__xini && window.__xini.ready, null, { timeout: 400000 });
await p.evaluate(() => { const W = window.__xini.world; W.frozen = 0; W.time = 0; });
const files = [];
let tPrev = 0;
for (const t of times) {
  await p.evaluate((d) => window.__xini.advance(d), t - tPrev); tPrev = t;
  await p.waitForTimeout(900);
  const f = `${outDir}/intro-${t.toFixed(2)}.png`; await p.screenshot({ path: f, timeout: 240000 }); files.push(f);
}
// one flight: arrival -> first stop, sampled mid-way
await p.evaluate(() => window.__xini.advance(1.0));
await p.evaluate(() => window.__xini.goto(1));
for (const k of [0.35, 0.6]) {
  await p.evaluate((d) => window.__xini.advance(d), k === 0.35 ? 0.9 : 0.6);
  await p.waitForTimeout(900);
  const f = `${outDir}/flight-${k}.png`; await p.screenshot({ path: f, timeout: 240000 }); files.push(f);
}
await b.close();
execFileSync('python3', ['-c', `
from PIL import Image
fs=${JSON.stringify(files)}
ims=[Image.open(f).resize((480,300)) for f in fs]
rows=(len(ims)+3)//4
W=Image.new('RGB',(4*486,rows*306),'white')
for i,im in enumerate(ims): W.paste(im,((i%4)*486,(i//4)*306))
W.save('${outDir}/sheet.png')`]);
console.log('sheet', `${outDir}/sheet.png`);
