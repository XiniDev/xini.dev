// Build for the walkable prototypes: every world (the chooser page is written by hand beside them), relative paths throughout so
// the bundle runs from any folder (an artifact, a static host). Kept apart from vite.config.js so the
// dev server's config never changes under it.
import { resolve } from 'node:path';

export default {
  base: './',
  build: {
    outDir: 'dist',
    emptyOutDir: true,
    assetsInlineLimit: 0,
    chunkSizeWarningLimit: 2000,
    target: 'es2022',
    rollupOptions: {
      input: {
        loop: resolve(__dirname, 'concepts/loop/index.html'),
        machine: resolve(__dirname, 'concepts/machine/index.html'),
        machine2: resolve(__dirname, 'concepts/machine2/index.html'),
        tower: resolve(__dirname, 'concepts/tower/index.html'),
        hextech: resolve(__dirname, 'concepts/hextech/index.html'),
      },
    },
  },
};
