export const STAGE_VH = 560;

export const TIMELINE = {
  total: 6.65,
  jumpTargets: [0, 1.5, 3.0, 4.5, 6.4],
  jumpNudgePx: 2,
  imagesFrom: 4.5,
  finaleFocusBefore: 6.0,
  cardsFrom: 6.0,
  copyWindows: [
    [0, 0.65],
    [0.65, 2.15],
    [2.15, 3.65],
    [3.65, 5.15],
    [5.15, Infinity],
  ],
} as const;

export const IDLE_LOAD = { timeoutMs: 1200 } as const;

export const FINALE_FIT = {
  steps: ['no-thumb', 'row', 'no-intro', 'no-tags', 'no-step'],
  rowMinWidth: 560,
} as const;
