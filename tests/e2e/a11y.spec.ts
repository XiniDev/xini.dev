import AxeBuilder from '@axe-core/playwright';
import { expect, test, type Page } from '@playwright/test';
import { blockStage } from './helpers.ts';
import { isDesktopProject, jumpTo, opacities, settle, stageState, waitForStage } from './hook.ts';

async function seriousViolations(page: Page) {
  const results = await new AxeBuilder({ page }).withTags(['wcag2a', 'wcag2aa', 'wcag21a', 'wcag21aa', 'wcag22aa', 'best-practice']).analyze();
  return results.violations
    .filter((v) => v.impact === 'serious' || v.impact === 'critical')
    .map((v) => `${v.id}: ${v.nodes.map((n) => n.target.join(' ')).join(', ')}`);
}

test.describe('G1: axe-core finds no serious or critical issues', () => {
  test('default mode, at the top and at the finale', async ({ page }) => {
    await page.goto('/');
    await waitForStage(page);
    expect(await seriousViolations(page)).toEqual([]);
    await jumpTo(page, 6.4);
    expect(await seriousViolations(page)).toEqual([]);
  });

  test('reduced-motion mode', async ({ browser, viewport }) => {
    const context = await browser.newContext({ reducedMotion: 'reduce', viewport });
    const page = await context.newPage();
    await page.goto('/');
    await waitForStage(page);
    expect(await seriousViolations(page)).toEqual([]);
    await context.close();
  });

  test('no-WebGL mode', async ({ page }) => {
    await blockStage(page);
    await page.goto('/');
    await expect(page.locator('html')).toHaveClass(/no-gl/);
    expect(await seriousViolations(page)).toEqual([]);
  });

  test('the 404 page', async ({ page }) => {
    await page.goto('/missing');
    expect(await seriousViolations(page)).toEqual([]);
  });
});

test.describe('G2 and test 7: keyboard', () => {
  test.beforeEach(({ browserName }, info) => {
    test.skip(browserName === 'webkit', "WebKit's Tab key skips links, like Safari's default");
    test.skip(info.project.name.endsWith('-tablet'), 'phone and desktop cover both nav layouts');
  });

  test('Tab reaches every link and button with a visible focus ring, and tabbing into the finale jumps to it', async ({ page }) => {
    await page.goto('/');
    await waitForStage(page);
    const expected = await page.evaluate(() =>
      [...document.querySelectorAll<HTMLElement>('a[href], button, summary')].flatMap((el, i) => {
        el.dataset.k = String(i);
        return el.getClientRects().length > 0 ? [`${i}: ${el.outerHTML.slice(0, 60)}`] : [];
      }),
    );
    const reached: string[] = [];
    let jumpedForVoe = false;
    for (let i = 0; i < 120; i++) {
      await page.keyboard.press('Tab');
      const focus = await page.evaluate(() => {
        const el = document.activeElement as HTMLElement | null;
        if (!el || el === document.body) return null;
        const s = getComputedStyle(el);
        return {
          html: `${el.dataset.k}: ${el.outerHTML.slice(0, 60)}`,
          tag: el.tagName,
          text: el.textContent?.trim() ?? '',
          outline: `${s.outlineStyle} ${s.outlineWidth} ${s.outlineColor}`,
          offset: s.outlineOffset,
          focusVisible: el.matches(':focus-visible'),
        };
      });
      if (!focus) break;
      if (reached.some((r) => r.split(':')[0] === focus.html.split(':')[0])) break;
      reached.push(focus.html);
      expect(focus.focusVisible, focus.html).toBe(true);
      expect(focus.outline, focus.html).toBe('solid 2px rgb(61, 255, 143)');
      expect(['3px', '4px'], focus.html).toContain(focus.offset);
      if (focus.text.startsWith('voetutor.com')) {
        await settle(page);
        const s = await stageState(page);
        jumpedForVoe = s.time >= 6.0;
        expect((await opacities(page)).cards).toBe(1);
      }
      if (focus.tag === 'SUMMARY') await page.keyboard.press('Enter');
    }
    expect(jumpedForVoe).toBe(true);
    const key = (s: string) => s.split(':')[0];
    const missing = expected.filter((html) => !reached.some((r) => key(r) === key(html)));
    expect(missing).toEqual([]);
  });

  test('the skip link is the first focusable element and moves focus to the finale', async ({ page }) => {
    await page.goto('/');
    await waitForStage(page);
    await page.keyboard.press('Tab');
    await expect(page.locator('.skip')).toBeFocused();
    expect(await page.locator('.skip').boundingBox()).not.toBeNull();
    await page.keyboard.press('Enter');
    await settle(page);
    await expect(page.locator('#work-heading')).toBeFocused();
    expect((await stageState(page)).time).toBeGreaterThanOrEqual(6.4);
  });
});

