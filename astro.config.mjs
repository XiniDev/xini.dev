import { defineConfig } from 'astro/config';

export default defineConfig({
  site: 'https://xini.dev',
  outDir: './out',
  compressHTML: true,
  devToolbar: { enabled: false },
  build: { inlineStylesheets: 'always' },
  vite: {
    build: { assetsInlineLimit: 0, modulePreload: { polyfill: false } },
    worker: { format: 'es' },
  },
});
