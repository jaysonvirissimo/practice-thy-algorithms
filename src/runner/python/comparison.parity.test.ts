// @vitest-environment node
import { beforeAll, describe, it, expect } from 'vitest';
import { createRequire } from 'node:module';
import { dirname } from 'node:path';
import { loadPyodide } from 'pyodide';
import prelude from './prelude.py?raw';
import vectors from '../__fixtures__/comparison-vectors.json';
import type { ComparisonMode } from '../../data/types';

interface Vector {
  mode: ComparisonMode;
  a: unknown;
  b: unknown;
  equal: boolean;
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
let pyodide: any;

beforeAll(async () => {
  // Vite's transform rewrites pyodide.mjs's location, breaking auto-detection,
  // so point indexURL at the real package dir.
  const require = createRequire(import.meta.url);
  const indexURL = dirname(require.resolve('pyodide'));
  pyodide = await loadPyodide({ indexURL });
  pyodide.runPython(prelude);
  pyodide.runPython(`
def __ptap_parity(meta_json):
    d = json.loads(meta_json)
    return __ptap_compare(d['mode'], d['a'], d['b'])
`);
}, 120_000);

function pyCompare(mode: ComparisonMode, a: unknown, b: unknown): boolean {
  pyodide.globals.set('__ptap_vec', JSON.stringify({ mode, a, b }));
  return pyodide.runPython('__ptap_parity(__ptap_vec)') === true;
}

describe('Python comparators match comparison-vectors.json (cross-language parity)', () => {
  for (const v of vectors as Vector[]) {
    it(`${v.mode}: ${JSON.stringify(v.a)} vs ${JSON.stringify(v.b)} → ${v.equal}`, () => {
      expect(pyCompare(v.mode, v.a, v.b)).toBe(v.equal);
      expect(pyCompare(v.mode, v.b, v.a)).toBe(v.equal);
    });
  }
});
