const { chromium } = require('@playwright/test');

const gpu = process.platform === 'win32' ? '--use-angle=d3d11 --ignore-gpu-blocklist' : '';
const rootInContainer = process.platform === 'linux' && process.getuid?.() === 0 ? ' --no-sandbox' : '';
const median = (minScore) => ['error', { minScore, aggregationMethod: 'median-run' }];
const atMost = (maxNumericValue) => ['error', { maxNumericValue, aggregationMethod: 'median-run' }];

module.exports = {
  ci: {
    collect: {
      startServerCommand: 'npx wrangler pages dev out --port 8795 --ip 127.0.0.1',
      startServerReadyPattern: 'Ready on',
      startServerReadyTimeout: 120000,
      url: ['http://127.0.0.1:8795/'],
      numberOfRuns: 3,
      settings: { chromePath: chromium.executablePath(), chromeFlags: `${gpu}${rootInContainer}`.trim() },
    },
    assert: {
      assertions: {
        'categories:performance': median(0.9),
        'categories:accessibility': median(1),
        'categories:best-practices': median(0.95),
        'categories:seo': median(1),
        'largest-contentful-paint': atMost(2500),
        'cumulative-layout-shift': atMost(0.02),
        'total-blocking-time': atMost(200),
      },
    },
    upload: { target: 'filesystem', outputDir: '.lighthouseci' },
  },
};
