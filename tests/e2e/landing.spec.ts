import { expect, test, type Page } from '@playwright/test';
import { jumpTo, stageState, waitForStage, type Projection } from './hook.ts';

type Box = Projection['lines'][number];

const KIND = { cardEdge: 0, thumbEdge: 1, thumbFill: 2, text: 3 };

function borderDistance(x: number, y: number, r: Box) {
  const inside = x >= r.left && x <= r.right && y >= r.top && y <= r.bottom;
  if (inside) return Math.min(x - r.left, r.right - x, y - r.top, r.bottom - y);
  const dx = Math.max(r.left - x, 0, x - r.right);
  const dy = Math.max(r.top - y, 0, y - r.bottom);
  return Math.hypot(dx, dy);
}

function check(p: Projection) {
  const report = { cards: [] as { card: number; edges: number; within: number }[], lines: [] as { line: number; points: number; outside: number }[] };
  p.cards.forEach((c, index) => {
    let edges = 0;
    let within = 0;
    for (let i = 0; i < p.kind.length; i++) {
      if ((p.kind[i] !== KIND.cardEdge && p.kind[i] !== KIND.thumbEdge) || p.owner[i] !== index) continue;
      edges++;
      const x = p.xy[i * 2]!;
      const y = p.xy[i * 2 + 1]!;
      const d = Math.min(borderDistance(x, y, c.card), c.thumb ? borderDistance(x, y, c.thumb) : Infinity);
      if (d <= 2) within++;
    }
    report.cards.push({ card: index, edges, within: within / edges });
  });
  p.lines.forEach((line, index) => {
    let points = 0;
    let outside = 0;
    for (let i = 0; i < p.kind.length; i++) {
      if (p.kind[i] !== KIND.text || p.owner[i] !== index) continue;
      points++;
      const x = p.xy[i * 2]!;
      const y = p.xy[i * 2 + 1]!;
      if (x < line.left - 3 || x > line.right + 3 || y < line.top - 3 || y > line.bottom + 3) outside++;
    }
    report.lines.push({ line: index, points, outside });
  });
  return report;
}

async function landed(page: Page) {
  await jumpTo(page, 6.65);
  await page.waitForFunction(() => document.fonts.status === 'loaded');
  await page.waitForTimeout(300);
  return page.evaluate(() => window.__lattice!.projectLanding());
}

function expectAligned(p: Projection, label: string) {
  expect(p.builtLines, `${label}: landing built from the current lines`).toBe(p.lines.length);
  const report = check(p);
  expect(report.cards).toHaveLength(3);
  for (const c of report.cards) {
    expect(c.edges, `${label} card ${c.card} has edge points`).toBeGreaterThan(100);
    expect(c.within, `${label} card ${c.card}: share of edge points within 2px`).toBeGreaterThanOrEqual(0.95);
  }
  expect(report.lines.length).toBeGreaterThan(9);
  for (const l of report.lines) expect(l.outside, `${label} line ${l.line} (${l.points} points)`).toBe(0);
  return report;
}

test.describe('landing alignment (test 8)', () => {
  test.beforeEach(({}, info) => {
    test.skip(info.project.name.endsWith('-tablet'), 'test 8 runs at 1440×900 and 390×844');
  });

  test('D1 and D2: edge points within 2px of the borders, text points inside their lines', async ({ page }) => {
    await page.goto('/');
    await waitForStage(page);
    const report = expectAligned(await landed(page), `${page.viewportSize()!.width}×${page.viewportSize()!.height}`);
    test.info().annotations.push({ type: 'alignment', description: JSON.stringify(report.cards) });
  });

  test('D3 (automated part): after the crossfade the cards are at full opacity and the particles at 28% of base', async ({ page }) => {
    await page.goto('/');
    await waitForStage(page);
    await landed(page);
    const s = await stageState(page);
    expect(s.alpha).toBeCloseTo(s.baseAlpha * 0.28, 6);
    expect(await page.$eval('.featured', (el) => getComputedStyle(el).opacity)).toBe('1');
  });

  test('D5: changing a card summary realigns the landing with no code change', async ({ page }) => {
    await page.goto('/');
    await waitForStage(page);
    await landed(page);
    const before = (await stageState(page)).landingVersion;
    await page.$eval('.fcard:nth-child(2) .summary', (el) => {
      el.textContent = `${el.textContent} It now runs a second sentence that wraps onto another line of the card.`;
    });
    await page.waitForFunction((v) => window.__lattice!.state().landingVersion > v, before);
    expectAligned(await page.evaluate(() => window.__lattice!.projectLanding()), 'after the summary change');
  });
});

test.describe('D4: realignment timing', () => {
  test.beforeEach(({}, info) => {
    test.skip(!info.project.name.endsWith('-desktop'), 'sets its own viewports');
  });

  for (const [from, to, label] of [
    [{ width: 1440, height: 900 }, { width: 1280, height: 720 }, 'resize 1440×900 → 1280×720'],
    [{ width: 390, height: 844 }, { width: 844, height: 390 }, 'rotation 390×844 → 844×390'],
  ] as const) {
    test(`${label}: realigns within 200 ms and stays aligned`, async ({ page }) => {
      await page.setViewportSize(from);
      await page.addInitScript(() => {
        addEventListener('resize', () => ((window as unknown as { __resizeAt: number }).__resizeAt = performance.now()));
      });
      await page.goto('/');
      await waitForStage(page);
      await landed(page);
      const before = (await stageState(page)).landingVersion;
      await page.setViewportSize(to);
      await page.waitForFunction((v) => window.__lattice!.state().landingVersion > v, before);
      const delay = await page.evaluate(
        () => window.__lattice!.state().landingBuiltAt - (window as unknown as { __resizeAt: number }).__resizeAt,
      );
      expect(delay, 'ms from the last resize event to the rebuilt landing').toBeLessThan(200);
      await page.waitForTimeout(300);
      expectAligned(await landed(page), label);
    });
  }

  test('font load: a font that finishes loading after the stage starts realigns the landing within 200 ms', async ({ page }) => {
    await page.goto('/');
    await waitForStage(page);
    await landed(page);
    const before = (await stageState(page)).landingVersion;
    const loadedAt = await page.evaluate(async () => {
      const url = document.querySelector<HTMLLinkElement>('link[rel="preload"][as="font"]')!.href;
      const face = new FontFace('Archivo', `url(${url}?late)`, { weight: '100 900', stretch: '62% 125%' });
      document.fonts.add(face);
      await face.load();
      return performance.now();
    });
    await page.waitForFunction((v) => window.__lattice!.state().landingVersion > v, before);
    const built = (await stageState(page)).landingBuiltAt;
    expect(built - loadedAt).toBeLessThan(200);
    expectAligned(await landed(page), 'after a late font load');
  });
});
