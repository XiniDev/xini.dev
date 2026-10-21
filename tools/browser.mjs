// Headless Chromium for the capture and QA tools: Playwright's own build (run `npx playwright install chromium`
// once). WebGL uses the GPU where headless Chromium can, else SwiftShader. PW_EXECUTABLE or PW_CHANNEL (e.g.
// "chrome") pick a different browser.
import { chromium } from 'playwright';
export async function launch() {
  const args = ['--enable-webgl', '--ignore-gpu-blocklist', '--enable-unsafe-swiftshader'];
  if (process.platform === 'win32') args.push('--use-angle=d3d11');
  return chromium.launch({ headless: true, args, executablePath: process.env.PW_EXECUTABLE || undefined, channel: process.env.PW_CHANNEL || undefined });
}
