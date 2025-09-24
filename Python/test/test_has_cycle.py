import unittest
import sys
import os
sys.path.append(os.path.join(os.path.dirname(__file__), '..', 'lib'))
from has_cycle import has_cycle


class TestHasCycle(unittest.TestCase):
    """Test cases for Detect Cycle in Linked List problem"""

    def test_should_return_true_when_tail_connects_to_1st_node_0_indexed(self):
        """Test case: should return true when tail connects to 1st node (0-indexed)"""
        expected = True
        result = has_cycle([3, 2, 0, -4], 1)
        self.assertEqual(result, expected)
    def test_should_return_true_when_tail_connects_to_0th_node(self):
        """Test case: should return true when tail connects to 0th node"""
        expected = True
        result = has_cycle([1, 2], 0)
        self.assertEqual(result, expected)
    def test_should_return_false_for_single_node_with_no_cycle(self):
        """Test case: should return false for single node with no cycle"""
        expected = False
        result = has_cycle([1], -1)
        self.assertEqual(result, expected)
    def test_should_return_false_for_empty_list(self):
        """Test case: should return false for empty list"""
        expected = False
        result = has_cycle([], -1)
        self.assertEqual(result, expected)


if __name__ == '__main__':
    unittest.main()
