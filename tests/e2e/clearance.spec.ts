import { expect, test, type Page } from '@playwright/test';
import { TIMELINE } from '../../src/lattice/config.ts';
import { isDesktopProject, jumpTo, waitForStage } from './hook.ts';
import { SPEC_SIZES } from './sizes.ts';

type Rect = { x0: number; y0: number; x1: number; y1: number };

const CLEARANCE_PX = 8;
const NAV_GAP_TOLERANCE_PX = 2;
const BEAT_TARGETS = TIMELINE.jumpTargets.slice(0, 4);

const gap = (a: Rect, b: Rect) => Math.max(b.x0 - a.x1, a.x0 - b.x1, b.y0 - a.y1, a.y0 - b.y1);

function middleBox(xy: number[]): Rect {
  const xs = xy.filter((_, i) => i % 2 === 0).sort((a, b) => a - b);
  const ys = xy.filter((_, i) => i % 2 === 1).sort((a, b) => a - b);
  const at = (values: number[], p: number) => values[Math.round((values.length - 1) * p)]!;
  return { x0: at(xs, 0.02), x1: at(xs, 0.98), y0: at(ys, 0.02), y1: at(ys, 0.98) };
}

const atRest = (page: Page) =>
  page.evaluate(async () => {
    await document.fonts.ready;
    const finite = document.getAnimations().filter((a) => a.effect?.getTiming().iterations !== Infinity);
    await Promise.all(finite.map((a) => a.finished.catch(() => undefined)));
  });

const visibleCopy = (page: Page, beat: number) =>
  page.evaluate((index) => {
    const el = document.querySelectorAll<HTMLElement>('.beat')[index]!;
    const box = { x0: Infinity, y0: Infinity, x1: -Infinity, y1: -Infinity };
    const add = (r: DOMRect) => {
      if (!r.width || !r.height) return;
      box.x0 = Math.min(box.x0, r.left);
      box.y0 = Math.min(box.y0, r.top);
      box.x1 = Math.max(box.x1, r.right);
      box.y1 = Math.max(box.y1, r.bottom);
    };
    const range = document.createRange();
    const walker = document.createTreeWalker(el, NodeFilter.SHOW_TEXT | NodeFilter.SHOW_ELEMENT);
    for (let node = walker.nextNode(); node; node = walker.nextNode()) {
      if (node.nodeType === Node.TEXT_NODE) {
        if (!(node as Text).data.trim()) continue;
        range.selectNodeContents(node);
        [...range.getClientRects()].forEach(add);
      } else if (!node.firstChild) add((node as Element).getBoundingClientRect());
    }
    const rail = document.querySelector('.rail')!.getBoundingClientRect();
    return { copy: box, rail: { x0: rail.left, y0: rail.top, x1: rail.right, y1: rail.bottom } };
  }, beat);

test.describe('B3 and H5: forms stay clear of the copy and the rail', () => {
  test.beforeEach(() => {
    test.skip(!isDesktopProject(test.info().project.name), 'iterates every size itself');
  });

  for (const [width, height] of SPEC_SIZES) {
    test(`at ${width}×${height}, every beat's form is at least ${CLEARANCE_PX}px from its copy and the rail`, async ({ page }) => {
      await page.setViewportSize({ width, height });
      await page.goto('/');
      await waitForStage(page);
      await page.waitForFunction(() => window.__lattice!.state().intro === 1, null, { timeout: 15_000 });
      for (const [beat, t] of BEAT_TARGETS.entries()) {
        await jumpTo(page, t);
        await atRest(page);
        const form = middleBox(await page.evaluate(() => window.__lattice!.projectPoints()));
        const { copy, rail } = await visibleCopy(page, beat);
        const where = `${width}×${height} at ${t}`;
        expect(copy.x1 - copy.x0, `${where}: copy width`).toBeGreaterThan(0);
        expect(copy.y1 - copy.y0, `${where}: copy height`).toBeGreaterThan(0);
        expect(form.x1 - form.x0, `${where}: form width`).toBeGreaterThan(0);
        if (process.env.CLEARANCE_LOG) console.log(where, 'copy', gap(form, copy).toFixed(1), 'rail', gap(form, rail).toFixed(1), 'form', JSON.stringify(form));
        expect(gap(form, copy), `${where}: form to copy`).toBeGreaterThanOrEqual(CLEARANCE_PX);
        expect(gap(form, rail), `${where}: form to rail`).toBeGreaterThanOrEqual(CLEARANCE_PX);
      }
    });
  }

  test('the rail keeps one layout box whichever beat is active', async ({ page }) => {
    for (const [width, height] of SPEC_SIZES) {
      await page.setViewportSize({ width, height });
      await page.goto('/');
      await waitForStage(page);
      const boxes: number[][] = [];
      for (const t of BEAT_TARGETS) {
        await jumpTo(page, t);
        await atRest(page);
        boxes.push(await page.$eval('.rail', (rail) => Object.values(rail.getBoundingClientRect().toJSON()).slice(0, 4) as number[]));
      }
      for (const box of boxes.slice(1)) expect(box, `${width}×${height}`).toEqual(boxes[0]);
    }
  });

  test('the visible gaps between nav labels are equal at every size', async ({ page }) => {
    for (const [width, height] of SPEC_SIZES) {
      await page.setViewportSize({ width, height });
      await page.goto('/');
      await page.evaluate(() => document.fonts.ready);
      const labels = await page.$$eval('.nav a', (links) =>
        links
          .filter((a) => getComputedStyle(a).display !== 'none')
          .map((a) => {
            const text = [...a.childNodes].find((n) => n.nodeType === Node.TEXT_NODE && n.textContent!.trim())!;
            const range = document.createRange();
            range.selectNodeContents(text);
            const r = range.getBoundingClientRect();
            return { left: r.left, right: r.right };
          }),
      );
      const gaps = labels.slice(1).map((label, i) => label.left - labels[i]!.right);
      expect(gaps.length, `${width}×${height}`).toBeGreaterThan(0);
      expect(Math.max(...gaps) - Math.min(...gaps), `${width}×${height} gaps ${gaps.map((g) => g.toFixed(1))}`).toBeLessThanOrEqual(
        NAV_GAP_TOLERANCE_PX,
      );
    }
  });
});
