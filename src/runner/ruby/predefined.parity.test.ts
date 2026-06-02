import { describe, expect, it } from 'vitest';
import prelude from './prelude.rb?raw';
import { PREDEFINED_TYPES } from '../../data/predefinedTypes';

// The Ruby prelude is eval'd verbatim at VM boot, so what runs is what the catalog
// displays — assert the ListNode class text matches to prevent drift.
describe('Ruby ListNode parity (prelude.rb ↔ catalog)', () => {
  it('prelude.rb contains the catalog ListNode class verbatim', () => {
    expect(prelude).toContain(PREDEFINED_TYPES.ListNode.ruby);
  });
});
