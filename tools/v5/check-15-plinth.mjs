// v5 #15: the Enclave plinth reads as a block. Captures the Enclave at 1600x900 and 390x844 and samples greyscale
// patches on the plinth's top, its front wall and the board beside it: three distinct values, the top lighter than
// the board and the wall darker. (Patches are placed for the current framing; the captures are kept to look at.)
//   node tools/v5/check-15-plinth.mjs [outDir]
import { execFileSync } from 'node:child_process';
import { BASE } from './lib.mjs';

const out = process.argv[2] || '.shots/v5-checks/15';
const PATCH = {
  1600: { top: [760, 655, 840, 680], wall: [780, 718, 840, 745], board: [600, 800, 700, 840] },
  390: { top: [60, 430, 140, 450], wall: [60, 470, 140, 476], board: [300, 500, 380, 540] },
};
let fail = 0;
for (const [w, h] of [[1600, 900], [390, 844]]) {
  execFileSync('node', ['tools/caps.mjs', `${BASE}?skipintro`, out, String(w), String(h), '3', '4.2'], { stdio: 'ignore' });
  const py = `from PIL import Image, ImageStat\ng=Image.open('${out}/${w}x${h}-3.png').convert('L')\nprint(' '.join(f'{k}={ImageStat.Stat(g.crop(tuple(b))).mean[0]:.1f}' for k,b in ${JSON.stringify(PATCH[w])}.items()))`;
  const line = execFileSync('python', ['-I', '-c', py]).toString().trim();
  const v = Object.fromEntries(line.split(' ').map((kv) => kv.split('=')).map(([k, x]) => [k, +x]));
  const ok = v.top > v.board + 10 && v.wall < v.board - 8;
  if (!ok) fail++;
  console.log(`${w}x${h}: top ${v.top}, wall ${v.wall}, board ${v.board} → ${out}/${w}x${h}-3.png  ${ok ? 'PASS' : 'FAIL'}`);
}
process.exit(fail ? 1 : 0);
