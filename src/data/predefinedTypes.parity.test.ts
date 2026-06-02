import { describe, expect, it } from 'vitest';
import marshalSource from '../runner/marshal.ts?raw';
import { PREDEFINED_TYPES } from './predefinedTypes';

// marshal.ts holds the *executable* JS ListNode the harness uses directly, so the
// catalog can't be its source. Guard against drift instead: the catalog's JS text
// must appear verbatim in marshal.ts (modulo the `export ` keyword the module needs
// but the displayed text omits). Mirrors the runtime comparison.parity.test.ts idiom.
describe('JS ListNode parity (marshal.ts ↔ catalog)', () => {
  it('marshal.ts contains the catalog ListNode class verbatim', () => {
    expect(marshalSource).toContain(
      `export ${PREDEFINED_TYPES.ListNode.javascript}`,
    );
  });
});
