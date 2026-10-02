import { existsSync, readFileSync, statSync } from 'node:fs';
import { join, posix } from 'node:path';
import { gzipSync } from 'node:zlib';

const OUT = process.argv[2] ?? 'out';
const KB = 1024;
const BUDGET = {
  firstPaintTotal: 60 * KB,
  firstPaintJs: 30 * KB,
  firstPaintCss: 20 * KB,
  stage: 200 * KB,
  font: 95 * KB,
  image800: 80 * KB,
};

const read = (url: string) => readFileSync(join(OUT, url.replace(/^\//, '')));
const gz = (data: Buffer | string) => gzipSync(data, { level: 9 }).length;
const html = readFileSync(join(OUT, 'index.html'), 'utf8');

const attr = (tag: string, name: string) => tag.match(new RegExp(`${name}="([^"]+)"`))?.[1];
const tags = (pattern: RegExp) => [...html.matchAll(pattern)].map((m) => m[0]);

const STATIC_IMPORT = /(?:^|[;}\s])(?:import|export)\s*(?:[\w$*{}\s,]+?\s*from\s*)?["'`]([^"'`]+\.js)["'`]/g;
const DYNAMIC_IMPORT = /import\(\s*["'`]([^"'`]+\.js)["'`]\s*\)/g;
const DEP_PATHS = /["'`](\/?_astro\/[^"'`]+\.js)["'`]/g;
const WORKER = /["'`]([^"'`]*worker[^"'`]*\.js)["'`]/g;

const resolve = (from: string, spec: string) =>
  spec.startsWith('/') ? spec : posix.normalize(posix.join(posix.dirname(from), spec));

function graph(entries: string[], exclude = new Set<string>()) {
  const seen = new Set<string>();
  const visit = (file: string) => {
    if (seen.has(file) || exclude.has(file)) return;
    seen.add(file);
    const code = read(file).toString('utf8');
    for (const m of code.matchAll(STATIC_IMPORT)) visit(resolve(file, m[1]!));
  };
  entries.forEach(visit);
  return seen;
}

const scriptTags = tags(/<script\b[^>]*>/g);
const entryScripts = scriptTags.map((t) => attr(t, 'src')).filter((s): s is string => !!s);
const inlineScripts = [...html.matchAll(/<script\b(?![^>]*\bsrc=)[^>]*>([\s\S]*?)<\/script>/g)].map((m) => m[1] ?? '');
const inlineStyles = [...html.matchAll(/<style\b[^>]*>([\s\S]*?)<\/style>/g)].map((m) => m[1] ?? '');
const stylesheets = tags(/<link\b[^>]*rel="stylesheet"[^>]*>/g).map((t) => attr(t, 'href')!).filter(Boolean);

const firstPaint = graph(entryScripts);
const dynamicEntries = new Set<string>();
for (const file of firstPaint) {
  const code = read(file).toString('utf8');
  for (const m of code.matchAll(DYNAMIC_IMPORT)) dynamicEntries.add(resolve(file, m[1]!));
  for (const m of code.matchAll(DEP_PATHS)) {
    const path = m[1]!.startsWith('/') ? m[1]! : `/${m[1]!}`;
    if (!firstPaint.has(path)) dynamicEntries.add(path);
  }
}
const stage = graph([...dynamicEntries], firstPaint);
for (const file of [...stage]) {
  const code = read(file).toString('utf8');
  for (const m of code.matchAll(WORKER)) {
    const path = resolve(file, m[1]!);
    if (existsSync(join(OUT, path))) graph([path], firstPaint).forEach((f) => stage.add(f));
  }
}

const sum = (files: Iterable<string>) => [...files].reduce((n, f) => n + gz(read(f)), 0);
const htmlGz = gz(html);
const jsGz = sum(firstPaint);
const cssGz = gz(inlineStyles.join('')) + sum(stylesheets);
const inlineJsGz = gz(inlineScripts.join(''));
const stageGz = sum(stage);
const fonts = tags(/<link\b[^>]*rel="preload"[^>]*as="font"[^>]*>/g).map((t) => attr(t, 'href')!);
const fontBytes = fonts.map((f) => statSync(join(OUT, f.replace(/^\//, ''))).size);
const images800 = [...html.matchAll(/(\/_astro\/[^\s",]+)\s+800w/g)].map((m) => m[1]!);
const imageSizes = [...new Set(images800)].map((f) => ({ file: f, bytes: statSync(join(OUT, f.replace(/^\//, ''))).size }));

const kb = (n: number) => `${(n / KB).toFixed(1)} KB`;
const rows: [string, number, number][] = [
  ['First-paint total (HTML incl. inline CSS/JS + CSS + JS), gz', htmlGz + jsGz + sum(stylesheets), BUDGET.firstPaintTotal],
  ['First-paint JS (module scripts + inline scripts), gz', jsGz + inlineJsGz, BUDGET.firstPaintJs],
  ['First-paint CSS (inline + linked), gz', cssGz, BUDGET.firstPaintCss],
  ['Stage chunk (lazy import graph + worker), gz', stageGz, BUDGET.stage],
  ...fontBytes.map((b, i): [string, number, number] => [`Font ${fonts[i]} (WOFF2, as served)`, b, BUDGET.font]),
  ...imageSizes.map((i): [string, number, number] => [`Featured image ${i.file} (800w)`, i.bytes, BUDGET.image800]),
];

let failed = fonts.length !== 1;
console.log(`\nSize report for ${OUT}/index.html\n`);
for (const [label, value, limit] of rows) {
  const ok = value <= limit;
  failed ||= !ok;
  console.log(`${ok ? 'PASS' : 'FAIL'}  ${label.padEnd(72)} ${kb(value).padStart(10)}  (budget ${kb(limit)})`);
}
console.log(`\n  HTML ${kb(htmlGz)} gz, of which inline CSS ${kb(gz(inlineStyles.join('')))} and inline JS ${kb(inlineJsGz)}`);
console.log(`  First-paint JS files: ${[...firstPaint].join(', ') || 'none'}`);
console.log(`  Stage files: ${[...stage].map((f) => `${f} (${kb(gz(read(f)))})`).join(', ') || 'none'}`);
console.log(`  Fonts preloaded: ${fonts.length}\n`);
if (failed) {
  console.error('Size budgets exceeded.');
  process.exit(1);
}
