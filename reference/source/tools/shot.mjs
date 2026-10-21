// Usage: node tools/shot.mjs <url-or-file> <out.png> [width] [height] [fullPage] [waitMs]
import { launch } from './browser.mjs';
import { pathToFileURL } from 'node:url';
import { resolve } from 'node:path';
const [, , target, out, w = '1400', h = '900', full = '0', wait = '300'] = process.argv;
const url = /^https?:|^file:/.test(target) ? target : pathToFileURL(resolve(target)).href;
const b = await launch();
const p = await b.newPage({ viewport: { width: +w, height: +h }, deviceScaleFactor: 1 });
p.on('console', m => { if (m.type() === 'error') console.log('console.error:', m.text()); });
p.on('pageerror', e => console.log('pageerror:', e.message));
await p.goto(url, { waitUntil: 'load' });
await p.waitForTimeout(+wait);
await p.screenshot({ path: out, fullPage: full === '1', timeout: 180000 });
await b.close();
console.log('saved', out);
