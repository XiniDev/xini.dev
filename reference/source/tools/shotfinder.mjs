// Render candidate camera shots of a concept section into a contact sheet.
// node tools/shotfinder.mjs <url> <section> <out.png> '<json array of {p:[..],t:[..],fov,roll}>' [w h]
import { launch } from './browser.mjs';
import { execFileSync } from 'node:child_process';
import fs from 'node:fs';
const [, , url, section, out, json, w = '1200', h = '750'] = process.argv;
const shots = JSON.parse(json);
const b = await launch();
const p = await b.newPage({ viewport: { width: +w, height: +h } });
p.on('pageerror', (e) => console.log('pageerror:', e.message));
await p.goto(url + (url.includes('?') ? '&' : '?') + 'skipintro&dpr=1', { waitUntil: 'load' });
await p.waitForFunction(() => window.__xini && window.__xini.ready, null, { timeout: 120000 });
await p.evaluate((s) => window.__xini.goto(s), section);
await p.evaluate(() => window.__xini.advance(2.5));
const files = [];
for (let i = 0; i < shots.length; i++) {
  await p.evaluate((s) => {
    const d = window.__xini.stage.director;
    d.tl.clear();
    d.cam.p.set(...s.p); d.cam.t.set(...s.t); d.cam.fov = s.fov ?? 40; d.cam.roll = s.roll ?? 0;
  }, shots[i]);
  await p.waitForTimeout(900);
  const f = out.replace('.png', `-${i}.png`);
  await p.screenshot({ path: f, timeout: 180000 });
  files.push(f);
}
await b.close();
const py = `
from PIL import Image, ImageDraw
fs=${JSON.stringify(files)}
ims=[Image.open(f).resize((600,375)) for f in fs]
cols=2; rows=(len(ims)+1)//2
W=Image.new('RGB',(cols*600,rows*375),'white')
for i,im in enumerate(ims):
  d=ImageDraw.Draw(im); d.rectangle((0,0,30,22),fill='black'); d.text((8,5),str(i),fill='white')
  W.paste(im,((i%cols)*600,(i//cols)*375))
W.save('${out}')
`;
execFileSync('python3', ['-c', py]);
console.log('saved', out);
