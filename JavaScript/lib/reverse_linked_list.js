/*
 * Reverse Linked List
 *
 * Implement an algorithm to reverse a singly linked list by modifying the direction
 * of node connections. Given the head node of a linked list, rearrange the pointers
 * so that the list traversal order is completely inverted. The original head becomes
 * the tail, and the original tail becomes the new head. Design both iterative and
 * recursive approaches to solve this fundamental linked list manipulation problem.
 * Handle edge cases including empty lists and single-node lists. The solution should
 * operate within the constraints of 0 to 5000 nodes with values ranging from -5000 to 5000.
 *
 * Complexity: O(n)
 *
 * @param {ListNode} head - Head node of the singly linked list to reverse
 * @returns {ListNode} - Head of the reversed linked list
 */

// ListNode definition
class ListNode {
    constructor(val, next) {
        this.val = (val === undefined ? 0 : val);
        this.next = (next === undefined ? null : next);
    }
}

function reverseList(head) {

}

// Wrapper function for the test interface
function reverseLinkedList(arr) {

}

module.exports = reverseLinkedList;