import { describe, expect, it } from 'vitest';
import prelude from './prelude.py?raw';
import { PREDEFINED_TYPES } from '../../data/predefinedTypes';

// The Python prelude is injected verbatim at Pyodide boot, so what runs is what
// the catalog displays — assert the ListNode class text matches to prevent drift.
describe('Python ListNode parity (prelude.py ↔ catalog)', () => {
  it('prelude.py contains the catalog ListNode class verbatim', () => {
    expect(prelude).toContain(PREDEFINED_TYPES.ListNode.python);
  });
});
