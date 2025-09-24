import unittest
import sys
import os
sys.path.append(os.path.join(os.path.dirname(__file__), '..', 'lib'))
from reverse_linked_list import reverse_linked_list


class TestReverseLinkedList(unittest.TestCase):
    """Test cases for Reverse Linked List problem"""

    def test_should_reverse_a_5_node_list_from_1_2_3_4_5_to_5_4_3_2_1(self):
        """Test case: should reverse a 5-node list from [1,2,3,4,5] to [5,4,3,2,1]"""
        expected = [5, 4, 3, 2, 1]
        result = reverse_linked_list([1, 2, 3, 4, 5])
        self.assertEqual(result, expected)
    def test_should_reverse_a_2_node_list_from_1_2_to_2_1(self):
        """Test case: should reverse a 2-node list from [1,2] to [2,1]"""
        expected = [2, 1]
        result = reverse_linked_list([1, 2])
        self.assertEqual(result, expected)
    def test_should_handle_empty_list_and_return_empty_list(self):
        """Test case: should handle empty list and return empty list"""
        expected = []
        result = reverse_linked_list([])
        self.assertEqual(result, expected)


if __name__ == '__main__':
    unittest.main()
