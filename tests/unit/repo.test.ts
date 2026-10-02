import { readFileSync, readdirSync, statSync } from 'node:fs';
import { join, sep } from 'node:path';
import sharp from 'sharp';
import { describe, expect, it } from 'vitest';
import { LETTERS } from '../../src/lattice/forms/letters.ts';
import { colour } from '../../src/styles/tokens.ts';

const SKIP_DIRS = new Set(['node_modules', '.git', 'out', 'out-test', 'docs', '.astro', '.wrangler', '.lighthouseci', 'test-results', 'playwright-report']);
const THEME_INVENTORY = new Set(['tests/e2e/copy-data.ts', 'tests/unit/repo.test.ts']);
const TEXT = /\.(ts|astro|css|js|mjs|cjs|json|md|toml|yml|yaml|html|txt|glsl|svg|webmanifest)$|^_headers$|^_redirects$|^\.[a-z]+$/;

function walk(dir: string): string[] {
  return readdirSync(dir).flatMap((name) => {
    if (SKIP_DIRS.has(name)) return [];
    const path = join(dir, name);
    if (statSync(path).isDirectory()) return walk(path);
    return TEXT.test(name) ? [path.split(sep).join('/')] : [];
  });
}

const FILES = walk('.').filter((f) => f !== 'package-lock.json');
const OLD_THEME = /\b(laps?|circuit|bays?|specimen|wstroke|mark3d\w*|mshadow|strip-(ghost|ticks|count)|lap-row|flow-(divider|head)|facet)\b/i;

describe('B4: no racing or circuit asset, component or style remains', () => {
  it('no file from the audit inventory exists', () => {
    for (const gone of ['src/components/facet', 'src/app', 'public/icon.svg', 'next.config.ts', 'postcss.config.mjs', 'eslint.config.mjs', 'scripts/optimize-images.mjs', 'docs/redesign-volumetric.md']) {
      expect(() => statSync(gone), gone).toThrow();
    }
  });

  it.each(FILES.filter((f) => !THEME_INVENTORY.has(f)))('%s has none of the theme vocabulary', (file) => {
    const hits = readFileSync(file, 'utf8')
      .split('\n')
      .filter((line) => OLD_THEME.test(line));
    expect(hits).toEqual([]);
  });
});

describe('B5: the favicon set is the wordmark X in signal on void', () => {
  const signal = [0x3d, 0xff, 0x8f];
  const voidRgb = [0x02, 0x08, 0x06];
  const near = (a: number[], b: number[]) => a.every((v, i) => Math.abs(v - b[i]!) <= 3);

  it('favicon.svg draws the X polygon in --signal on a --void square', () => {
    const svg = readFileSync('public/favicon.svg', 'utf8');
    expect(svg).toContain(`fill="${colour.void}"`);
    expect(svg).toContain(`fill="${colour.signal}"`);
    expect(svg.match(/points="([^"]+)"/)![1]!.trim().split(' ')).toHaveLength(LETTERS[0]!.poly.length);
  });

  it.each([
    ['public/apple-touch-icon.png', 180],
    ['public/icon-512-maskable.png', 512],
  ] as const)('%s is %ipx, void at the corner and signal at the centre of the X', async (file, size) => {
    const { data, info } = await sharp(file).removeAlpha().raw().toBuffer({ resolveWithObject: true });
    expect([info.width, info.height]).toEqual([size, size]);
    const px = (x: number, y: number) => [...data.subarray((y * size + x) * 3, (y * size + x) * 3 + 3)];
    expect(near(px(2, 2), voidRgb)).toBe(true);
    expect(near(px(Math.round(size / 2), Math.round(size / 2)), signal)).toBe(true);
  });

  it('the maskable icon keeps the X inside the 80% safe circle', async () => {
    const size = 512;
    const { data } = await sharp('public/icon-512-maskable.png').removeAlpha().raw().toBuffer({ resolveWithObject: true });
    let outside = 0;
    for (let y = 0; y < size; y++) {
      for (let x = 0; x < size; x++) {
        const i = (y * size + x) * 3;
        if (data[i + 1]! > 128 && Math.hypot(x - size / 2, y - size / 2) > size * 0.4) outside++;
      }
    }
    expect(outside).toBe(0);
  });

  it('favicon.ico holds 16, 32 and 48px images and the manifest marks the 512 icon maskable', () => {
    const ico = readFileSync('public/favicon.ico');
    expect(ico.readUInt16LE(2)).toBe(1);
    const sizes = Array.from({ length: ico.readUInt16LE(4) }, (_, i) => ico[6 + i * 16]);
    expect(sizes).toEqual([16, 32, 48]);
    const manifest = JSON.parse(readFileSync('public/site.webmanifest', 'utf8'));
    expect(manifest.icons).toContainEqual({ src: '/icon-512-maskable.png', sizes: '512x512', type: 'image/png', purpose: 'maskable' });
    expect(manifest.theme_color).toBe(colour.void);
  });
});

describe('J1: strict TypeScript with no any in src/lattice or src/lib', () => {
  it('extends the strict Astro config', () => {
    expect(JSON.parse(readFileSync('tsconfig.json', 'utf8')).extends).toBe('astro/tsconfigs/strict');
  });

  it.each(FILES.filter((f) => /^src\/(lattice|lib)\/.*\.ts$/.test(f)))('%s uses no any', (file) => {
    const code = readFileSync(file, 'utf8').replace(/\/\/.*$/gm, '').replace(/'[^']*'|`[^`]*`|"[^"]*"/g, "''");
    expect(code.match(/(:\s*any\b|\bas\s+any\b|<any\b|\bany\[\])/g) ?? []).toEqual([]);
  });
});
