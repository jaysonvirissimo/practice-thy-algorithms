// Conversion between plain JSON arrays (as stored in problems.json test cases)
// and the ListNode pointer structures that linked-list problems operate on.

export class ListNode {
  val: number;
  next: ListNode | null;

  constructor(val?: number, next?: ListNode | null) {
    this.val = val === undefined ? 0 : val;
    this.next = next === undefined ? null : next;
  }
}

/**
 * Build a singly linked list from an array of values.
 *
 * When `pos` is a valid index (>= 0), the tail's `next` is wired back to the
 * node at that index, creating a cycle (used by has_cycle). `pos < 0` or
 * undefined produces an acyclic list. An empty array yields `null`.
 */
export function arrayToList(values: number[], pos?: number): ListNode | null {
  if (!Array.isArray(values) || values.length === 0) return null;

  const nodes = values.map((v) => new ListNode(v));
  for (let i = 0; i < nodes.length - 1; i++) {
    nodes[i].next = nodes[i + 1];
  }

  if (pos !== undefined && pos >= 0 && pos < nodes.length) {
    nodes[nodes.length - 1].next = nodes[pos];
  }

  return nodes[0];
}

/**
 * Serialize an acyclic linked list to an array. `null` becomes `[]`. Includes a
 * safety guard so a cyclic list (which a correct solution should never return)
 * cannot hang the serializer.
 */
export function listToArray(head: ListNode | null): number[] {
  const out: number[] = [];
  let node = head;
  let guard = 0;
  const MAX = 100_000;
  while (node !== null && guard++ < MAX) {
    out.push(node.val);
    node = node.next;
  }
  return out;
}

/**
 * Canonical, structured-clone-safe serialization for display in the results
 * panel. ListNode values collapse to their array representation; everything
 * else passes through unchanged.
 */
export function serializeForDisplay(value: unknown): unknown {
  if (value instanceof ListNode || value === null) {
    return value instanceof ListNode ? listToArray(value) : value;
  }
  return value;
}
