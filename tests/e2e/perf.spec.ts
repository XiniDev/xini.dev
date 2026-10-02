import { expect, test } from '@playwright/test';
import { waitForStage } from './hook.ts';

test.describe('performance', () => {
  test.beforeEach(({}, info) => {
    test.skip(info.project.name.endsWith('-tablet'), 'phone and desktop cover both point counts');
  });

  test('F4: the stage chunk is requested only after First Contentful Paint', async ({ page }) => {
    await page.goto('/');
    await waitForStage(page);
    const timing = await page.evaluate(() => {
      const fcp = performance.getEntriesByName('first-contentful-paint')[0]?.startTime ?? NaN;
      const entry = document.querySelector<HTMLScriptElement>('script[type="module"][src]')!.src;
      const stage = performance
        .getEntriesByType('resource')
        .filter((e) => /\/_astro\/[^/]+\.js$/.test(e.name) && e.name !== entry)
        .map((e) => ({ name: e.name.replace(/^.*\/_astro\//, ''), start: e.startTime }));
      return { fcp, stage };
    });
    expect(Number.isFinite(timing.fcp)).toBe(true);
    expect(timing.stage.length).toBeGreaterThanOrEqual(4);
    for (const s of timing.stage) expect(s.start, `${s.name} starts after FCP (${timing.fcp.toFixed(0)} ms)`).toBeGreaterThan(timing.fcp);
    const html = await (await page.request.get('/')).text();
    expect(html.match(/<link[^>]+rel="modulepreload"[^>]*>/g) ?? []).toEqual([]);
  });

  test('F5: no main-thread task over 50 ms after first paint, including stage start-up @perf', async ({ page, browserName }) => {
    test.skip(browserName !== 'chromium', 'the Long Tasks API is Chromium-only');
    await page.addInitScript(() => {
      const w = window as unknown as { __long: { start: number; duration: number }[] };
      w.__long = [];
      new PerformanceObserver((list) => {
        for (const e of list.getEntries()) w.__long.push({ start: e.startTime, duration: e.duration });
      }).observe({ type: 'longtask', buffered: true });
    });
    await page.goto('/');
    await waitForStage(page);
    await page.waitForTimeout(1500);
    await page.evaluate(async () => {
      for (let y = 0; y <= document.documentElement.scrollHeight; y += 300) {
        scrollTo(0, y);
        await new Promise((r) => setTimeout(r, 30));
      }
    });
    await page.waitForTimeout(1500);
    const result = await page.evaluate(() => ({
      fcp: performance.getEntriesByName('first-contentful-paint')[0]?.startTime ?? 0,
      long: (window as unknown as { __long: { start: number; duration: number }[] }).__long,
    }));
    const after = result.long.filter((t) => t.start >= result.fcp);
    test.info().annotations.push({ type: 'long tasks', description: JSON.stringify(result.long) });
    expect(after, `tasks over 50 ms after FCP at ${result.fcp.toFixed(0)} ms`).toEqual([]);
  });
});
