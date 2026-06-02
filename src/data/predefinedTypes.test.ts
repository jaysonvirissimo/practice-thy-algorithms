import { describe, expect, it } from 'vitest';
import { getProblem } from './problems';
import { isPredefinedType } from './predefinedTypes';
import type { Language } from './types';

const LANGUAGES: Language[] = ['javascript', 'ruby', 'python'];

describe('isPredefinedType', () => {
  it('is true for catalog types', () => {
    expect(isPredefinedType('ListNode')).toBe(true);
  });

  it('is false for primitive / composite type strings', () => {
    for (const t of [
      'integer',
      'string',
      'boolean',
      'array<integer>',
      'array<array<integer>>',
      'list<integer>',
    ]) {
      expect(isPredefinedType(t)).toBe(false);
    }
  });
});

describe('LangSpec.predefinedTypes detection', () => {
  it('flags ListNode for problems that pass or return one (all languages)', () => {
    for (const key of ['reverse_linked_list', 'remove_nth_from_end']) {
      const problem = getProblem(key);
      expect(problem, key).toBeDefined();
      for (const lang of LANGUAGES) {
        expect(problem!.languages[lang].predefinedTypes).toContain('ListNode');
      }
    }
  });

  it('lists ListNode once when it is a param but not the return (has_cycle)', () => {
    const problem = getProblem('has_cycle');
    expect(problem).toBeDefined();
    for (const lang of LANGUAGES) {
      // ListNode param, boolean return → exactly one entry, no dupes.
      expect(problem!.languages[lang].predefinedTypes).toEqual(['ListNode']);
    }
  });

  it('is empty for primitive-only problems (two_sum)', () => {
    const problem = getProblem('two_sum');
    expect(problem).toBeDefined();
    for (const lang of LANGUAGES) {
      expect(problem!.languages[lang].predefinedTypes).toEqual([]);
    }
  });
});
