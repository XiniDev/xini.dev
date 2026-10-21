// Record a flight between two stops as frames, then encode an animated WebP (and an MP4).
// node tools/flight.mjs <url> <out-base> <from> <to> [fps] [w] [h] [hold]
import { launch } from './browser.mjs';
import { execFileSync } from 'node:child_process';
import fs from 'node:fs';
const [, , url, outBase, from = '0', to = '1', fps = '15', w = '960', h = '600', hold = '0.6'] = process.argv;
const dir = outBase + '-frames'; fs.rmSync(dir, { recursive: true, force: true }); fs.mkdirSync(dir, { recursive: true });
const b = await launch();
const p = await b.newPage({ viewport: { width: +w, height: +h } });
p.on('pageerror', (e) => console.log('pageerror:', e.message));
await p.goto(url + (url.includes('?') ? '&' : '?') + 'skipintro&dpr=1', { waitUntil: 'load' });
await p.waitForFunction(() => window.__xini && window.__xini.ready, null, { timeout: 400000 });
await p.evaluate(() => { window.__xini.world.frozen = 0; });
if (+from) { await p.evaluate((s) => window.__xini.goto(s), +from); await p.evaluate(() => window.__xini.advance(5)); }
await p.waitForTimeout(800);
const dt = 1 / +fps;
let n = 0;
const snap = async () => { await p.waitForTimeout(60); await p.screenshot({ path: `${dir}/f${String(n++).padStart(4, '0')}.png`, timeout: 240000 }); };
for (let k = 0; k < +hold * +fps; k++) { await p.evaluate((d) => window.__xini.advance(d), dt); await snap(); }
await p.evaluate((s) => window.__xini.goto(s), +to);
const dur = await p.evaluate(() => window.__xini.world.rig.flight ? window.__xini.world.rig.flight.dur : 2);
for (let t = 0; t < dur + +hold + 0.6; t += dt) { await p.evaluate((d) => window.__xini.advance(d), dt); await snap(); }
await b.close();
execFileSync('ffmpeg', ['-y', '-loglevel', 'error', '-framerate', fps, '-i', `${dir}/f%04d.png`, '-vf', `scale=${w}:-1:flags=lanczos`, '-loop', '0', '-quality', '72', '-compression_level', '6', `${outBase}.webp`]);
execFileSync('ffmpeg', ['-y', '-loglevel', 'error', '-framerate', fps, '-i', `${dir}/f%04d.png`, '-c:v', 'libx264', '-pix_fmt', 'yuv420p', '-crf', '20', `${outBase}.mp4`]);
console.log('frames', n, 'saved', `${outBase}.webp`, `${outBase}.mp4`);
