import { expect, test } from '@playwright/test';
import { SPEC_SIZES } from './sizes.ts';
import { STAGE_CHUNK, scrollThrough } from './helpers.ts';
import { consoleProblems } from './console-filter.ts';

test.describe('production smoke tests (1, 2, 4, 6) @smoke', () => {
  test('test 1: no console errors or warnings on load or through a full scroll', async ({ page }) => {
    const problems = consoleProblems(page);
    await page.goto('/');
    await page.waitForTimeout(3000);
    await scrollThrough(page);
    await page.waitForTimeout(500);
    expect(await problems()).toEqual([]);
  });

  test('test 2: no horizontal overflow at any §11 size', async ({ page }, info) => {
    test.skip(!info.project.name.endsWith('-desktop'), 'iterates every size itself');
    for (const [width, height] of SPEC_SIZES) {
      await page.setViewportSize({ width, height });
      await page.goto('/');
      await page.waitForTimeout(300);
      for (const share of [0, 0.5, 1]) {
        const overflow = await page.evaluate(async (s) => {
          scrollTo(0, (document.documentElement.scrollHeight - innerHeight) * s);
          await new Promise((r) => setTimeout(r, 60));
          return document.documentElement.scrollWidth - innerWidth;
        }, share);
        expect(overflow, `${width}×${height} at ${share}`).toBeLessThanOrEqual(0);
      }
    }
  });

  test('test 4: the Work link brings the featured cards fully into view at full opacity', async ({ page }) => {
    await page.goto('/');
    await page.waitForFunction(() => !document.documentElement.classList.contains('pre') || document.documentElement.classList.contains('no-gl'), null, {
      timeout: 20_000,
    });
    await page.locator('.nav a', { hasText: 'Work' }).click();
    await page.waitForTimeout(3000);
    const view = page.viewportSize()!;
    for (const card of await page.locator('.fcard').all()) {
      const box = (await card.boundingBox())!;
      expect(box.y).toBeGreaterThanOrEqual(0);
      expect(box.y + box.height).toBeLessThanOrEqual(view.height);
    }
    expect(await page.$eval('.featured', (el) => getComputedStyle(el).opacity)).toBe('1');
  });

  test('test 6: with the stage chunk blocked, every beat and all three cards read in normal flow', async ({ page }) => {
    await page.route(STAGE_CHUNK, (route) => route.abort());
    await page.goto('/');
    await expect(page.locator('html')).toHaveClass(/no-gl/, { timeout: 20_000 });
    const blocks = await page.$$eval('.beat, .fcard', (els) => els.map((el) => ({ opacity: getComputedStyle(el).opacity, position: getComputedStyle(el).position, height: el.getBoundingClientRect().height })));
    expect(blocks).toHaveLength(8);
    for (const b of blocks) {
      expect(b.opacity).toBe('1');
      expect(b.position).not.toBe('absolute');
      expect(b.height).toBeGreaterThan(0);
    }
  });
});
