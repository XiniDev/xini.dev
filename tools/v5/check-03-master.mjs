// v5 #3: one connection to the speakers (the output gain after the master chain), and every cue reaches it
// through the effects bus and master.input. Proven at runtime: a cue played with the effects bus muted, or
// with master.input muted, is silent; played normally, it is heard.
import { readFileSync, readdirSync, statSync } from 'node:fs';
import { join } from 'node:path';
import { launch, open, outputPeak } from './lib.mjs';

const files = (d) => readdirSync(d).flatMap((f) => { const p = join(d, f); return statSync(p).isDirectory() ? files(p) : p.endsWith('.js') ? [p] : []; });
const hits = files('src').flatMap((f) => readFileSync(f, 'utf8').split('\n').map((l, i) => [f, i + 1, l]).filter(([, , l]) => l.includes('ctx.destination') || /\.destination\b/.test(l)));
console.log('code connections to the speakers:'); hits.forEach(([f, n, l]) => console.log(`  ${f}:${n}  ${l.trim()}`));

const browser = await launch();
const { page, context } = await open(browser, { audio: true });
const box = await page.locator('.bar__sound').boundingBox();
await page.mouse.click(box.x + box.width / 2, box.y + box.height / 2);
await page.evaluate(() => { const b = window.__xini.sfx.musicBus; if (b) b.gain.value = 0; });
await page.mouse.move(box.x - 300, box.y + 300);
await page.waitForTimeout(800);
const trial = async (mute) => {
  await page.evaluate((m) => {
    const s = window.__xini.sfx;
    s.sfxBus.gain.value = m === 'sfxBus' ? 0 : 1;
    s.chain.input.gain.value = m === 'master.input' ? 0 : 1;
    s.lastPlay = {}; s.play('slam');
  }, mute);
  return outputPeak(page, 0.6);
};
const normal = await trial(null), viaBus = await trial('sfxBus'), viaMaster = await trial('master.input');
const toDest = await page.evaluate(() => window.__audio.toDest);
await context.close(); await browser.close();
const f = (x) => (x === -Infinity ? '-inf' : x.toFixed(1));
const ok = hits.length === 1 && toDest === 1 && normal > -30 && viaBus === -Infinity && viaMaster === -Infinity;
console.log(`runtime connects to destination: ${toDest}`);
console.log(`slam peak: normal ${f(normal)} dBFS | effects bus muted ${f(viaBus)} | master.input muted ${f(viaMaster)}  ${ok ? 'PASS' : 'FAIL'}`);
process.exit(ok ? 0 : 1);
