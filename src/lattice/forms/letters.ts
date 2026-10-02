export type Letter = { dx: number; poly: [number, number][] };

export const CAP_HEIGHT = 5;
export const WORDMARK_SCALE = 0.54;
export const WORDMARK_CENTRE = { x: 5.75, y: 2.5 } as const;

export const LETTERS: Letter[] = [
  {
    dx: 0,
    poly: [
      [0, 5], [1, 5], [1.7, 3.5417], [2.4, 5], [3.4, 5], [2.2, 2.5],
      [3.4, 0], [2.4, 0], [1.7, 1.4583], [1, 0], [0, 0], [1.2, 2.5],
    ],
  },
  { dx: 4.3, poly: [[0, 0], [1, 0], [1, 5], [0, 5]] },
  {
    dx: 6.2,
    poly: [
      [0, 0], [0, 5], [1, 5], [2.4, 2.222], [2.4, 5], [3.4, 5],
      [3.4, 0], [2.4, 0], [1, 2.778], [1, 0],
    ],
  },
  { dx: 10.5, poly: [[0, 0], [1, 0], [1, 5], [0, 5]] },
];
