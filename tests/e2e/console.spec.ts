import { expect, test } from '@playwright/test';
import { scrollThrough } from './helpers.ts';

test('H3 and test 1: no console errors or warnings on load or through a full scroll @engines', async ({ page }) => {
  const problems: string[] = [];
  page.on('console', (m) => {
    if (m.type() === 'error' || m.type() === 'warning') problems.push(`${m.type()}: ${m.text()}`);
  });
  page.on('pageerror', (e) => problems.push(`pageerror: ${e.message}`));
  await page.goto('/');
  await page.waitForTimeout(2500);
  await scrollThrough(page);
  await page.waitForTimeout(500);
  expect(problems).toEqual([]);
});
