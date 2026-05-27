import { describe, it, expect } from 'vitest';
import { ListNode, arrayToList, listToArray, serializeForDisplay } from './marshal';

describe('arrayToList / listToArray', () => {
  it('round-trips a non-empty list', () => {
    expect(listToArray(arrayToList([1, 2, 3, 4, 5]))).toEqual([1, 2, 3, 4, 5]);
  });

  it('maps an empty array to null and back to []', () => {
    expect(arrayToList([])).toBeNull();
    expect(listToArray(null)).toEqual([]);
  });

  it('produces a real ListNode chain', () => {
    const head = arrayToList([1, 2]);
    expect(head).toBeInstanceOf(ListNode);
    expect(head?.val).toBe(1);
    expect(head?.next?.val).toBe(2);
    expect(head?.next?.next).toBeNull();
  });
});

describe('cycle wiring via pos', () => {
  const isCyclic = (head: ListNode | null): boolean => {
    let slow = head;
    let fast = head;
    while (fast && fast.next) {
      slow = slow!.next;
      fast = fast.next.next;
      if (slow === fast) return true;
    }
    return false;
  };

  it('wires a cycle when pos >= 0', () => {
    expect(isCyclic(arrayToList([3, 2, 0, -4], 1))).toBe(true);
    expect(isCyclic(arrayToList([1, 2], 0))).toBe(true);
  });

  it('leaves the list acyclic when pos is -1 or absent', () => {
    expect(isCyclic(arrayToList([1], -1))).toBe(false);
    expect(isCyclic(arrayToList([1, 2, 3]))).toBe(false);
  });
});

describe('serializeForDisplay', () => {
  it('collapses a ListNode to its array form', () => {
    expect(serializeForDisplay(arrayToList([7, 8]))).toEqual([7, 8]);
  });
  it('passes plain values through', () => {
    expect(serializeForDisplay([1, [2]])).toEqual([1, [2]]);
    expect(serializeForDisplay(42)).toBe(42);
    expect(serializeForDisplay(null)).toBeNull();
  });
});
