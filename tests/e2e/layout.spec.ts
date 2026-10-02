import { expect, test } from '@playwright/test';
import { SPEC_SIZES } from './sizes.ts';

test.describe('layout at every §11 size', () => {
  test.beforeEach(() => {
    test.skip(!test.info().project.name.endsWith('-desktop'), 'iterates every size itself');
  });

  test('H4 and test 2: no horizontal overflow at any size', async ({ page }) => {
    for (const [width, height] of SPEC_SIZES) {
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

  test('H5 and DECISIONS 2.2: the finale and every beat fit inside the pinned screen', async ({ page }) => {
    for (const [width, height] of SPEC_SIZES) {
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
        return { pinHeight: pin.clientHeight, blocks };
      });
      for (const b of fit.blocks) {
        expect(b.bottom, `${width}×${height} ${b.name} bottom`).toBeLessThanOrEqual(fit.pinHeight);
        expect(b.top, `${width}×${height} ${b.name} top`).toBeGreaterThanOrEqual(0);
      }
    }
  });
});
