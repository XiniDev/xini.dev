import { expect, test } from '@playwright/test';
import sharp from 'sharp';
import { POINTER, TIMELINE } from '../../src/lattice/config.ts';
import { isDesktopProject, jumpTo, opacities, settle, stageState, waitForStage } from './hook.ts';

const near = (value: number, target: number, tolerance = 0.02) => Math.abs(value - target) <= tolerance;

test.describe('stage', () => {
  test('A1: the first screen shows the particle wordmark, the statement and the credentials line', async ({ page }, info) => {
    test.skip(info.project.name.endsWith('-tablet'), 'A1 is specified at 1440×900 and 390×844');
    await page.goto('/');
    await waitForStage(page);
    await page.waitForFunction(() => window.__lattice!.state().intro >= 0.999, null, { timeout: 15_000 });
    const viewport = page.viewportSize()!;
    for (const selector of ['.statement', '.creds']) {
      const box = await page.locator(selector).boundingBox();
      expect(box, selector).not.toBeNull();
      expect(box!.y).toBeGreaterThanOrEqual(0);
      expect(box!.y + box!.height).toBeLessThanOrEqual(viewport.height);
      expect(await page.locator(selector).evaluate((el) => Number(getComputedStyle(el).opacity))).toBe(1);
    }
    const statementTop = (await page.locator('.statement').boundingBox())!.y;
    const shot = await page.screenshot({ clip: { x: 0, y: 0, width: viewport.width, height: Math.floor(statementTop) } });
    const { data, info: raw } = await sharp(shot).raw().toBuffer({ resolveWithObject: true });
    let green = 0;
    for (let i = 0; i < data.length; i += raw.channels) if (data[i + 1]! > 90 && data[i + 1]! > data[i]! * 1.3) green++;
    expect(green / (raw.width * raw.height)).toBeGreaterThan(0.01);
    expect((await stageState(page)).morph).toBe(0);
  });

  test.describe('timeline', () => {
    test.beforeEach(({}, info) => {
      test.skip(!isDesktopProject(info.project.name), 'timeline maths is identical at every size');
    });

    test('C1 and C2: beats, morphs, lock and crossfade happen at the §8.3 times, and reverse exactly', async ({ page }) => {
      await page.goto('/');
      await waitForStage(page);
      const samples = [0.45, 0.85, 1.07, 1.55, 2.35, 2.57, 3.05, 3.85, 4.07, 4.55, 4.95, 5.35, 5.57, 5.95, 6.05, 6.4, 6.65];
      const forward: Record<string, unknown>[] = [];
      const positions: number[] = [];
      for (const t of samples) {
        const s = await jumpTo(page, t);
        const o = await opacities(page);
        positions.push(await page.evaluate(() => scrollY));
        forward.push({ t, morph: +s.morph.toFixed(3), lock: +s.lock.toFixed(3), fade: +s.fade.toFixed(3), beats: o.beats.map((b) => +b.toFixed(2)), cards: +o.cards.toFixed(2) });
      }
      const at = (t: number) => forward.find((f) => f.t === t) as { morph: number; lock: number; fade: number; beats: number[]; cards: number };
      expect(at(0.45)).toMatchObject({ morph: 0, beats: [1, 0, 0, 0, 0] });
      expect(at(0.85).beats[0]).toBe(0);
      expect(at(1.07).beats[1]).toBe(0);
      expect(at(1.55)).toMatchObject({ morph: 1, beats: [0, 1, 0, 0, 0] });
      expect(at(2.35).beats[1]).toBe(0);
      expect(at(2.57).beats[2]).toBe(0);
      expect(at(3.05)).toMatchObject({ morph: 2, beats: [0, 0, 1, 0, 0] });
      expect(at(3.85).beats[2]).toBe(0);
      expect(at(4.07).beats[3]).toBe(0);
      expect(at(4.55)).toMatchObject({ morph: 3, lock: 0, beats: [0, 0, 0, 1, 0] });
      expect(at(4.95)).toMatchObject({ morph: 3, lock: 0 });
      expect(at(5.35).beats[3]).toBe(0);
      expect(at(5.57).beats[4]).toBe(0);
      expect(at(5.95)).toMatchObject({ fade: 0, cards: 0 });
      expect(at(6.05)).toMatchObject({ morph: 4, lock: 1 });
      expect(at(6.4)).toMatchObject({ morph: 4, lock: 1, fade: 1, cards: 1, beats: [0, 0, 0, 0, 1] });
      expect(at(6.65)).toMatchObject({ fade: 1, cards: 1 });

      for (let i = samples.length - 1; i >= 0; i--) {
        const t = samples[i]!;
        await page.evaluate((y) => scrollTo({ top: y, behavior: 'instant' }), positions[i]!);
        await settle(page);
        const s = await stageState(page);
        const o = await opacities(page);
        expect({ t, morph: +s.morph.toFixed(3), lock: +s.lock.toFixed(3), fade: +s.fade.toFixed(3), beats: o.beats.map((b) => +b.toFixed(2)), cards: +o.cards.toFixed(2) }).toEqual(at(t));
      }
    });

    test('C3 and test 3: the rail marks the current beat, shows its label and jumps to its target', async ({ page }) => {
      await page.goto('/');
      await waitForStage(page);
      const buttons = page.locator('.rail button');
      for (let i = 0; i < 5; i++) {
        const target = TIMELINE.jumpTargets[i]!;
        if (i < 4) await buttons.nth(i).click();
        else await jumpTo(page, target);
        await settle(page);
        const s = await stageState(page);
        expect(near(s.time, target, 0.05), `rail ${i}: ${s.time}`).toBe(true);
        const o = await opacities(page);
        expect(o.beats.indexOf(Math.max(...o.beats)), `most visible copy at ${target}`).toBe(i);
        if (i < 4) {
          await expect(buttons.nth(i)).toHaveAttribute('aria-current', 'step');
          expect(await buttons.nth(i).locator('.lbl').evaluate((el) => Number(getComputedStyle(el).opacity))).toBeGreaterThan(0.99);
        }
      }
      await expect(page.locator('.rail')).toBeHidden();
    });

    test('C4: Work, About and the skip link jump to their targets, and Work leaves the cards fully visible', async ({ page, browserName }) => {
      await page.goto('/');
      await waitForStage(page);
      await page.locator('.nav a', { hasText: 'Work' }).click();
      await settle(page);
      expect(near((await stageState(page)).time, 6.4, 0.05)).toBe(true);
      const view = page.viewportSize()!;
      for (const card of await page.locator('.fcard').all()) {
        const b = (await card.boundingBox())!;
        expect(b.y).toBeGreaterThanOrEqual(0);
        expect(b.y + b.height).toBeLessThanOrEqual(view.height);
      }
      expect((await opacities(page)).cards).toBe(1);

      await page.locator('.nav a', { hasText: 'About' }).click();
      await settle(page);
      expect(near((await stageState(page)).time, 1.5, 0.05)).toBe(true);

      await page.goto('/');
      await waitForStage(page);
      if (browserName === 'webkit') await page.locator('.skip').focus();
      else await page.keyboard.press('Tab');
      await expect(page.locator('.skip')).toBeFocused();
      await page.keyboard.press('Enter');
      await settle(page);
      expect(near((await stageState(page)).time, 6.4, 0.05)).toBe(true);
      await expect(page.locator('#work-heading')).toBeFocused();
    });

    test('C7: the fly-in plays on a fresh load at the top and is skipped mid-page', async ({ page, context }) => {
      await page.goto('/');
      await waitForStage(page);
      const fresh = await stageState(page);
      expect(fresh.introPlayed).toBe(true);
      expect(fresh.intro).toBeLessThan(1);
      await page.waitForFunction(() => window.__lattice!.state().intro === 1, null, { timeout: 10_000 });

      const midPage = await context.newPage();
      await midPage.goto('/#about');
      await waitForStage(midPage);
      const mid = await stageState(midPage);
      expect(mid.introPlayed).toBe(false);
      expect(mid.intro).toBe(1);
    });

    test('C5 (automated part): pointer influence works on desktop, is off during lock and ignores touch', async ({ page }) => {
      await page.goto('/');
      await waitForStage(page);
      await jumpTo(page, 1.75);
      await page.mouse.move(700, 450);
      await page.mouse.move(760, 430, { steps: 8 });
      await page.waitForTimeout(600);
      expect((await stageState(page)).pointerStrength).toBeGreaterThan(0.5);

      await jumpTo(page, 6.65);
      await page.mouse.move(700, 400, { steps: 8 });
      await page.waitForTimeout(300);
      expect((await stageState(page)).pointerStrength).toBe(0);

      await jumpTo(page, 1.75);
      const decayed = POINTER.activeMs + 5 * POINTER.halfLifeMs + 1000;
      await page.waitForFunction(() => window.__lattice!.state().pointerActive < 0.05, null, { timeout: decayed });
      await page.evaluate(() => {
        for (let i = 0; i < 8; i++) window.dispatchEvent(new PointerEvent('pointermove', { pointerType: 'touch', clientX: 400 + i * 10, clientY: 400 }));
      });
      await page.waitForTimeout(500);
      expect((await stageState(page)).pointerActive).toBeLessThan(0.05);
    });
  });

  test.describe('frames and readout', () => {
    test.beforeEach(({}, info) => {
      test.skip(!isDesktopProject(info.project.name), 'run once per browser');
    });

    test('F7: no animation frames run while the stage is off screen or the tab is hidden', async ({ page }) => {
      await page.addInitScript(() => {
        const original = window.requestAnimationFrame.bind(window);
        (window as unknown as { __frames: number }).__frames = 0;
        window.requestAnimationFrame = (cb) =>
          original((t) => {
            (window as unknown as { __frames: number }).__frames++;
            cb(t);
          });
      });
      const framesOver = (ms: number) =>
        page.evaluate(async (wait) => {
          const w = window as unknown as { __frames: number };
          const before = w.__frames;
          await new Promise((r) => setTimeout(r, wait));
          return w.__frames - before;
        }, ms);
      await page.goto('/');
      await waitForStage(page);
      expect(await framesOver(500)).toBeGreaterThan(5);

      await page.evaluate(() => scrollTo(0, document.documentElement.scrollHeight));
      await page.waitForTimeout(2500);
      expect(await framesOver(1000)).toBe(0);

      await page.evaluate(() => scrollTo(0, 0));
      await page.waitForTimeout(500);
      expect(await framesOver(500)).toBeGreaterThan(5);
      await page.evaluate(() => {
        Object.defineProperty(document, 'hidden', { configurable: true, get: () => true });
        Object.defineProperty(document, 'visibilityState', { configurable: true, get: () => 'hidden' });
        document.dispatchEvent(new Event('visibilitychange'));
      });
      await page.waitForTimeout(2500);
      expect(await framesOver(1000)).toBe(0);
    });
  });
});

