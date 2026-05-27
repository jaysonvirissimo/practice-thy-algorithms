// @vitest-environment node
import { beforeAll, describe, it, expect } from 'vitest';
import { createRequire } from 'node:module';
import { readFile } from 'node:fs/promises';
// Use the browser entry (pure-JS browser_wasi_shim) even under Node — Node's
// experimental `wasi` module fatally crashes this Ruby build.
import { DefaultRubyVM } from '@ruby/wasm-wasi/dist/browser';
import prelude from './prelude.rb?raw';
import vectors from '../__fixtures__/comparison-vectors.json';
import type { ComparisonMode } from '../../data/types';

interface Vector {
  mode: ComparisonMode;
  a: unknown;
  b: unknown;
  equal: boolean;
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
let vm: any;

beforeAll(async () => {
  const require = createRequire(import.meta.url);
  const wasmPath = require.resolve('@ruby/3.4-wasm-wasi/dist/ruby+stdlib.wasm');
  const binary = await readFile(wasmPath);
  const wasmModule = await WebAssembly.compile(binary);
  ({ vm } = await DefaultRubyVM(wasmModule, { consolePrint: false }));
  vm.eval(prelude);
  // Decode base64 metadata in-VM (the bridge can't pass a JS string directly),
  // then exercise the same __ptap_compare used by the driver.
  vm.eval(`
    def __ptap_parity_b64(encoded)
      data = JSON.parse(encoded.unpack1('m0').force_encoding('UTF-8'))
      __ptap_compare(data['mode'], data['a'], data['b']) ? 'true' : 'false'
    end
  `);
}, 60_000);

function rubyCompare(mode: ComparisonMode, a: unknown, b: unknown): boolean {
  const b64 = Buffer.from(JSON.stringify({ mode, a, b }), 'utf8').toString(
    'base64',
  );
  return vm.eval(`__ptap_parity_b64("${b64}")`).toString() === 'true';
}

describe('Ruby comparators match comparison-vectors.json (cross-language parity)', () => {
  for (const v of vectors as Vector[]) {
    it(`${v.mode}: ${JSON.stringify(v.a)} vs ${JSON.stringify(v.b)} → ${v.equal}`, () => {
      expect(rubyCompare(v.mode, v.a, v.b)).toBe(v.equal);
      expect(rubyCompare(v.mode, v.b, v.a)).toBe(v.equal);
    });
  }
});
