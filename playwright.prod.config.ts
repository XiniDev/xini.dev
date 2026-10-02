import { defineConfig } from '@playwright/test';
import base, { CHROMIUM_GPU } from './playwright.config.ts';

export default defineConfig({
  ...base,
  webServer: undefined,
  grep: /@smoke/,
  use: { ...base.use, baseURL: process.env.E2E_BASE_URL ?? 'https://xini.dev' },
  projects: [
    { name: 'chromium-desktop', use: { browserName: 'chromium', viewport: { width: 1440, height: 900 }, launchOptions: { args: CHROMIUM_GPU } } },
    { name: 'chromium-phone', use: { browserName: 'chromium', viewport: { width: 390, height: 844 }, hasTouch: true, launchOptions: { args: CHROMIUM_GPU } } },
    { name: 'webkit-desktop', use: { browserName: 'webkit', viewport: { width: 1440, height: 900 } } },
    { name: 'webkit-phone', use: { browserName: 'webkit', viewport: { width: 390, height: 844 }, hasTouch: true } },
  ],
});
