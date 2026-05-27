# Loaded once when the Ruby VM boots. Defines the data structures and
# comparators the per-run driver relies on. All helper names are prefixed
# `__ptap_` to avoid colliding with user solutions.

require 'json'
require 'set'
require 'stringio'

# Linked-list node, matching the repo's Ruby convention (val / next).
class ListNode
  attr_accessor :val, :next

  def initialize(val = 0, next_node = nil)
    @val = val
    @next = next_node
  end
end

# Build a singly linked list from an array. When `pos` is a valid index the
# tail's `next` is wired back to that node, forming a cycle (has_cycle). A
# negative/nil `pos` or empty array yields an acyclic list / nil.
def __ptap_array_to_list(values, pos = nil)
  return nil if values.nil? || values.empty?

  nodes = values.map { |v| ListNode.new(v) }
  nodes.each_cons(2) { |a, b| a.next = b }
  nodes.last.next = nodes[pos] if pos && pos >= 0 && pos < nodes.length
  nodes.first
end

# Serialize an acyclic list to an array (nil -> []). Guarded against cycles.
def __ptap_list_to_array(head)
  out = []
  node = head
  guard = 0
  while node && (guard += 1) < 100_000
    out << node.val
    node = node.next
  end
  out
end

# Comparators ported to match src/runner/comparison.ts so JS and Ruby agree
# (verified against comparison-vectors.json).
def __ptap_unordered(a, b)
  return false unless a.is_a?(Array) && b.is_a?(Array)

  normalize = lambda do |arr|
    arr.map { |item| item.is_a?(Array) ? item.sort : item }.sort_by(&:to_s)
  end
  normalize.call(a) == normalize.call(b)
end

def __ptap_set_equal(a, b)
  return false unless a.is_a?(Array) && b.is_a?(Array)

  Set.new(a.map(&:to_s)) == Set.new(b.map(&:to_s))
end

def __ptap_compare(mode, actual, expected)
  case mode
  when 'unordered_array' then __ptap_unordered(actual, expected)
  when 'set_equality'    then __ptap_set_equal(actual, expected)
  else                        actual == expected # exact: Array#== is deep
  end
end
