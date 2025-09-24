import unittest
import sys
import os
sys.path.append(os.path.join(os.path.dirname(__file__), '..', 'lib'))
from remove_nth_from_end import remove_nth_from_end


class TestRemoveNthFromEnd(unittest.TestCase):
    """Test cases for Remove Nth Node From End of List problem"""

    def test_should_remove_2nd_node_from_end_1_2_3_4_5_1_2_3_5(self):
        """Test case: should remove 2nd node from end [1,2,3,4,5] -> [1,2,3,5]"""
        expected = [1, 2, 3, 5]
        result = remove_nth_from_end([1, 2, 3, 4, 5], 2)
        self.assertEqual(result, expected)
    def test_should_remove_only_node_1(self):
        """Test case: should remove only node [1] -> []"""
        expected = []
        result = remove_nth_from_end([1], 1)
        self.assertEqual(result, expected)
    def test_should_remove_last_node_1_2_1(self):
        """Test case: should remove last node [1,2] -> [1]"""
        expected = [1]
        result = remove_nth_from_end([1, 2], 1)
        self.assertEqual(result, expected)
    def test_should_remove_first_node_1_2_2(self):
        """Test case: should remove first node [1,2] -> [2]"""
        expected = [2]
        result = remove_nth_from_end([1, 2], 2)
        self.assertEqual(result, expected)
    def test_should_remove_first_node_1_2_3_4_5_2_3_4_5(self):
        """Test case: should remove first node [1,2,3,4,5] -> [2,3,4,5]"""
        expected = [2, 3, 4, 5]
        result = remove_nth_from_end([1, 2, 3, 4, 5], 5)
        self.assertEqual(result, expected)


if __name__ == '__main__':
    unittest.main()
