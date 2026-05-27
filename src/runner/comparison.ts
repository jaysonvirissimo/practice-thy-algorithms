import type { ComparisonMode } from '../data/types';

/**
 * Recursive structural equality (Jest `toEqual`-style) for the JSON-only values
 * in this dataset. Handles NaN and distinguishes null/undefined from 0/''.
 */
export function deepEqual(a: unknown, b: unknown): boolean {
  if (a === b) return true;

  if (typeof a === 'number' && typeof b === 'number') {
    return Number.isNaN(a) && Number.isNaN(b);
  }

  if (Array.isArray(a) || Array.isArray(b)) {
    if (!Array.isArray(a) || !Array.isArray(b)) return false;
    if (a.length !== b.length) return false;
    return a.every((item, i) => deepEqual(item, b[i]));
  }

  if (
    typeof a === 'object' &&
    typeof b === 'object' &&
    a !== null &&
    b !== null
  ) {
    const ka = Object.keys(a as Record<string, unknown>);
    const kb = Object.keys(b as Record<string, unknown>);
    if (ka.length !== kb.length) return false;
    return ka.every(
      (k) =>
        Object.prototype.hasOwnProperty.call(b, k) &&
        deepEqual(
          (a as Record<string, unknown>)[k],
          (b as Record<string, unknown>)[k],
        ),
    );
  }

  return false;
}

/**
 * Order-insensitive array equality. Ported from the existing Jest matcher in
 * shared/generators/javascript_test_generator.js (`toEqualUnordered`): sort each
 * nested array, then sort the outer array by JSON string. Handles nested arrays
 * such as three_sum triplets and group_anagrams groups.
 */
export function equalUnordered(a: unknown, b: unknown): boolean {
  if (!Array.isArray(a) || !Array.isArray(b)) return false;

  const sortNested = (arr: unknown[]): unknown[] =>
    arr
      .map((item) => (Array.isArray(item) ? [...item].sort() : item))
      .sort((x, y) => JSON.stringify(x).localeCompare(JSON.stringify(y)));

  return JSON.stringify(sortNested(a)) === JSON.stringify(sortNested(b));
}

/**
 * Set equality. Ported from `toEqualAsSet`: compare arrays as sets of
 * JSON-serialized members (no duplicates, no order). Defined for parity with
 * the generator; no current problem uses it.
 */
export function equalAsSet(a: unknown, b: unknown): boolean {
  if (!Array.isArray(a) || !Array.isArray(b)) return false;

  const setA = new Set(a.map((item) => JSON.stringify(item)));
  const setB = new Set(b.map((item) => JSON.stringify(item)));

  return setA.size === setB.size && [...setA].every((item) => setB.has(item));
}

export function compare(
  mode: ComparisonMode,
  actual: unknown,
  expected: unknown,
): boolean {
  switch (mode) {
    case 'unordered_array':
      return equalUnordered(actual, expected);
    case 'set_equality':
      return equalAsSet(actual, expected);
    case 'exact':
    default:
      return deepEqual(actual, expected);
  }
}
