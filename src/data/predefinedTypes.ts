// Catalog of predefined runtime types (e.g. ListNode) that problems may hand to
// the user as a parameter or expect as a return value. This is the single source
// of truth for the *displayed* class definitions: the read-only "Predefined" box
// in the editor renders these, and parity tests assert each runtime's executable/
// injected definition (marshal.ts, prelude.py, prelude.rb) matches the text here.
//
// Adding a future predefined class (TreeNode, Interval, …) is one entry here plus
// the matching runtime definition; problems opt in just by naming the type in
// their parameters/returnType — no UI or detection wiring needed.

import type { Language } from './types';

export type PredefinedTypeName = 'ListNode';

/** typeName → per-language user-facing class definition text (no internal helpers). */
export const PREDEFINED_TYPES: Record<
  PredefinedTypeName,
  Record<Language, string>
> = {
  ListNode: {
    javascript: `class ListNode {
  val: number;
  next: ListNode | null;

  constructor(val?: number, next?: ListNode | null) {
    this.val = val === undefined ? 0 : val;
    this.next = next === undefined ? null : next;
  }
}`,
    python: `class ListNode:
    def __init__(self, val=0, next=None):
        self.val = val
        self.next = next`,
    ruby: `class ListNode
  attr_accessor :val, :next

  def initialize(val = 0, next_node = nil)
    @val = val
    @next = next_node
  end
end`,
  },
};

const PREDEFINED_TYPE_NAMES = new Set<string>(Object.keys(PREDEFINED_TYPES));

/** True when `type` is a catalog key (i.e. a predefined, non-primitive type). */
export function isPredefinedType(type: string): type is PredefinedTypeName {
  return PREDEFINED_TYPE_NAMES.has(type);
}
