// xini.dev: one page (index.html → src/main.js), built into out/ for Cloudflare Pages.
import { defineConfig } from 'vite';
import { githubSnapshot } from './tools/github.mjs';

export default defineConfig({
  base: '/',
  plugins: [githubSnapshot()],
  build: {
    outDir: 'out',
    emptyOutDir: true,
    assetsInlineLimit: 0,
    chunkSizeWarningLimit: 4000,
    target: 'es2022',
    rollupOptions: {
      // three.js in its own file: its name (and cache) stays the same across deploys that change only the site
      output: { manualChunks: (id) => (id.replace(/\\/g, '/').includes('/node_modules/three/') ? 'three' : undefined) },
    },
  },
  // only the site itself: reference/ holds other pages that are never built or served
  optimizeDeps: { entries: ['index.html'] },
  server: { port: 5173, watch: { ignored: ['**/reference/**', '**/.shots/**'] } },
});
