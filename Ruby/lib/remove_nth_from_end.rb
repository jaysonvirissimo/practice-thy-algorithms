# frozen_string_literal: true

# Remove Nth Node From End of List
#
# Implement an algorithm to remove the nth node from the end of a singly linked list
# and return the modified list's head. Design an efficient one-pass solution using the
# two-pointer technique, where one pointer advances n steps ahead of the other to
# maintain the correct distance. This approach eliminates the need to first calculate
# the list length. Handle edge cases including removing the head node and working with
# lists containing only one element. The solution should process linked lists with up
# to 30 nodes containing values from 0 to 100.
#
# Time Complexity: O(n)
# Space Complexity: O(1)
#
# @param head [ListNode] Head node of the singly linked list
# @param n [Integer] Position from the end of the list (1-indexed)
# @return [ListNode] Head of the modified linked list
#
# Example 1:
# Input: head = [1,2,3,4,5], n = 2
# Output: [1,2,3,5]
#
# Example 2:
# Input: head = [1], n = 1
# Output: []
#
# Example 3:
# Input: head = [1,2], n = 1
# Output: [1]
#
# Constraints:
# - The number of nodes in the list is sz
# - 1 <= sz <= 30
# - 0 <= Node.val <= 100
# - 1 <= n <= sz
#
# Follow up: Could you do this in one pass?

def remove_nth_from_end(head, n)
  # Implementation goes here
end