test.describe('F8: point counts and pixel-ratio caps', () => {
  test.beforeEach(({}, info) => {
    test.skip(!isDesktopProject(info.project.name), 'sets its own viewports');
  });

  const cases = [
    { name: 'desktop', viewport: { width: 1440, height: 900 }, scale: 2, cores: 8, text: '18,000 points', ratio: 1.5 },
    { name: 'low-power by width', viewport: { width: 390, height: 844 }, scale: 3, cores: 8, text: '9,000 points', ratio: 1.25 },
    { name: 'low-power by cores', viewport: { width: 1440, height: 900 }, scale: 2, cores: 4, text: '9,000 points', ratio: 1.25 },
  ];
  for (const c of cases) {
    test(`?hud readout, ${c.name}`, async ({ browser }) => {
      const context = await browser.newContext({ viewport: c.viewport, deviceScaleFactor: c.scale });
      const page = await context.newPage();
      await page.addInitScript((cores) => Object.defineProperty(navigator, 'hardwareConcurrency', { get: () => cores }), c.cores);
      await page.goto('/?hud');
      await waitForStage(page);
      const hud = page.locator('.hud');
      await expect(hud).toContainText(c.text);
      await expect(hud).toContainText(`pixel ratio ${c.ratio}`);
      await expect(hud).toHaveAttribute('aria-hidden', 'true');
      await context.close();
    });
  }

  test('no readout without ?hud', async ({ page }) => {
    await page.goto('/');
    await waitForStage(page);
    await expect(page.locator('.hud')).toHaveCount(0);
  });
});
