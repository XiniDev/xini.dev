// Audition camera poses in a world. node tools/worldshots.mjs <url> <stop> <out.png> '<json [{p,t,fov,roll}]>' [w h]
import { launch } from './browser.mjs';
import { execFileSync } from 'node:child_process';
const [, , url, stop, out, json, w = '1200', h = '750'] = process.argv;
const shots = JSON.parse(json);
const b = await launch();
const p = await b.newPage({ viewport: { width: +w, height: +h } });
p.on('pageerror', (e) => console.log('pageerror:', e.message));
await p.goto(url + (url.includes('?') ? '&' : '?') + 'skipintro&dpr=1', { waitUntil: 'load' });
await p.waitForFunction(() => window.__xini && window.__xini.ready, null, { timeout: 400000 });
await p.evaluate((s) => window.__xini.goto(isNaN(+s) ? s : +s), stop);
await p.evaluate(() => window.__xini.advance(4.5));
const files = [];
for (let i = 0; i < shots.length; i++) {
  await p.evaluate((s) => {
    const W = window.__xini.world, r = W.rig;
    r.flight = null; r.pose.p.set(...s.p); r.pose.t.set(...s.t); r.pose.fov = s.fov ?? 50; r.pose.roll = s.roll ?? 0;
    r.offset.p.set(0, 0, 0); r.offset.t.set(0, 0, 0); r.offsetTarget.p.set(0, 0, 0); r.offsetTarget.t.set(0, 0, 0);
    W.tick(1 / 60); r.speedNow = 0; r.lastPos.copy(W.camera.position);
  }, shots[i]);
  await p.waitForTimeout(1200);
  const f = out.replace('.png', `-${i}.png`);
  await p.evaluate(() => document.getAnimations().forEach((a) => { try { a.finish(); } catch (e) {} }));
  await p.screenshot({ path: f, timeout: 240000 }); files.push(f);
}
await b.close();
execFileSync('python3', ['-c', `
from PIL import Image, ImageDraw
fs=${JSON.stringify(files)}
ims=[Image.open(f).resize((600,375)) for f in fs]
rows=(len(ims)+1)//2
W=Image.new('RGB',(1206,rows*381),'white')
for i,im in enumerate(ims):
  d=ImageDraw.Draw(im); d.rectangle((0,0,30,22),fill='black'); d.text((8,5),str(i),fill='white')
  W.paste(im,((i%2)*606,(i//2)*381))
W.save('${out}')`]);
console.log('saved', out);
