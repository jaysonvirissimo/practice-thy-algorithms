import { describe, expect, it } from 'vitest';
import { gradePart } from './analysis';
import { ANALYSIS_PROBLEMS, PROBLEMS, getAnalysisProblem } from './problems';
import type { AnswerSpec } from './types';

describe('gradePart', () => {
  const int: AnswerSpec = { type: 'integer', value: 81 };
  const choice: AnswerSpec = {
    type: 'choice',
    choices: ['1', 'N', 'N²'],
    value: 'N',
  };

  it('accepts a matching whole number, ignoring surrounding whitespace', () => {
    expect(gradePart(int, '81')).toBe(true);
    expect(gradePart(int, ' 81 ')).toBe(true);
  });

  it('rejects anything that is not exactly the integer', () => {
    for (const input of ['80', '81.0', '8 1', 'eighty-one', '', '0x51', '81e0']) {
      expect(gradePart(int, input), input).toBe(false);
    }
  });

  it('matches choices exactly', () => {
    expect(gradePart(choice, 'N')).toBe(true);
    expect(gradePart(choice, 'N²')).toBe(false);
    expect(gradePart(choice, '')).toBe(false);
  });
});

describe('analysis problem content', () => {
  it('is loaded separately from the coding problems', () => {
    expect(ANALYSIS_PROBLEMS.map((p) => p.key)).toEqual([
      'florentine_deposit_ledger',
      'masons_guild_roll',
      'reeves_tithe_count',
      'venetian_account_register',
    ]);
    const codingKeys = new Set(PROBLEMS.map((p) => p.key));
    for (const p of ANALYSIS_PROBLEMS) expect(codingKeys.has(p.key)).toBe(false);
  });

  it('has well-formed answers and a 3-hint progression', () => {
    for (const p of ANALYSIS_PROBLEMS) {
      expect(p.parts.length, p.key).toBeGreaterThan(0);
      expect(p.hints, p.key).toHaveLength(3);
      for (const part of p.parts) {
        if (part.answer.type === 'integer') {
          expect(Number.isInteger(part.answer.value), p.key).toBe(true);
        } else {
          expect(part.answer.choices, p.key).toContain(part.answer.value);
        }
      }
    }
  });

  // Recompute the step counts from the stated cost model so a typo in the JSON
  // fails here: read, search (absent), insert front, insert end, delete front,
  // delete end.
  const integerAnswers = (key: string) =>
    getAnalysisProblem(key)!.parts.map((part) =>
      part.answer.type === 'integer' ? part.answer.value : NaN,
    );

  it('array answers match the cost model (N = 80)', () => {
    const n = 80;
    expect(integerAnswers('florentine_deposit_ledger')).toEqual([
      1,
      n,
      n + 1,
      1,
      n,
      1,
    ]);
  });

  it('array-based set answers match the cost model (N = 60)', () => {
    const n = 60;
    expect(integerAnswers('masons_guild_roll')).toEqual([
      1,
      n,
      2 * n + 1,
      n + 1,
      n,
      1,
    ]);
  });

  it('search answers match the cost model (register and target from the text)', () => {
    const p = getAnalysisProblem('venetian_account_register')!;
    const register: number[] = JSON.parse(p.description.match(/\[[\d, ]+\]/)![0]);
    const target = Number(p.description.match(/locate account (\d+)/)![1]);
    expect([...register].sort((a, b) => a - b)).toEqual(register);

    let probes = 0;
    for (let lo = 0, hi = register.length - 1; lo <= hi; ) {
      const mid = Math.floor((lo + hi) / 2);
      probes++;
      if (register[mid] === target) break;
      if (register[mid] < target) lo = mid + 1;
      else hi = mid - 1;
    }

    const n = 500_000;
    expect(p.parts[2].prompt).toMatch(/\b500,000 accounts\b/);
    expect(integerAnswers('venetian_account_register')).toEqual([
      register.indexOf(target) + 1,
      probes,
      Math.floor(Math.log2(n)) + 1,
    ]);
  });

  it('the N stated in each description matches the cost-model N', () => {
    expect(getAnalysisProblem('florentine_deposit_ledger')!.description).toMatch(
      /\b80 entries\b/,
    );
    expect(getAnalysisProblem('masons_guild_roll')!.description).toMatch(
      /\b60 names\b/,
    );
  });
});
