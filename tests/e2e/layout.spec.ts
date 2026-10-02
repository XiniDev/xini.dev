import { expect, test } from '@playwright/test';
import { LANDSCAPE_PHONES, LAYOUT_SIZES } from './sizes.ts';

test.describe('layout at every §11 size', () => {
  test.beforeEach(() => {
    test.skip(!test.info().project.name.endsWith('-desktop'), 'iterates every size itself');
  });

  test('H4 and test 2: no horizontal overflow at any size', async ({ page }) => {
    for (const [width, height] of LAYOUT_SIZES) {
      await page.setViewportSize({ width, height });
      await page.goto('/');
      for (const at of [0, 0.5, 1]) {
        const overflow = await page.evaluate(async (share) => {
          scrollTo(0, (document.documentElement.scrollHeight - innerHeight) * share);
          await new Promise((r) => setTimeout(r, 50));
          return document.documentElement.scrollWidth - innerWidth;
        }, at);
        expect(overflow, `${width}×${height} at ${at}`).toBeLessThanOrEqual(0);
      }
    }
  });

  test('H5 and DECISIONS 2.2: the finale and every beat fit inside the pinned screen, below the top bar', async ({ page }) => {
    for (const [width, height] of LAYOUT_SIZES) {
      await page.setViewportSize({ width, height });
      await page.goto('/');
      await page.evaluate(() => document.fonts.ready);
      const fit = await page.evaluate(() => {
        const pin = document.querySelector<HTMLElement>('.pin')!;
        const offset = (el: HTMLElement) => {
          let top = 0;
          for (let node: HTMLElement | null = el; node && node !== pin; node = node.offsetParent as HTMLElement | null) top += node.offsetTop;
          return top;
        };
        const blocks = [...document.querySelectorAll<HTMLElement>('.beat:not(.outro), .finale')].map((el) => ({
          name: el.className,
          top: offset(el),
          bottom: offset(el) + el.offsetHeight,
        }));
        return { pinHeight: pin.clientHeight, bar: document.querySelector<HTMLElement>('.top')!.offsetHeight, blocks };
      });
      for (const b of fit.blocks) {
        expect(b.bottom, `${width}×${height} ${b.name} bottom`).toBeLessThanOrEqual(fit.pinHeight);
        expect(b.top, `${width}×${height} ${b.name} top`).toBeGreaterThanOrEqual(fit.bar);
      }
    }
  });

  test('DECISIONS 2.2: landscape phones drop the step number before the tags, and tighten only as a last resort', async ({ page }) => {
    for (const [width, height] of [[844, 390], ...LANDSCAPE_PHONES] as const) {
      await page.setViewportSize({ width, height });
      await page.goto('/');
      await page.evaluate(() => document.fonts.ready);
      const fit = await page.$eval('.finale', (el) => [...el.classList].filter((c) => c.startsWith('fit-')));
      if (fit.includes('fit-no-tags')) expect(fit, `${width}×${height}`).toContain('fit-no-step');
      if (width >= 667) expect(fit, `${width}×${height} keeps its tags`).not.toContain('fit-no-tags');
      if (fit.includes('fit-tight')) expect(fit, `${width}×${height}`).toContain('fit-no-tags');
    }
  });
});
