import { beforeEach, afterEach, describe, it, expect, vi } from 'vitest';
import {
  loadCode,
  saveCode,
  markSolved,
  solvedLanguages,
  isSolved,
  loadHintCount,
  saveHintCount,
  loadVimPref,
  saveVimPref,
  lastLanguage,
  saveLastLanguage,
} from './storage';

beforeEach(() => localStorage.clear());

describe('code persistence', () => {
  it('round-trips code per (problem, language)', () => {
    expect(loadCode('two_sum', 'javascript')).toBeNull();
    saveCode('two_sum', 'javascript', 'function twoSum(){}');
    saveCode('two_sum', 'ruby', 'def two_sum; end');
    expect(loadCode('two_sum', 'javascript')).toBe('function twoSum(){}');
    expect(loadCode('two_sum', 'ruby')).toBe('def two_sum; end');
  });

  it('uses the documented key format', () => {
    saveCode('two_sum', 'javascript', 'x');
    expect(localStorage.getItem('pta:code:two_sum:javascript')).toBe('x');
  });
});

describe('completion', () => {
  it('tracks solved languages as an idempotent set', () => {
    expect(solvedLanguages('two_sum')).toEqual([]);
    expect(isSolved('two_sum')).toBe(false);
    markSolved('two_sum', 'javascript');
    markSolved('two_sum', 'javascript'); // dedup
    markSolved('two_sum', 'ruby');
    expect(solvedLanguages('two_sum')).toEqual(['javascript', 'ruby']);
    expect(isSolved('two_sum')).toBe(true);
  });

  it('drops garbage values defensively', () => {
    localStorage.setItem('pta:solved:two_sum', '["javascript","python","x"]');
    expect(solvedLanguages('two_sum')).toEqual(['javascript']);
    localStorage.setItem('pta:solved:two_sum', 'not json');
    expect(solvedLanguages('two_sum')).toEqual([]);
  });
});

describe('hint count', () => {
  it('round-trips and defaults to 0', () => {
    expect(loadHintCount('two_sum')).toBe(0);
    saveHintCount('two_sum', 2);
    expect(loadHintCount('two_sum')).toBe(2);
  });

  it('treats missing/garbage as 0', () => {
    localStorage.setItem('pta:hints:two_sum', 'abc');
    expect(loadHintCount('two_sum')).toBe(0);
  });
});

describe('vim preference', () => {
  it('defaults to false and round-trips', () => {
    expect(loadVimPref()).toBe(false);
    saveVimPref(true);
    expect(loadVimPref()).toBe(true);
    saveVimPref(false);
    expect(loadVimPref()).toBe(false);
  });
});

describe('last language', () => {
  it('round-trips and validates against the Language union', () => {
    expect(lastLanguage('two_sum')).toBeNull();
    saveLastLanguage('two_sum', 'ruby');
    expect(lastLanguage('two_sum')).toBe('ruby');
    localStorage.setItem('pta:lang:two_sum', 'python');
    expect(lastLanguage('two_sum')).toBeNull();
  });
});

describe('resilience when localStorage throws', () => {
  afterEach(() => vi.restoreAllMocks());

  it('reads return defaults and writes do not throw', () => {
    vi.spyOn(Storage.prototype, 'getItem').mockImplementation(() => {
      throw new Error('blocked');
    });
    vi.spyOn(Storage.prototype, 'setItem').mockImplementation(() => {
      throw new Error('quota');
    });
    expect(() => saveCode('two_sum', 'javascript', 'x')).not.toThrow();
    expect(loadCode('two_sum', 'javascript')).toBeNull();
    expect(solvedLanguages('two_sum')).toEqual([]);
    expect(loadHintCount('two_sum')).toBe(0);
    expect(loadVimPref()).toBe(false);
    expect(lastLanguage('two_sum')).toBeNull();
  });
});
