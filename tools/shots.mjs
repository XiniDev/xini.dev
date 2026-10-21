// Review captures on a frozen copy: builds the site into .shots/build, serves it, runs the capture tools against
// it and writes PNGs to .shots/<tag>/. Editing can carry on while it runs.
//   npm run shots -- [parts] [tag]      parts (comma-separated): desktop, laptop, phone, legs, boot, flightqa
//   npm run shots                        = desktop,laptop,phone into .shots/latest
// Needs Playwright's Chromium once: npx playwright install chromium
import { build, preview } from 'vite';
import { spawn } from 'node:child_process';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const here = path.dirname(fileURLToPath(import.meta.url));
const parts = (process.argv[2] || 'desktop,laptop,phone').split(',');
const tag = process.argv[3] || 'latest';
const out = path.resolve('.shots', tag);
const dist = path.resolve('.shots', 'build');

await build({ logLevel: 'warn', build: { outDir: dist, emptyOutDir: true } });
const server = await preview({ logLevel: 'warn', build: { outDir: dist }, preview: { port: 4180, strictPort: false, open: false } });
const url = server.resolvedUrls.local[0];
console.log('serving', url);
// (the tools run as child processes, asynchronously, so this process stays free to serve the pages)
const run = (tool, ...args) => new Promise((resolve, reject) => {
  const child = spawn(process.execPath, [path.join(here, tool), url, ...args.map(String)], { stdio: 'inherit' });
  child.on('error', reject);
  child.on('exit', (code) => (code ? reject(new Error(`${tool} exited with ${code}`)) : resolve()));
});
try {
  for (const part of parts) {
    if (part === 'desktop') await run('caps.mjs', path.join(out, 'desktop'), 1600, 900, '0,1,2,3,4,5', 3.0, 0);
    else if (part === 'laptop') await run('caps.mjs', path.join(out, 'laptop'), 1200, 750, '0,1,2,3,4,5', 3.0, 0);
    else if (part === 'phone') await run('caps.mjs', path.join(out, 'phone'), 390, 844, '0,1,2,3,4,5', 3.0, 0);
    else if (part === 'legs') await run('legs.mjs', path.join(out, 'legs'), 1280, 720, '0-1,1-2,2-3,3-4,4-5', '0.3,0.55,0.8');
    else if (part === 'boot') await run('boot.mjs', path.join(out, 'motion'), 1280, 720, '0.20,0.55,0.85,1.20,1.70,1.95,2.18,2.35,2.85', '0.12,0.30,0.42,0.66,0.82,0.97');
    else if (part === 'flightqa') await run('flightqa.mjs', path.join(out, 'flightqa'));
    else console.warn('unknown part:', part);
  }
} finally {
  await server.close();
}
console.log('captures in', out);
