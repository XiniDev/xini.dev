import { expect, test } from '@playwright/test';
import { scrollThrough } from './helpers.ts';
import { consoleProblems } from './console-filter.ts';

test('H3 and test 1: no console errors or warnings on load or through a full scroll @engines', async ({ page }) => {
  const problems = consoleProblems(page);
  await page.goto('/');
  await page.waitForTimeout(2500);
  await scrollThrough(page);
  await page.waitForTimeout(500);
  expect(await problems()).toEqual([]);
});
