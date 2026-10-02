import { expect, test } from '@playwright/test';
import { site } from '../../src/data/site.ts';
import { featured } from '../../src/data/projects.ts';

const PROJECT_NAMES = ['Gloam', 'DBridger', 'VOETutor'];

test('A2: beats 01–03 never name a project', async ({ page }) => {
  await page.goto('/');
  const texts = await page.$$eval('.beat[data-beat="1"], .beat[data-beat="2"], .beat[data-beat="3"]', (els) =>
    els.map((e) => e.textContent ?? ''),
  );
  expect(texts).toHaveLength(3);
  for (const text of texts) for (const name of PROJECT_NAMES) expect(text).not.toContain(name);
});

test('A3: the finale shows exactly Gloam, DBridger and VOETutor in order with the §6.4 copy', async ({ page }) => {
  await page.goto('/');
  const cards = await page.$$eval('.featured .fcard', (els) =>
    els.map((el) => ({
      title: el.querySelector('h3')?.textContent?.trim(),
      summary: el.querySelector('.summary')?.textContent?.trim(),
      tags: el.querySelector('.tags')?.textContent?.trim(),
    })),
  );
  expect(cards.map((c) => c.title)).toEqual(PROJECT_NAMES);
  expect(cards).toEqual(featured.map((p) => ({ title: p.name, summary: p.summary, tags: p.tags.join(', ') })));
  await expect(page.locator('.finale h2')).toHaveText(site.finale.heading);
});

test('A6: Saltancy is linked from the nav and the footer, in a new tab with rel="noopener"', async ({ page }) => {
  await page.goto('/');
  for (const scope of ['.top nav', '.foot']) {
    const link = page.locator(`${scope} a[href="${site.saltancy}"]`);
    await expect(link).toHaveCount(1);
    await expect(link).toHaveAttribute('target', '_blank');
    expect((await link.getAttribute('rel'))?.split(/\s+/)).toContain('noopener');
    await expect(link).toContainText('Saltancy');
    await expect(link.locator('.sr-only')).toHaveText(site.newTab);
  }
});

test('B2: Archivo is self-hosted and beat headings render at width 125, weight 760', async ({ page }) => {
  const external: string[] = [];
  page.on('request', (r) => {
    if (!r.url().startsWith('http://127.0.0.1')) external.push(r.url());
  });
  await page.goto('/');
  await page.evaluate(() => document.fonts.ready);
  const style = await page.$eval('.beat[data-beat="1"] h2', (el) => {
    const s = getComputedStyle(el);
    return { stretch: s.fontStretch, weight: s.fontWeight, family: s.fontFamily };
  });
  expect(style.weight).toBe('760');
  expect(style.stretch).toBe('125%');
  expect(style.family.startsWith('Archivo')).toBe(true);
  const loaded = await page.evaluate(() =>
    [...document.fonts].filter((f) => f.family.replace(/"/g, '') === 'Archivo' && f.status === 'loaded').length,
  );
  expect(loaded).toBe(1);
  expect(await page.evaluate(() => document.fonts.check('760 20px Archivo'))).toBe(true);
  expect(external).toEqual([]);
});

test('I4: unknown URLs get the 404 page, in the site tokens and type, linking home', async ({ page }) => {
  const res = await page.goto('/no-such-page');
  expect(res?.status()).toBe(404);
  await expect(page.locator('h1')).toHaveText(site.notFound.heading);
  await expect(page.locator('main p').first()).toHaveText(site.notFound.body);
  await expect(page.locator('main a[href="/"]')).toHaveText(site.notFound.link);
  await expect(page.locator('canvas')).toHaveCount(0);
  const look = await page.evaluate(() => {
    const body = getComputedStyle(document.body);
    const h1 = getComputedStyle(document.querySelector('h1')!);
    return { bg: body.backgroundColor, family: h1.fontFamily, stretch: h1.fontStretch };
  });
  expect(look.bg).toBe('rgb(2, 8, 6)');
  expect(look.family.startsWith('Archivo')).toBe(true);
  expect(look.stretch).toBe('125%');
});
