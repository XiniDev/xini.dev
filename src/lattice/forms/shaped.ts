import { seedFor } from '../config.ts';
import { d20 } from './d20.ts';
import { network } from './network.ts';
import { padlock } from './padlock.ts';
import { mulberry32, type Rng } from './rng.ts';
import { coherent } from './sample.ts';
import { wordmark } from './wordmark.ts';

const FORMS: [(n: number, rng: Rng) => Float32Array, Parameters<typeof seedFor>[0]][] = [
  [wordmark, 'wordmark'],
  [d20, 'd20'],
  [network, 'network'],
  [padlock, 'padlock'],
];

export const shapedForms = (count: number) =>
  FORMS.map(([generate, stream]) => {
    const rng = mulberry32(seedFor(stream));
    return coherent(generate(count, rng), rng);
  });
