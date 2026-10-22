// v5 #1: a real mouse click on the sound button toggles it and starts audio; the canvas never sees the click.
import { launch, open } from './lib.mjs';

const browser = await launch();
let fail = 0;
for (const size of ['desktop', 'phone']) {
  const { page, context } = await open(browser, { size, audio: true });
  await page.evaluate(() => {
    window.__clicks = [];
    document.addEventListener('click', (e) => window.__clicks.push(e.target.tagName.toLowerCase()), true);
  });
  const box = await page.locator('.bar__sound').boundingBox();
  const at = [box.x + box.width / 2, box.y + box.height / 2];
  const hit = await page.evaluate(([x, y]) => { const sb = document.querySelector('.bar__sound'); return sb.contains(document.elementFromPoint(x, y)); }, at);
  await page.mouse.click(...at);
  await page.waitForTimeout(600);
  const on = await page.evaluate(() => ({
    pressed: document.querySelector('.bar__sound').getAttribute('aria-pressed'),
    state: window.__audio.contexts[0]?.state ?? 'none',
    clicks: window.__clicks.slice(),
  }));
  await page.mouse.click(...at);
  await page.waitForTimeout(400);
  const off = await page.evaluate(() => document.querySelector('.bar__sound').getAttribute('aria-pressed'));
  const ok = hit && on.pressed === 'true' && on.state === 'running' && off === 'false' && !on.clicks.includes('canvas');
  if (!ok) fail++;
  console.log(`${size.padEnd(8)} hit=${hit} on: aria-pressed=${on.pressed} ctx=${on.state} click targets=${on.clicks.join(',')} | off: aria-pressed=${off}  ${ok ? 'PASS' : 'FAIL'}`);
  await context.close();
}
await browser.close();
process.exit(fail ? 1 : 0);
