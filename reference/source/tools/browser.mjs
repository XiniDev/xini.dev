// Shared headless browser launcher (Chromium from @sparticuz/chromium, SwiftShader WebGL).
import chromium from '@sparticuz/chromium';
import { chromium as pw } from 'playwright';
export async function launch() {
  const executablePath = await chromium.executablePath();
  const args = chromium.args.filter(a => !a.startsWith('--headless') && a !== '--single-process');
  return pw.launch({ executablePath, args: [...args, '--enable-webgl', '--ignore-gpu-blocklist'], headless: true });
}
