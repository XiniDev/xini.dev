// Quick look at a world: load, optionally go to a stop, settle, screenshot. Prints console errors.
// node tools/look.mjs <url> <out.png> [stop] [w] [h] [settle]
import { launch } from './browser.mjs';
const [, , url, out, stop = '', w = '1440', h = '900', settle = '3.6'] = process.argv;
const b = await launch();
const p = await b.newPage({ viewport: { width: +w, height: +h }, isMobile: +w < 700, hasTouch: +w < 700 });
p.on('pageerror', (e) => console.log('pageerror:', e.message));
p.on('console', (m) => { if (m.type() === 'error' || m.type() === 'warning') console.log(m.type(), m.text().slice(0, 400)); });
await p.goto(url + (url.includes('?') ? '&' : '?') + 'skipintro&dpr=1', { waitUntil: 'load' });
await p.waitForFunction(() => window.__xini && window.__xini.ready, null, { timeout: 400000 });
if (stop !== '') { await p.evaluate((s) => window.__xini.goto(isNaN(+s) ? s : +s), stop); await p.evaluate((s) => window.__xini.advance(s), +settle); }
await p.waitForTimeout(1500);
await p.evaluate(() => document.getAnimations().forEach((a) => { try { a.finish(); } catch (e) {} }));
await p.screenshot({ path: out, timeout: 240000 });
await b.close();
console.log('saved', out);
