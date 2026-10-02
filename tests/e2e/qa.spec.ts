import { mkdirSync } from 'node:fs';
import { join } from 'node:path';
import { expect, test } from '@playwright/test';
import { jumpTo, waitForStage } from './hook.ts';

const OUT = process.env.QA_OUT ?? join('test-results', 'qa');
const TIMES = [0, 1.75, 3.25, 4.75, 6.05, 6.65];
const SIZES = [
  [390, 844],
  [768, 1024],
  [1440, 900],
  [844, 390],
] as const;

test.describe('test 9: QA screenshots @qa', () => {
  test.beforeEach(({ browserName }, info) => {
    test.skip(browserName !== 'chromium' || !info.project.name.endsWith('-desktop'), 'one browser captures every size');
  });

  for (const [width, height] of SIZES) {
    test(`${width}×${height} at times ${TIMES.join(', ')}`, async ({ page }) => {
      mkdirSync(OUT, { recursive: true });
      await page.setViewportSize({ width, height });
      await page.goto('/');
      await waitForStage(page);
      await page.waitForFunction(() => window.__lattice!.state().intro === 1, null, { timeout: 15_000 });
      await page.evaluate(() => document.fonts.ready);
      for (const t of TIMES) {
        await jumpTo(page, t);
        await page.waitForTimeout(250);
        const path = join(OUT, `${width}x${height}-t${t.toFixed(2)}.png`);
        await page.screenshot({ path });
        expect(path).toBeTruthy();
      }
    });
  }
});
