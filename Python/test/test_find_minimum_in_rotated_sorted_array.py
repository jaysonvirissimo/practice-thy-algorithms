import unittest
import sys
import os
sys.path.append(os.path.join(os.path.dirname(__file__), '..', 'lib'))
from find_minimum_in_rotated_sorted_array import find_minimum_in_rotated_sorted_array


class TestFindMinimumInRotatedSortedArray(unittest.TestCase):
    """Test cases for Find Minimum in Rotated Sorted Array problem"""

    def test_should_return_1_from_rotated_array_3_4_5_1_2(self):
        """Test case: should return 1 from rotated array [3,4,5,1,2]"""
        expected = 1
        result = find_minimum_in_rotated_sorted_array([3, 4, 5, 1, 2])
        self.assertEqual(result, expected)
    def test_should_return_0_from_rotated_array_4_5_6_7_0_1_2(self):
        """Test case: should return 0 from rotated array [4,5,6,7,0,1,2]"""
        expected = 0
        result = find_minimum_in_rotated_sorted_array([4, 5, 6, 7, 0, 1, 2])
        self.assertEqual(result, expected)
    def test_should_return_11_from_non_rotated_array_11_13_15_17(self):
        """Test case: should return 11 from non-rotated array [11,13,15,17]"""
        expected = 11
        result = find_minimum_in_rotated_sorted_array([11, 13, 15, 17])
        self.assertEqual(result, expected)
    def test_should_return_1_from_small_rotated_array_2_1(self):
        """Test case: should return 1 from small rotated array [2,1]"""
        expected = 1
        result = find_minimum_in_rotated_sorted_array([2, 1])
        self.assertEqual(result, expected)
    def test_should_return_1_from_single_element_array_1(self):
        """Test case: should return 1 from single element array [1]"""
        expected = 1
        result = find_minimum_in_rotated_sorted_array([1])
        self.assertEqual(result, expected)


if __name__ == '__main__':
    unittest.main()
