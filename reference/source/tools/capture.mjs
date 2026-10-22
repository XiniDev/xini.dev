// Capture a concept at several viewports and sections.
// node tools/capture.mjs <url> <outDir> [--sizes 1440x900,390x844] [--secs 0,1,2] [--sim 2.2] [--wait 900] [--projects 0,1,2]
import { launch } from './browser.mjs';
import fs from 'node:fs';
const [, , url, outDir, ...rest] = process.argv;
const opt = { sizes: '1440x900,390x844', secs: '0,1,2,3,4,5', sim: '2.4', wait: '900', projects: '', intro: '' };
for (let i = 0; i < rest.length; i += 2) opt[rest[i].replace(/^--/, '')] = rest[i + 1];
fs.mkdirSync(outDir, { recursive: true });
const b = await launch();
for (const sz of opt.sizes.split(',')) {
  const [w, h] = sz.split('x').map(Number);
  const mobile = w < 700;
  const p = await b.newPage({ viewport: { width: w, height: h }, deviceScaleFactor: 1, isMobile: mobile, hasTouch: mobile });
  p.on('pageerror', (e) => console.log('pageerror:', e.message));
  p.on('console', (m) => { if (m.type() === 'error' || m.type() === 'warning') console.log(m.type() + ':', m.text().slice(0, 300)); });
  const u = url + (url.includes('?') ? '&' : '?') + (opt.intro ? 't=0&' : 'skipintro&') + 'dpr=1';
  await p.goto(u, { waitUntil: 'load' });
  await p.waitForFunction(() => window.__xini && window.__xini.ready, null, { timeout: 60000 });
  await p.waitForTimeout(600);
  if (opt.intro) {
    for (const t of opt.intro.split(',').map(Number)) {
      await p.evaluate((t) => window.__xini.advanceTo(t), t);
      await p.waitForTimeout(700);
      await p.screenshot({ path: `${outDir}/${sz}-intro-${t.toFixed(2)}.png`, timeout: 180000 });
    }
  }
  for (const s of opt.secs.split(',').filter(Boolean).map(Number)) {
    await p.evaluate((s) => window.__xini.goto(s), s);
    await p.evaluate((sim) => window.__xini.advance(sim), +opt.sim);
    await p.waitForTimeout(+opt.wait);
    await p.screenshot({ path: `${outDir}/${sz}-s${s}.png`, timeout: 180000 });
    if (s === 4 && opt.projects) {
      for (const pi of opt.projects.split(',').map(Number)) {
        await p.evaluate((pi) => window.__xini.project(pi), pi);
        await p.evaluate(() => window.__xini.advance(1.2));
        await p.waitForTimeout(+opt.wait);
        await p.screenshot({ path: `${outDir}/${sz}-s4-p${pi}.png`, timeout: 180000 });
      }
    }
  }
  await p.close();
}
await b.close();
console.log('done');
