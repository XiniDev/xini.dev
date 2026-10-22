// The retired strings from docs/v5/COPY.md, and a sweep for them over everything outside docs/ and reference/.
import { readFileSync, readdirSync, statSync } from 'node:fs';
import { join, sep } from 'node:path';

export const RETIRED = [
  /systems engineer/i,
  /I build complete, self-hosted products with modern AI woven in/i,
  /MSc Artificial Intelligence/i, /BSc Computer Science/i, /St Andrews/i, /Warwick/i,
  /Whole systems, built solo/i,
  /the interface people actually use/i,
  /full stack/i,
  /AI that does real work/i,
  /where it earns its place/i, /when the data should stay put/i,
  /Secure by default/i,
  /I take on client projects through my consultancy/i,
];
// retired on the board only ("in any spelling on the board"), so code comments naming the machine don't count
export const BOARD_ONLY = [/pick\W{0,6}(\+|and)?\W{0,6}place/i, /one operator/i, /(six|6) parts/i];

const SKIP = new Set(['node_modules', 'docs', 'reference', 'out', '.git', '.shots', '.wrangler']);
const TEXT = /\.(js|mjs|html|css|json|md|txt|xml|webmanifest|svg|toml|ts)$/;
const SELF = join('tools', 'v5', 'retired.mjs');

export function sweep(root = '.') {
  const hits = [];
  const walk = (d) => {
    for (const f of readdirSync(d)) {
      const p = join(d, f);
      if (SKIP.has(f) && d === root) continue;
      if (statSync(p).isDirectory()) { if (!SKIP.has(f)) walk(p); continue; }
      if (!TEXT.test(f) || p.endsWith(SELF) || p.endsWith('package-lock.json')) continue;
      readFileSync(p, 'utf8').split('\n').forEach((line, i) => {
        const code = line.replace(/\/\/.*$/, '');
        for (const re of RETIRED) if (re.test(line)) hits.push({ file: p.split(sep).join('/'), line: i + 1, match: line.match(re)[0], text: line.trim().slice(0, 140) });
        for (const re of BOARD_ONLY) if (re.test(code)) hits.push({ file: p.split(sep).join('/'), line: i + 1, match: code.match(re)[0], text: line.trim().slice(0, 140) });
      });
    }
  };
  walk(root);
  return hits;
}
