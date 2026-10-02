import type { Page } from '@playwright/test';

export type StageSnapshot = {
  morph: number;
  shift: number;
  dist: number;
  rotX: number;
  intro: number;
  lock: number;
  fade: number;
  time: number;
  tlTime: number;
  introPlayed: boolean;
  frames: number;
  count: number;
  dpr: number;
  lowPower: boolean;
  landingVersion: number;
  landingBuiltAt: number;
  pointerActive: number;
  alpha: number;
  baseAlpha: number;
  pointerStrength: number;
  calm: number;
};

type Box = { left: number; top: number; right: number; bottom: number; width: number; height: number };
export type Projection = {
  xy: number[];
  kind: number[];
  owner: number[];
  cards: { card: Box; thumb?: Box }[];
  lines: Box[];
  builtLines: number;
};

type Hook = {
  ready: boolean;
  state(): StageSnapshot;
  jumpTo(t: number): Promise<StageSnapshot>;
  settle(timeout?: number): Promise<boolean>;
  projectLanding(): Projection;
  rebuildLanding(): Promise<void>;
  loseContext(): void;
  restoreContext(): void;
  pointerMove(x: number, y: number): void;
};

declare global {
  interface Window {
    __lattice?: Hook;
  }
}

export const waitForStage = (page: Page) => page.waitForFunction(() => window.__lattice?.ready === true, null, { timeout: 45_000 });
export const stageState = (page: Page) => page.evaluate(() => window.__lattice!.state());
export const jumpTo = (page: Page, t: number) => page.evaluate((time) => window.__lattice!.jumpTo(time), t);
export const settle = (page: Page) => page.evaluate(() => window.__lattice!.settle());
export const opacities = (page: Page) =>
  page.evaluate(() => ({
    beats: [...document.querySelectorAll('.beat')].map((b) => Number(getComputedStyle(b).opacity)),
    cards: Number(getComputedStyle(document.querySelector('.featured')!).opacity),
  }));
export const isDesktopProject = (name: string) => name.endsWith('-desktop');
