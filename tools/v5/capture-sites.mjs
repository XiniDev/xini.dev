// v5 #16: fresh screenshots of the client sites for the Memory screens. The screen's aspect (212:119, so a
// 1440x808 viewport), device pixel ratio 2, cookie banners declined, fonts loaded and load animations settled, in
// the light scheme a first visit gets (SCHEME=dark for a comparison).
//   node tools/v5/capture-sites.mjs <outDir>
import { mkdirSync } from 'node:fs';
import { chromium } from 'playwright';

const out = process.argv[2] || '.shots/v5-checks/16-sources';
mkdirSync(out, { recursive: true });
const SITES = [['saltancy', 'https://saltancy.com/'], ['voetutor', 'https://voetutor.com/']];
const DECLINE = /^(decline|reject|reject all|deny|refuse|necessary only|only necessary|essential only|no,? thanks)$/i;

const browser = await chromium.launch({ headless: true });
for (const [name, url] of SITES) {
  const context = await browser.newContext({ viewport: { width: 1440, height: 808 }, deviceScaleFactor: 2, colorScheme: process.env.SCHEME || 'light', locale: 'en-GB' }); // (as a first visit sees it: the system default)
  const page = await context.newPage();
  await page.goto(url, { waitUntil: 'networkidle', timeout: 60000 });
  await page.evaluate(() => document.fonts.ready);
  // decline any cookie banner
  const buttons = await page.$$('button, a[role="button"], [role="button"]');
  let declined = null;
  for (const b of buttons) {
    const t = ((await b.innerText().catch(() => '')) || '').trim();
    if (DECLINE.test(t) && (await b.isVisible())) { await b.click(); declined = t; break; }
  }
  await page.waitForTimeout(4000); // load animations settle
  await page.screenshot({ path: `${out}/${name}.png` });
  console.log(`${name}: ${url} → ${out}/${name}.png (cookie banner: ${declined ? `declined via "${declined}"` : 'none found'})`);
  await context.close();
}
await browser.close();
