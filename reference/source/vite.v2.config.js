// Inside the machine v2 only: a quick build for captures, so the source can keep changing while a
// capture runs against a frozen copy (see tools/snap.sh).
import { resolve } from 'node:path';
export default {
  base: './',
  logLevel: 'warn',
  build: {
    emptyOutDir: true, assetsInlineLimit: 0, chunkSizeWarningLimit: 4000, target: 'es2022', reportCompressedSize: false,
    rollupOptions: { input: { machine2: resolve(__dirname, 'concepts/machine2/index.html') } },
  },
};
