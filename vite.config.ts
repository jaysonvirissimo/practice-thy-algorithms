/// <reference types="vitest/config" />
import { fileURLToPath } from 'node:url';
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// https://vite.dev/config/
export default defineConfig({
  // Project-pages base path: served from
  // https://jaysonvirissimo.github.io/practice-thy-algorithms/
  base: '/practice-thy-algorithms/',
  plugins: [react()],
  resolve: {
    alias: {
      // Single source of truth lives outside src/; aliased so both the app
      // bundle and the worker bundle can import it.
      '@shared': fileURLToPath(new URL('./shared', import.meta.url)),
    },
  },
  optimizeDeps: {
    // ruby.wasm ships large prebuilt assets; let Vite serve them as-is rather
    // than trying to pre-bundle them.
    exclude: ['@ruby/wasm-wasi', '@ruby/3.4-wasm-wasi'],
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
