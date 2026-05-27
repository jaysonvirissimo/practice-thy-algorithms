import { describe, it, expect } from 'vitest';
import { runHarness } from './harness';
import { getProblem } from '../data/problems';
import type { Problem } from '../data/types';

function problem(key: string): Problem {
  const p = getProblem(key);
  if (!p) throw new Error(`missing problem ${key}`);
  return p;
}

// Reference solutions, named to match functionSignatures.javascript. They run
// inside the harness's `new Function` scope, so they may not reference the
// host's ListNode class — linked-list solutions use plain `{ next }` dummies.
const SOLUTIONS: Record<string, string> = {
  two_sum: `function twoSum(nums, target){
    const seen = {};
    for (let i = 0; i < nums.length; i++) {
      const need = target - nums[i];
      if (seen[need] !== undefined) return [seen[need], i];
      seen[nums[i]] = i;
    }
  }`,
  valid_parentheses: `function isValid(s){
    const pairs = { ')':'(', ']':'[', '}':'{' };
    const st = [];
    for (const ch of s) {
      if (ch === '(' || ch === '[' || ch === '{') st.push(ch);
      else if (st.pop() !== pairs[ch]) return false;
    }
    return st.length === 0;
  }`,
  three_sum: `function threeSum(nums){
    nums.sort((a,b)=>a-b);
    const res = [];
    for (let i = 0; i < nums.length - 2; i++) {
      if (i > 0 && nums[i] === nums[i-1]) continue;
      let lo = i+1, hi = nums.length-1;
      while (lo < hi) {
        const sum = nums[i] + nums[lo] + nums[hi];
        if (sum < 0) lo++;
        else if (sum > 0) hi--;
        else {
          res.push([nums[i], nums[lo], nums[hi]]);
          while (lo < hi && nums[lo] === nums[lo+1]) lo++;
          while (lo < hi && nums[hi] === nums[hi-1]) hi--;
          lo++; hi--;
        }
      }
    }
    return res;
  }`,
  group_anagrams: `function groupAnagrams(strs){
    const map = {};
    for (const s of strs) {
      const key = s.split('').sort().join('');
      (map[key] = map[key] || []).push(s);
    }
    return Object.values(map);
  }`,
  reverse_linked_list: `function reverseList(head){
    let prev = null, cur = head;
    while (cur) { const n = cur.next; cur.next = prev; prev = cur; cur = n; }
    return prev;
  }`,
  remove_nth_from_end: `function removeNthFromEnd(head, n){
    const dummy = { next: head };
    let fast = dummy, slow = dummy;
    for (let i = 0; i < n; i++) fast = fast.next;
    while (fast.next) { fast = fast.next; slow = slow.next; }
    slow.next = slow.next.next;
    return dummy.next;
  }`,
  has_cycle: `function hasCycle(head){
    let slow = head, fast = head;
    while (fast && fast.next) {
      slow = slow.next; fast = fast.next.next;
      if (slow === fast) return true;
    }
    return false;
  }`,
  number_of_islands: `function numIslands(grid){
    if (!grid || !grid.length) return 0;
    const R = grid.length, C = grid[0].length;
    let count = 0;
    const dfs = (r, c) => {
      if (r < 0 || c < 0 || r >= R || c >= C || grid[r][c] !== '1') return;
      grid[r][c] = '0';
      dfs(r+1,c); dfs(r-1,c); dfs(r,c+1); dfs(r,c-1);
    };
    for (let r = 0; r < R; r++)
      for (let c = 0; c < C; c++)
        if (grid[r][c] === '1') { count++; dfs(r,c); }
    return count;
  }`,
};

describe('runHarness with correct reference solutions', () => {
  for (const [key, code] of Object.entries(SOLUTIONS)) {
    it(`${key} passes all cases`, () => {
      const result = runHarness(code, problem(key));
      expect(result.runtimeError).toBeUndefined();
      expect(result.passed).toBe(true);
      expect(result.cases.length).toBeGreaterThan(0);
      expect(result.cases.every((c) => c.passed)).toBe(true);
    });
  }

  it('does not corrupt shared data when run twice (in-place mutation)', () => {
    // three_sum sorts nums; number_of_islands flips the grid.
    expect(runHarness(SOLUTIONS.three_sum, problem('three_sum')).passed).toBe(true);
    expect(runHarness(SOLUTIONS.three_sum, problem('three_sum')).passed).toBe(true);
    expect(runHarness(SOLUTIONS.number_of_islands, problem('number_of_islands')).passed).toBe(true);
    expect(runHarness(SOLUTIONS.number_of_islands, problem('number_of_islands')).passed).toBe(true);
  });
});

describe('runHarness failure modes', () => {
  it('reports a wrong solution as failed with a populated case', () => {
    const result = runHarness('function twoSum(){ return [9, 9]; }', problem('two_sum'));
    expect(result.passed).toBe(false);
    const failing = result.cases.find((c) => !c.passed);
    expect(failing).toBeDefined();
    expect(failing?.actual).toEqual([9, 9]);
  });

  it('reports a syntax error as runtimeError with no cases', () => {
    const result = runHarness('function twoSum(nums, target) {', problem('two_sum'));
    expect(result.runtimeError).toBeDefined();
    expect(result.cases).toHaveLength(0);
  });

  it('reports a missing function as runtimeError', () => {
    const result = runHarness('const x = 1;', problem('two_sum'));
    expect(result.runtimeError).toContain('twoSum');
    expect(result.cases).toHaveLength(0);
  });

  it('isolates a per-case throw without aborting other cases', () => {
    const code = `function twoSum(nums, target){
      if (nums.length === 2) throw new Error('boom');
      const seen = {};
      for (let i = 0; i < nums.length; i++) {
        const need = target - nums[i];
        if (seen[need] !== undefined) return [seen[need], i];
        seen[nums[i]] = i;
      }
    }`;
    const result = runHarness(code, problem('two_sum'));
    expect(result.runtimeError).toBeUndefined();
    const errored = result.cases.filter((c) => c.error);
    expect(errored.length).toBeGreaterThan(0);
    expect(errored[0].error).toContain('boom');
  });

  it('captures stdout separately from the result protocol', () => {
    const code = `function twoSum(nums, target){
      console.log('debugging', nums.length);
      const seen = {};
      for (let i = 0; i < nums.length; i++) {
        const need = target - nums[i];
        if (seen[need] !== undefined) return [seen[need], i];
        seen[nums[i]] = i;
      }
    }`;
    const result = runHarness(code, problem('two_sum'));
    expect(result.passed).toBe(true);
    expect(result.stdout).toContain('debugging');
  });
});
