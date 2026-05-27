// Single swap point for the Pyodide asset directory (pyodide.mjs + *.wasm +
// python_stdlib.zip + pyodide-lock.json).
//
// Self-host: vite-plugin-static-copy emits the dist into `assets/pyodide`, so
// the directory resolves under the configured `base`. `indexURL` must be an
// ABSOLUTE URL inside a worker, so it's built from BASE_URL + the worker origin
// (BASE_URL is '/practice-thy-algorithms/' in prod, '/' in dev).
//
// To use a CDN instead, replace the body with a literal pinned URL, e.g.
//   export const PYODIDE_INDEX_URL = 'https://cdn.jsdelivr.net/pyodide/vX.Y.Z/full/';
export const PYODIDE_INDEX_URL = new URL(
  `${import.meta.env.BASE_URL}assets/pyodide/`,
  self.location.origin,
).href;
