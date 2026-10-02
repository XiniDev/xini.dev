import { expect, test } from '@playwright/test';
import sharp from 'sharp';
import { site } from '../../src/data/site.ts';
import { stageState, waitForStage } from './hook.ts';

test.describe('SEO and sharing', () => {
  test.beforeEach(({}, info) => {
    test.skip(!info.project.name.endsWith('-desktop'), 'markup and files are the same at every size');
  });

  test('I1: title, description, canonical, Open Graph, Twitter and JSON-LD are present and valid', async ({ page }) => {
    await page.goto('/');
    const meta = await page.evaluate(() => {
      const get = (sel: string) => document.querySelector(sel)?.getAttribute('content') ?? null;
      return {
        title: document.title,
        lang: document.documentElement.lang,
        description: get('meta[name="description"]'),
        canonical: document.querySelector('link[rel="canonical"]')?.getAttribute('href'),
        og: Object.fromEntries([...document.querySelectorAll('meta[property^="og:"]')].map((m) => [m.getAttribute('property'), m.getAttribute('content')])),
        twitter: Object.fromEntries([...document.querySelectorAll('meta[name^="twitter:"]')].map((m) => [m.getAttribute('name'), m.getAttribute('content')])),
        jsonld: [...document.querySelectorAll('script[type="application/ld+json"]')].map((s) => s.textContent ?? ''),
      };
    });
    expect(meta.title).toBe(site.title);
    expect(meta.lang).toBe('en-GB');
    expect(meta.description).toBe(site.description);
    expect(meta.canonical).toBe('https://xini.dev/');
    expect(meta.og).toMatchObject({
      'og:type': 'website',
      'og:title': site.title,
      'og:description': site.description,
      'og:url': 'https://xini.dev/',
      'og:image': 'https://xini.dev/og.png',
      'og:image:width': '1200',
      'og:image:height': '630',
      'og:locale': 'en_GB',
    });
    expect(meta.og['og:image:alt']).toBeTruthy();
    expect(meta.twitter).toMatchObject({
      'twitter:card': 'summary_large_image',
      'twitter:title': site.title,
      'twitter:description': site.description,
      'twitter:image': 'https://xini.dev/og.png',
    });
    expect(meta.jsonld).toHaveLength(1);
    const person = JSON.parse(meta.jsonld[0]!);
    expect(person).toEqual({
      '@context': 'https://schema.org',
      '@type': 'Person',
      name: 'Xini',
      url: 'https://xini.dev',
      jobTitle: 'Systems engineer',
      alumniOf: [
        { '@type': 'CollegeOrUniversity', name: 'University of Warwick' },
        { '@type': 'CollegeOrUniversity', name: 'University of St Andrews' },
      ],
      worksFor: { '@type': 'Organization', name: 'Saltancy', url: 'https://saltancy.com' },
      sameAs: ['https://github.com/XiniDev', 'https://www.linkedin.com/in/xinidev'],
    });
    for (const url of [person.url, person.worksFor.url, ...person.sameAs, meta.og['og:image']]) expect(String(url)).toMatch(/^https:\/\/[^\s]+$/);
  });

  test('I2: og.png is 1200×630 and shows the particle wordmark', async ({ request }) => {
    const res = await request.get('/og.png');
    expect(res.status()).toBe(200);
    expect(res.headers()['content-type']).toContain('image/png');
    const png = await res.body();
    const { width, height } = await sharp(png).metadata();
    expect([width, height]).toEqual([1200, 630]);
    const { data, info } = await sharp(png).raw().toBuffer({ resolveWithObject: true });
    let green = 0;
    for (let i = 0; i < data.length; i += info.channels) if (data[i + 1]! > 90 && data[i + 1]! > data[i]! * 1.3) green++;
    expect(green / (width! * height!)).toBeGreaterThan(0.01);
  });

  test('I3: sitemap.xml and robots.txt exist, and retired URLs get their decided responses', async ({ request }) => {
    const sitemap = await request.get('/sitemap.xml');
    expect(sitemap.status()).toBe(200);
    const xml = await sitemap.text();
    expect(xml).toContain('<loc>https://xini.dev/</loc>');
    expect(xml).toMatch(/<lastmod>\d{4}-\d{2}-\d{2}<\/lastmod>/);

    const robots = await request.get('/robots.txt');
    expect(robots.status()).toBe(200);
    expect(await robots.text()).toContain('Sitemap: https://xini.dev/sitemap.xml');

    const icon = await request.get('/icon.svg', { maxRedirects: 0 });
    expect(icon.status()).toBe(301);
    expect(icon.headers()['location']).toBe('/favicon.svg');
    for (const kept of ['/', '/favicon.ico', '/favicon.svg']) expect((await request.get(kept)).status(), kept).toBe(200);
    for (const gone of ['/index.txt', '/__next._full.txt', '/_not-found.html', '/_next/static/chunks/0r8nt2o8muejo.js', '/projects/gloam.webp', '/assets/index-DQ8MWBPx.js']) {
      expect((await request.get(gone, { maxRedirects: 0 })).status(), gone).toBe(404);
    }
  });

  test('I3: legacy in-page fragments land on their sections', async ({ context }) => {
    for (const [hash, time] of [
      ['#projects', 6.4],
      ['#work', 6.4],
      ['#about', 1.5],
      ['#home', 0],
    ] as const) {
      const page = await context.newPage();
      await page.goto(`/${hash}`);
      await waitForStage(page);
      await page.waitForTimeout(600);
      const t = (await stageState(page)).time;
      expect(Math.abs(t - time), `${hash} → ${t}`).toBeLessThan(0.05);
      await page.close();
    }
    const page = await context.newPage();
    await page.goto('/#contact');
    await page.waitForTimeout(600);
    const footer = (await page.locator('#contact').boundingBox())!;
    expect(footer.y).toBeLessThan(page.viewportSize()!.height);
  });
});
