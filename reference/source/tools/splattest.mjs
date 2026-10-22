import { launch } from './browser.mjs';
const out = '/tmp/claude-0/-home-claude/f77cf654-e93e-598b-b6a8-dacc6629ae69/scratchpad/';
const b = await launch();
const p = await b.newPage({ viewport: { width: 1440, height: 900 } });
p.on('pageerror', (e) => console.log('pageerror:', e.message));
p.on('console', (m) => { if (m.type() === 'error') console.log('err', m.text().slice(0, 300)); });
await p.goto('http://127.0.0.1:5173/concepts/rooftop/index.html?skipintro&dpr=1', { waitUntil: 'load' });
await p.waitForFunction(() => window.__xini && window.__xini.ready, null, { timeout: 60000 });
await p.evaluate(() => window.__xini.goto(3));
await p.evaluate(() => window.__xini.advance(2.4));
await p.waitForTimeout(800);
for (const [x, y] of [[1000, 300], [1180, 420], [900, 560], [1250, 700]]) { await p.mouse.click(x, y); await p.evaluate(() => window.__xini.advance(0.8)); await p.waitForTimeout(150); }
await p.mouse.click(160, 820); await p.evaluate(() => window.__xini.advance(0.2));
await p.mouse.click(600, 140); await p.evaluate(() => window.__xini.advance(1.2));
await p.waitForTimeout(1500);
await p.screenshot({ path: out + 'splat.png', timeout: 180000 });
await b.close();
console.log('ok');
