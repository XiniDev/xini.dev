import { spawn } from 'node:child_process';
import { chromium } from '@playwright/test';

const PORT = 8796;
const OUT = process.argv[2] ?? 'out-test';
const server = spawn('npx', ['wrangler', 'pages', 'dev', OUT, '--port', String(PORT), '--ip', '127.0.0.1'], {
  shell: true,
  stdio: 'ignore',
  env: { ...process.env, WRANGLER_SEND_METRICS: 'false' },
});

try {
  const base = `http://127.0.0.1:${PORT}/`;
  for (let i = 0; i < 120; i++) {
    try {
      if ((await fetch(base)).ok) break;
    } catch {}
    await new Promise((r) => setTimeout(r, 500));
  }
  const gpu = process.platform === 'win32' ? ['--use-angle=d3d11', '--ignore-gpu-blocklist'] : [];
  const browser = await chromium.launch({ args: gpu });
  const page = await browser.newPage({ viewport: { width: 1200, height: 630 }, deviceScaleFactor: 1 });
  await page.goto(base);
  await page.waitForFunction(() => (window as unknown as { __lattice?: { state(): { intro: number } } }).__lattice?.state().intro === 1, null, {
    timeout: 30_000,
  });
  await page.addStyleTag({ content: '.top,.beats,.rail,.skip{visibility:hidden!important}' });
  await page.waitForTimeout(400);
  await page.screenshot({ path: 'public/og.png' });
  await browser.close();
  console.log('public/og.png written (1200×630)');
} finally {
  server.kill();
  if (process.platform === 'win32' && server.pid) spawn('taskkill', ['/pid', String(server.pid), '/t', '/f'], { stdio: 'ignore' });
}
