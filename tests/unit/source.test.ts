import { readFileSync, readdirSync, statSync } from 'node:fs';
import { join, sep } from 'node:path';
import { describe, expect, it } from 'vitest';
import { PHONE_MAX_WIDTH, SHORT_MAX_HEIGHT } from '../../src/lattice/config.ts';

function files(dir: string, exts: string[]): string[] {
  return readdirSync(dir).flatMap((name) => {
    const path = join(dir, name);
    if (statSync(path).isDirectory()) return files(path, exts);
    return exts.some((e) => name.endsWith(e)) ? [path] : [];
  });
}

const norm = (p: string) => p.split(sep).join('/');
const SOURCE = files('src', ['.css', '.astro', '.ts', '.glsl']).map(norm);
const COLOUR_SOURCES = new Set(['src/styles/tokens.ts', 'src/lattice/config.ts']);
const NAMED = /\b(white|black|red|green|blue|yellow|orange|purple|pink|grey|gray|silver|lime|teal|navy|olive|maroon|aqua|fuchsia|cyan|magenta)\b/i;

describe('B1: colour literals live only in the tokens and the stage config', () => {
  it.each(SOURCE.filter((f) => !COLOUR_SOURCES.has(f)))('%s has no colour literals', (file) => {
    const text = readFileSync(file, 'utf8');
    expect(text.match(/#[0-9a-f]{3,8}\b(?![-\w])/gi) ?? []).toEqual([]);
    expect(text.match(/\b(rgba?|hsla?|hwb|lab|lch|oklab|oklch)\(/gi) ?? []).toEqual([]);
    if (file.endsWith('.css')) {
      const values = [...text.matchAll(/:\s*([^;{}]+);/g)].map((m) => m[1]!);
      expect(values.filter((v) => NAMED.test(v))).toEqual([]);
    }
  });
});

const BANNED = [
  'turning imagination into reality',
  'passionate',
  'cutting-edge',
  'innovative solutions',
  'pixel-perfect',
  'rockstar',
  'ninja',
];

describe('A4: no banned phrase appears in the source', () => {
  it.each(SOURCE)('%s', (file) => {
    const text = readFileSync(file, 'utf8').toLowerCase();
    for (const phrase of BANNED) expect(text).not.toContain(phrase);
  });
});

describe('the CSS breakpoints match the stage config, which picks its framing targets by them', () => {
  const css = readFileSync('src/styles/global.css', 'utf8');
  const card = readFileSync('src/components/FeaturedCard.astro', 'utf8');

  it('uses only PHONE_MAX_WIDTH and SHORT_MAX_HEIGHT as layout breakpoints', () => {
    const queries = [...css.matchAll(/@media ([^{]+)\{/g)].map((m) => m[1]!);
    const sizes = queries.flatMap((q) => [...q.matchAll(/\((?:max|min)-(width|height):\s*(\d+)px\)/g)].map((m) => `${m[1]} ${m[2]}`));
    expect(sizes.length).toBeGreaterThan(0);
    expect(sizes.filter((s) => s !== `width ${PHONE_MAX_WIDTH}` && s !== `height ${SHORT_MAX_HEIGHT}`)).toEqual([]);
    expect(card).toContain(`(max-width: ${PHONE_MAX_WIDTH}px) 84px`);
  });

  it('has the phone, short-screen and short narrow-screen blocks', () => {
    expect(css).toContain(`@media (max-width: ${PHONE_MAX_WIDTH}px) {`);
    expect(css).toContain(`@media (max-height: ${SHORT_MAX_HEIGHT}px) {`);
    expect(css).toContain(`@media (max-width: ${PHONE_MAX_WIDTH}px) and (max-height: ${SHORT_MAX_HEIGHT}px) {`);
  });
});
