# Loaded once when Pyodide boots. Defines the data structures and comparators
# the per-run driver relies on. All helpers are prefixed __ptap_ to avoid
# colliding with user solutions. json/io/sys are in the bundled stdlib.

import json
import io
import sys


class ListNode:
    def __init__(self, val=0, next=None):
        self.val = val
        self.next = next


def __ptap_array_to_list(values, pos=None):
    """Build a singly linked list from a list. When `pos` is a valid index the
    tail's `next` is wired back to that node, forming a cycle (has_cycle). A
    negative/None `pos` or empty list yields an acyclic list / None."""
    if not values:
        return None
    nodes = [ListNode(v) for v in values]
    for a, b in zip(nodes, nodes[1:]):
        a.next = b
    if pos is not None and 0 <= pos < len(nodes):
        nodes[-1].next = nodes[pos]
    return nodes[0]


def __ptap_list_to_array(head):
    """Serialize an acyclic list to a list (None -> []). Guarded against cycles."""
    out = []
    node = head
    guard = 0
    while node is not None and guard < 100_000:
        out.append(node.val)
        node = node.next
        guard += 1
    return out


# Comparators ported to match src/runner/comparison.ts (and prelude.rb) so all
# three languages agree, verified against comparison-vectors.json.
def __ptap_unordered(a, b):
    if not isinstance(a, list) or not isinstance(b, list):
        return False

    def normalize(arr):
        inner = [sorted(x) if isinstance(x, list) else x for x in arr]
        return sorted(inner, key=lambda v: json.dumps(v, sort_keys=True))

    return normalize(a) == normalize(b)


def __ptap_set_equal(a, b):
    if not isinstance(a, list) or not isinstance(b, list):
        return False
    return {json.dumps(x, sort_keys=True) for x in a} == {
        json.dumps(x, sort_keys=True) for x in b
    }


def __ptap_compare(mode, actual, expected):
    if mode == "unordered_array":
        return __ptap_unordered(actual, expected)
    if mode == "set_equality":
        return __ptap_set_equal(actual, expected)
    return actual == expected  # exact: Python == is deep for list/dict
