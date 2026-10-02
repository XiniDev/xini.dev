import { expect, test } from '@playwright/test';
import { projects } from '../../src/data/projects.ts';
import { listing } from '../../src/data/listing.ts';
import { forDisplay, merge, orderProjects, readSnapshot, updatedLabel } from '../../src/lib/github.ts';
import { site } from '../../src/data/site.ts';

test.describe('More on GitHub', () => {
  test.beforeEach(() => {
    test.skip(!test.info().project.name.endsWith('-desktop'), 'the list is identical at every size');
  });

  test('E1, E2 and E5: rows follow the merged, ordered snapshot and show name, description, language and date', async ({ page }) => {
    const snapshot = await readSnapshot('src/data/github-snapshot.json');
    expect(snapshot).toBeDefined();
    const { items } = merge(snapshot!.repos, projects, { hiddenRepos: listing.hiddenRepos });
    const expected = forDisplay(orderProjects(items, { now: new Date(), legacyMonths: listing.legacyMonths }), listing.recentMax);

    await page.goto('/');
    const read = (selector: string) =>
      page.$$eval(selector, (rows) =>
        rows.map((row) => ({
          name: row.querySelector('a')?.childNodes[0]?.textContent?.trim() ?? '',
          href: row.querySelector('a')?.getAttribute('href') ?? '',
          description: row.querySelector('.desc')?.textContent ?? null,
          language: row.querySelector('.lang')?.textContent ?? null,
          date: row.querySelector('time')?.textContent ?? null,
          datetime: row.querySelector('time')?.getAttribute('datetime') ?? null,
        })),
      );
    const recent = await read('.more > .more-inner > .rows > .row');
    const older = await read('.older .row');
    const shape = (list: typeof expected.recent) =>
      list.map((i) => ({ name: i.name, href: i.url, description: i.description, language: i.language ?? '', date: updatedLabel(i.date), datetime: i.date }));
    expect(recent).toEqual(shape(expected.recent));
    expect(older).toEqual(shape(expected.older));
    for (const row of [...recent, ...older]) expect(row.date).toMatch(/^Updated (Jan|Feb|Mar|Apr|May|Jun|Jul|Aug|Sep|Oct|Nov|Dec) \d{4}$/);

    const names = [...recent, ...older].map((r) => r.name);
    for (const p of projects.filter((p) => p.featured)) expect(names).not.toContain(p.name);
    expect(names).not.toContain('bitventory');
    await expect(page.locator('.older summary')).toHaveText(site.more.older(older.length));
    expect(await page.$eval('.older', (d) => (d as HTMLDetailsElement).open)).toBe(false);
  });
});