test.describe('G4 and test 5: reduced motion', () => {
  test.beforeEach(({}, info) => {
    test.skip(!isDesktopProject(info.project.name), 'behaviour is identical at every size');
  });

  test('§8.10: no fly-in, stepped morphs, no sliding, no time effects, no pointer, no cue, instant jumps, and no frames once scrolling stops', async ({ browser, viewport }) => {
    const context = await browser.newContext({ reducedMotion: 'reduce', viewport });
    const page = await context.newPage();
    await page.addInitScript(() => {
      const original = window.requestAnimationFrame.bind(window);
      (window as unknown as { __frames: number }).__frames = 0;
      window.requestAnimationFrame = (cb) =>
        original((t) => {
          (window as unknown as { __frames: number }).__frames++;
          cb(t);
        });
    });
    await page.goto('/');
    await waitForStage(page);
    const start = await stageState(page);
    expect(start).toMatchObject({ introPlayed: false, intro: 1, calm: 1 });
    expect(await page.$eval('.cue i', (el) => getComputedStyle(el, '::after').animationName)).toBe('none');
    expect(await page.$eval('.intro > .statement', (el) => getComputedStyle(el).animationName)).toBe('none');

    const samples = [0.45, 0.85, 1.07, 1.55, 3.05, 4.55, 5.95, 6.4];
    const expectedBeat = [0, -1, -1, 1, 2, 3, -1, 4];
    for (const [i, t] of samples.entries()) {
      const s = await jumpTo(page, t);
      expect(Number.isInteger(s.morph), `morph at ${t} is stepped: ${s.morph}`).toBe(true);
      const o = await opacities(page);
      const visible = o.beats.findIndex((b) => b === 1);
      expect(visible, `visible beat at ${t}`).toBe(expectedBeat[i]);
      const transforms = await page.$$eval('.beat', (els) => els.map((el) => getComputedStyle(el).transform));
      for (const tr of transforms) expect(['none', 'matrix(1, 0, 0, 1, 0, 0)']).toContain(tr);
      expect(s.pointerStrength).toBe(0);
    }

    await page.mouse.move(600, 400);
    await page.mouse.move(700, 450, { steps: 10 });
    await page.waitForTimeout(300);
    expect((await stageState(page)).pointerActive).toBe(0);

    const before = await page.evaluate(() => scrollY);
    await page.locator('.nav a', { hasText: 'About' }).click();
    await page.waitForTimeout(50);
    const after = await page.evaluate(() => scrollY);
    expect(after).not.toBe(before);
    expect((await stageState(page)).time).toBeGreaterThanOrEqual(1.5);

    await page.waitForTimeout(2500);
    const frames = await page.evaluate(async () => {
      const w = window as unknown as { __frames: number };
      const n = w.__frames;
      await new Promise((r) => setTimeout(r, 1000));
      return w.__frames - n;
    });
    expect(frames, 'animation frames in 1s after scrolling stops').toBe(0);
    await context.close();
  });
});

test.describe('G6: touch targets on phones are at least 44×44px', () => {
  test.beforeEach(({}, info) => {
    test.skip(!info.project.name.endsWith('-phone'), 'phones only');
  });

  test('every visible interactive element at its visible moment', async ({ page }) => {
    await page.goto('/');
    await waitForStage(page);
    const measure = () =>
      page.$$eval('a[href], button, summary', (els) =>
        els
          .filter((el) => {
            const s = getComputedStyle(el);
            return el.getClientRects().length > 0 && s.visibility !== 'hidden' && !el.closest('.featured') && !el.classList.contains('skip');
          })
          .map((el) => {
            const r = el.getBoundingClientRect();
            return { html: el.outerHTML.slice(0, 60), w: Math.round(r.width), h: Math.round(r.height) };
          }),
      );
    const small = (list: { html: string; w: number; h: number }[]) => list.filter((t) => t.w < 44 || t.h < 44);
    expect(small(await measure())).toEqual([]);

    await page.locator('.skip').focus();
    const skip = (await page.locator('.skip').boundingBox())!;
    expect(skip.width).toBeGreaterThanOrEqual(44);
    expect(skip.height).toBeGreaterThanOrEqual(44);

    await jumpTo(page, 6.4);
    const cards = await page.$$eval('.featured a', (els) => els.map((el) => ({ html: el.outerHTML.slice(0, 60), w: Math.round(el.getBoundingClientRect().width), h: Math.round(el.getBoundingClientRect().height) })));
    expect(cards).toHaveLength(3);
    expect(small(cards)).toEqual([]);
  });
});

test.describe('H2: WebGL context loss', () => {
  test.beforeEach(({}, info) => {
    test.skip(!isDesktopProject(info.project.name), 'once per browser');
  });

  test('switches to the fallback layout without errors, keeps the reading position, and recovers on restore', async ({ page }) => {
    const problems: string[] = [];
    page.on('pageerror', (e) => problems.push(e.message));
    page.on('console', (m) => {
      if (m.type() === 'error') problems.push(m.text());
    });
    await page.goto('/');
    await waitForStage(page);
    await jumpTo(page, 3.0);
    await page.evaluate(() => window.__lattice!.loseContext());
    await expect(page.locator('html')).toHaveClass(/no-gl/);
    const reading = await page.$eval('.beat[data-beat="2"]', (el) => {
      const r = el.getBoundingClientRect();
      return { top: r.top, bottom: r.bottom, opacity: getComputedStyle(el).opacity };
    });
    expect(reading.opacity).toBe('1');
    expect(reading.bottom).toBeGreaterThan(0);
    expect(reading.top).toBeLessThan(page.viewportSize()!.height);
    for (const sel of ['.beat', '.fcard']) {
      const op = await page.$$eval(sel, (els) => els.map((e) => getComputedStyle(e).opacity));
      expect(op.every((o) => o === '1')).toBe(true);
    }

    await page.evaluate(() => window.__lattice!.restoreContext());
    await expect(page.locator('html')).not.toHaveClass(/no-gl/, { timeout: 10_000 });
    await settle(page);
    expect((await stageState(page)).morph).toBe(2);
    expect(problems).toEqual([]);
  });
});
