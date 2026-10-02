import { describe, expect, it } from 'vitest';
import { colour } from '../../src/styles/tokens.ts';

type RGBA = [number, number, number, number];

const parse = (value: string): RGBA => {
  if (value.startsWith('#')) {
    const n = parseInt(value.slice(1), 16);
    return [(n >> 16) & 255, (n >> 8) & 255, n & 255, 1];
  }
  const [r, g, b, a] = value.replace(/rgba?\(|\)/g, '').split(',').map(Number);
  return [r!, g!, b!, a ?? 1];
};
const over = ([r, g, b, a]: RGBA, [br, bg, bb]: RGBA): RGBA => [r * a + br * (1 - a), g * a + bg * (1 - a), b * a + bb * (1 - a), 1];
const luminance = ([r, g, b]: RGBA) => {
  const lin = (c: number) => {
    const s = c / 255;
    return s <= 0.04045 ? s / 12.92 : ((s + 0.055) / 1.055) ** 2.4;
  };
  return 0.2126 * lin(r) + 0.7152 * lin(g) + 0.0722 * lin(b);
};
const contrast = (fg: RGBA, bg: RGBA) => {
  const [a, b] = [luminance(fg), luminance(bg)].sort((x, y) => y - x);
  return (a! + 0.05) / (b! + 0.05);
};

const voidColour = parse(colour.void);
const backgrounds = {
  void: voidColour,
  thumb: parse(colour.thumb),
  card: over(parse(colour.card), voidColour),
  scrim: over(parse(colour.scrim), voidColour),
};
const text = { ink: colour.ink, body: colour.body, mute: colour.mute, signal: colour.signal } as const;

describe('G5: every text token meets 4.5:1 on every background it is used on', () => {
  for (const [bgName, bg] of Object.entries(backgrounds)) {
    for (const [fgName, fg] of Object.entries(text)) {
      it(`${fgName} on ${bgName}`, () => {
        expect(contrast(parse(fg), bg)).toBeGreaterThanOrEqual(4.5);
      });
    }
  }

  it('matches the §7.1 measurements on --void', () => {
    expect(contrast(parse(colour.ink), voidColour)).toBeCloseTo(19.3, 0);
    expect(contrast(parse(colour.body), voidColour)).toBeCloseTo(12.9, 0);
    expect(contrast(parse(colour.mute), voidColour)).toBeCloseTo(7.6, 0);
    expect(contrast(parse(colour.signal), voidColour)).toBeCloseTo(15.3, 0);
  });
});
