// v5 #2: no ambient bed. The hum and fan-bed code is gone, and with sound on and no interaction the output
// stays below -70 dBFS for 5 s (the music bus muted, once there is one).
import { readFileSync } from 'node:fs';
import { launch, open, outputPeak } from './lib.mjs';

const src = ['src/shared/core/sfx.js', 'src/main.js'].map((f) => readFileSync(f, 'utf8')).join('\n');
const leftovers = ['ambient(', '.fan(', 'this.amb', '55.4'].filter((s) => src.includes(s));
console.log(`code: ${leftovers.length ? `still has ${leftovers.join(', ')}` : 'no hum or fan-bed code'}`);

const browser = await launch();
const { page, context } = await open(browser, { audio: true });
const box = await page.locator('.bar__sound').boundingBox();
await page.mouse.click(box.x + box.width / 2, box.y + box.height / 2);
await page.evaluate(() => { const b = window.__xini.sfx.musicBus; if (b) b.gain.value = 0; });
await page.mouse.move(box.x - 300, box.y + 300);
await page.waitForTimeout(3200); // the toggle's snap and the sting (slam at 2.2 s) have decayed
const peak = await outputPeak(page, 5);
const state = await page.evaluate(() => window.__audio.contexts[0]?.state);
await context.close(); await browser.close();
const ok = !leftovers.length && peak < -70 && state === 'running';
console.log(`output peak over 5 s with sound on: ${peak === -Infinity ? '-inf' : peak.toFixed(1)} dBFS (ctx ${state})  ${ok ? 'PASS' : 'FAIL'}`);
process.exit(ok ? 0 : 1);
