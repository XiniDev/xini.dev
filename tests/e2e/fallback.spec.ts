import { expect, test, type Page } from '@playwright/test';
import { blockStage, visibleInFlow } from './helpers.ts';

async function expectFlowLayout(page: Page) {
  const beats = await visibleInFlow(page, '.beat');
  expect(beats).toHaveLength(5);
  const cards = await visibleInFlow(page, '.featured .fcard');
  expect(cards).toHaveLength(3);
  for (const block of [...beats, ...cards]) {
    expect(block.opacity, block.text).toBe(1);
    expect(block.visibility).toBe('visible');
    expect(block.height).toBeGreaterThan(0);
    expect(block.position).not.toBe('absolute');
  }
  for (let i = 1; i < beats.length; i++) expect(beats[i]!.top).toBeGreaterThan(beats[i - 1]!.top + beats[i - 1]!.height - 1);
  for (const hidden of ['.gl', '.rail', '.vignette']) await expect(page.locator(hidden)).toBeHidden();
  const stageHeight = await page.$eval('.stage', (el) => el.getBoundingClientRect().height);
  const contentHeight = await page.$eval('.beats', (el) => el.getBoundingClientRect().height);
  expect(stageHeight).toBeLessThanOrEqual(contentHeight + 1);
}

test.describe('H1 and test 6: readable without the stage', () => {
  test('with JavaScript off, all content reads in normal flow', async ({ browser, viewport }) => {
    const context = await browser.newContext({ javaScriptEnabled: false, viewport });
    const page = await context.newPage();
    await page.goto('/');
    await expectFlowLayout(page);
    await context.close();
  });

  test('with the stage chunk blocked, the page falls back to normal flow', async ({ page }) => {
    await blockStage(page);
    await page.goto('/');
    await expect(page.locator('html')).toHaveClass(/no-gl/, { timeout: 15_000 });
    await expectFlowLayout(page);
  });
});
