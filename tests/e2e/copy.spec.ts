import { expect, test, type Page } from '@playwright/test';
import { site } from '../../src/data/site.ts';
import { BANNED, NEVER_IN_BUILD, OLD_SITE_PHRASES, US_SPELLINGS } from './copy-data.ts';

function strings(value: unknown): string[] {
  if (typeof value === 'string') return [value];
  if (Array.isArray(value)) return value.flatMap(strings);
  if (value && typeof value === 'object') return Object.values(value).flatMap(strings);
  return [];
}

async function corpus(page: Page) {
  return page.evaluate(() => {
    const attrs = [...document.querySelectorAll('*')].flatMap((el) =>
      ['aria-label', 'content', 'alt', 'title'].map((a) => el.getAttribute(a) ?? ''),
    );
    return [document.title, document.body.innerText, ...attrs].join(' ').replace(/\s+/g, ' ');
  });
}

test.describe('A4 and A5: copy', () => {
  test.beforeEach(() => {
    test.skip(!test.info().project.name.endsWith('-desktop'), 'copy is identical at every size');
  });

  test('every string in site.ts appears word for word, and nothing from the old site or the banned list does', async ({ page }) => {
    await page.goto('/');
    const home = await corpus(page);
    await page.goto('/404');
    const lost = await corpus(page);
    const all = `${home} ${lost}`;
    const skip = new Set<string>([site.url, site.lang, site.saltancy, site.contact.github, site.contact.linkedin, site.contact.x, site.contact.githubUser, site.person.worksFor.url, site.newTab]);
    for (const text of strings(site)) {
      if (skip.has(text) || text.startsWith('http')) continue;
      if ([...strings(site.person), site.more.empty].includes(text)) continue;
      expect(all, `missing: ${text}`).toContain(text.trim());
    }
    for (const phrase of OLD_SITE_PHRASES) expect(all, phrase).not.toContain(phrase);
    for (const phrase of BANNED) expect(all.toLowerCase(), phrase).not.toContain(phrase);
  });

  test('the built pages never contain TODO, lorem, [confirm], [from audit] or §', async ({ request }) => {
    for (const path of ['/', '/404']) {
      const html = await (await request.get(path)).text();
      for (const marker of NEVER_IN_BUILD) {
        const found = marker === 'lorem' ? html.toLowerCase().includes(marker) : html.includes(marker);
        expect(found, `${path} contains ${marker}`).toBe(false);
      }
    }
  });

  test('UK English spelling throughout', async ({ page }) => {
    for (const path of ['/', '/404']) {
      await page.goto(path);
      const words = (await corpus(page)).split(/[^\p{L}-]+/u).filter((w) => US_SPELLINGS.some((r) => r.test(w)));
      expect(words, path).toEqual([]);
    }
  });
});
