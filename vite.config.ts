/// <reference types="vitest/config" />
import { fileURLToPath } from 'node:url';
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import { viteStaticCopy } from 'vite-plugin-static-copy';

// https://vite.dev/config/
export default defineConfig({
  // Project-pages base path: served from
  // https://jaysonvirissimo.github.io/practice-thy-algorithms/
  base: '/practice-thy-algorithms/',
  plugins: [
    react(),
    // Self-host the Pyodide runtime: copy its core dist files into the build so
    // they resolve under the Pages base path (matching PYODIDE_INDEX_URL).
    viteStaticCopy({
      // Glob rooted at the pyodide dir so the base is stripped and the core
      // files land FLAT in assets/pyodide/ (a concrete path keeps the tree).
      targets: [
        {
          src: 'node_modules/pyodide/*.{mjs,js,wasm,zip,json}',
          dest: 'assets/pyodide',
          // v4 preserves directory structure by default; strip the
          // `node_modules/pyodide/` prefix (2 segments) so files land flat.
          rename: { stripBase: 2 },
        },
      ],
    }),
  ],
  resolve: {
    alias: {
      // Single source of truth lives outside src/; aliased so both the app
      // bundle and the worker bundle can import it.
      '@shared': fileURLToPath(new URL('./shared', import.meta.url)),
    },
  },
  optimizeDeps: {
    // ruby.wasm and Pyodide ship large prebuilt assets; let Vite serve them
    // as-is rather than trying to pre-bundle pyodide.asm.js etc.
    exclude: ['@ruby/wasm-wasi', '@ruby/3.4-wasm-wasi', 'pyodide'],
  },
  worker: {
    // The Pyodide worker pulls in a code-split chunk, which the default IIFE
    // worker format cannot emit; ES module workers can.
    format: 'es',
  },
  test: {
    environment: 'jsdom',
    globals: true,
    setupFiles: './src/setupTests.ts',
    // Only the new browser-app tests. The legacy JavaScript/ Jest suite
    // (CLI workflow, retired at M5) is intentionally excluded.
    include: ['src/**/*.{test,spec}.{ts,tsx}'],
    exclude: ['node_modules', 'dist', 'tests/e2e/**'],
  },
});
