/// <reference types="vitest/config" />
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// https://vite.dev/config/
export default defineConfig({
  // Project-pages base path: served from
  // https://jaysonvirissimo.github.io/practice-thy-algorithms/
  base: '/practice-thy-algorithms/',
  plugins: [react()],
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
