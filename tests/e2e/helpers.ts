import type { Page } from '@playwright/test';

export const STAGE_CHUNK = /\/_astro\/stage\.[\w-]+\.js$/;

export async function blockStage(page: Page) {
  await page.route(STAGE_CHUNK, (route) => route.abort());
}

export async function scrollThrough(page: Page, step = 0.45) {
  await page.evaluate(async (stepShare) => {
    const wait = (ms: number) => new Promise((r) => setTimeout(r, ms));
    const max = document.documentElement.scrollHeight - innerHeight;
    for (let y = 0; y <= max; y += innerHeight * stepShare) {
      scrollTo(0, y);
      await wait(60);
    }
    scrollTo(0, max);
    await wait(200);
  }, step);
}

export async function visibleInFlow(page: Page, selector: string) {
  return page.$$eval(selector, (els) =>
    els.map((el) => {
      const r = el.getBoundingClientRect();
      const style = getComputedStyle(el);
      return {
        text: (el.textContent ?? '').trim().slice(0, 40),
        height: r.height,
        width: r.width,
        top: r.top + scrollY,
        opacity: Number(style.opacity),
        visibility: style.visibility,
        display: style.display,
        position: style.position,
      };
    }),
  );
}
