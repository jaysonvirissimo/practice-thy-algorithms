import { describe, it, expect } from 'vitest';
import { compare, deepEqual, equalUnordered, equalAsSet } from './comparison';
import type { ComparisonMode } from '../data/types';
import vectors from './__fixtures__/comparison-vectors.json';

interface Vector {
  mode: ComparisonMode;
  a: unknown;
  b: unknown;
  equal: boolean;
}

describe('comparison parity vectors', () => {
  // Cross-language parity fixture (SDD §5.3). Ruby reuses the same vectors in M2.
  for (const v of vectors as Vector[]) {
    it(`${v.mode}: ${JSON.stringify(v.a)} vs ${JSON.stringify(v.b)} → ${v.equal}`, () => {
      expect(compare(v.mode, v.a, v.b)).toBe(v.equal);
      // Comparison is symmetric.
      expect(compare(v.mode, v.b, v.a)).toBe(v.equal);
    });
  }
});

describe('deepEqual edge cases', () => {
  it('treats NaN as equal to NaN', () => {
    expect(deepEqual(NaN, NaN)).toBe(true);
  });
  it('distinguishes null, undefined, 0, and ""', () => {
    expect(deepEqual(null, undefined)).toBe(false);
    expect(deepEqual(0, null)).toBe(false);
    expect(deepEqual('', 0)).toBe(false);
  });
  it('compares nested objects structurally', () => {
    expect(deepEqual({ a: [1, 2] }, { a: [1, 2] })).toBe(true);
    expect(deepEqual({ a: 1 }, { a: 1, b: 2 })).toBe(false);
  });
});

describe('mode guards', () => {
  it('unordered/set return false for non-array inputs', () => {
    expect(equalUnordered(1, [1])).toBe(false);
    expect(equalAsSet('x', ['x'])).toBe(false);
  });
});
