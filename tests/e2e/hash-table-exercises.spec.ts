import { test, expect } from '@playwright/test';
import { readFileSync } from 'node:fs';
import type { Language, RawEntry } from '../../src/data/types';
import { setEditorCode } from './helpers';

const rawProblems = JSON.parse(
  readFileSync(new URL('../../shared/problems.json', import.meta.url), 'utf8'),
) as Record<string, RawEntry>;

// Allow time for the real Ruby and Python WASM runtimes to boot.
test.describe.configure({ timeout: 90_000 });

const exercises: {
  key: string;
  solutions: Record<Language, string>;
}[] = [
  {
    key: 'contains_duplicate',
    solutions: {
      javascript: `function containsDuplicate(nums) {
  const seen = new Set();
  for (const number of nums) {
    if (seen.has(number)) return true;
    seen.add(number);
  }
  return false;
}`,
      ruby: `def contains_duplicate(nums)
  seen = {}
  nums.each do |number|
    return true if seen.key?(number)
    seen[number] = true
  end
  false
end`,
      python: `def contains_duplicate(nums):
    seen = set()
    for number in nums:
        if number in seen:
            return True
        seen.add(number)
    return False`,
    },
  },
  {
    key: 'array_intersection',
    solutions: {
      javascript: `function intersectAccounts(firstRoll, secondRoll) {
  const remaining = new Set(secondRoll);
  const result = [];
  for (const account of firstRoll) {
    if (remaining.has(account)) {
      result.push(account);
      remaining.delete(account);
    }
  }
  return result;
}`,
      ruby: `def intersect_accounts(firstRoll, secondRoll)
  remaining = {}
  secondRoll.each { |account| remaining[account] = true }
  result = []
  firstRoll.each do |account|
    if remaining.key?(account)
      result << account
      remaining.delete(account)
    end
  end
  result
end`,
      python: `def intersect_accounts(firstRoll, secondRoll):
    remaining = set(secondRoll)
    result = []
    for account in firstRoll:
        if account in remaining:
            result.append(account)
            remaining.remove(account)
    return result`,
    },
  },
  {
    key: 'missing_alphabet_letter',
    solutions: {
      javascript: `function missingSeal(marks) {
  const seen = new Set();
  for (const mark of marks) {
    if (mark >= 'a' && mark <= 'z') seen.add(mark);
  }
  for (const seal of 'abcdefghijklmnopqrstuvwxyz') {
    if (!seen.has(seal)) return seal;
  }
}`,
      ruby: `def missing_seal(marks)
  seen = {}
  marks.each_char do |mark|
    seen[mark] = true if mark >= 'a' && mark <= 'z'
  end
  ('a'..'z').each do |seal|
    return seal unless seen.key?(seal)
  end
end`,
      python: `def missing_seal(marks):
    seen = set()
    for mark in marks:
        if 'a' <= mark <= 'z':
            seen.add(mark)
    for seal in 'abcdefghijklmnopqrstuvwxyz':
        if seal not in seen:
            return seal`,
    },
  },
  {
    key: 'first_unique_character',
    solutions: {
      javascript: `function firstLoneUnderwriter(marks) {
  const counts = new Map();
  for (const mark of marks) counts.set(mark, (counts.get(mark) || 0) + 1);
  for (const mark of marks) {
    if (counts.get(mark) === 1) return mark;
  }
  return '';
}`,
      ruby: `def first_lone_underwriter(marks)
  counts = Hash.new(0)
  marks.each_char { |mark| counts[mark] += 1 }
  marks.each_char do |mark|
    return mark if counts[mark] == 1
  end
  ''
end`,
      python: `def first_lone_underwriter(marks):
    counts = {}
    for mark in marks:
        counts[mark] = counts.get(mark, 0) + 1
    for mark in marks:
        if counts[mark] == 1:
            return mark
    return ''`,
    },
  },
];

const languageLabels: Record<Language, string> = {
  javascript: 'JavaScript',
  ruby: 'Ruby',
  python: 'Python',
};

for (const exercise of exercises) {
  const problem = rawProblems[exercise.key];
  if (!('testCases' in problem)) throw new Error(`${exercise.key} is not a coding problem`);
  for (const language of ['javascript', 'ruby', 'python'] as const) {
    test(`${problem.title} passes in ${languageLabels[language]}`, async ({ page }) => {
      await page.goto('/');
      await page.getByRole('button', { name: new RegExp(problem.title) }).click();
      await page.getByRole('button', { name: languageLabels[language], exact: true }).click();
      await expect(page.getByTestId('run-button')).toBeEnabled({ timeout: 80_000 });
      await setEditorCode(page, exercise.solutions[language]);
      await page.getByTestId('run-button').click();
      await expect(page.locator('.solved-banner')).toContainText(
        `${problem.testCases.length}/${problem.testCases.length} passed`,
        { timeout: 15_000 },
      );
    });
  }
}
