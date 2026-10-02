import { defineConfig, type Project } from '@playwright/test';

const PORT = 8789;
export const CHROMIUM_GPU = process.platform === 'win32' ? ['--use-angle=d3d11', '--ignore-gpu-blocklist'] : [];
const sizes = {
  phone: { width: 390, height: 844 },
  tablet: { width: 768, height: 1024 },
  desktop: { width: 1440, height: 900 },
} as const;

const projects: Project[] = (['chromium', 'webkit'] as const).flatMap((browserName) =>
  (Object.keys(sizes) as (keyof typeof sizes)[]).map((size) => ({
    name: `${browserName}-${size}`,
    use: {
      browserName,
      viewport: sizes[size],
      hasTouch: size === 'phone',
      ...(browserName === 'chromium' ? { launchOptions: { args: CHROMIUM_GPU } } : {}),
    },
  })),
);

projects.push({
  name: 'firefox-desktop',
  grep: /@engines/,
  use: { browserName: 'firefox', viewport: sizes.desktop },
});

export default defineConfig({
  testDir: 'tests/e2e',
  fullyParallel: true,
  workers: process.env.CI ? 2 : 6,
  timeout: 90_000,
  expect: { timeout: 10_000 },
  reporter: [['list']],
  use: { baseURL: `http://127.0.0.1:${PORT}`, trace: 'retain-on-failure' },
  projects,
  webServer: {
    command: `npx wrangler pages dev out-test --port ${PORT} --ip 127.0.0.1`,
    url: `http://127.0.0.1:${PORT}/`,
    reuseExistingServer: !process.env.CI,
    timeout: 120_000,
    env: { WRANGLER_SEND_METRICS: 'false' },
  },
});
