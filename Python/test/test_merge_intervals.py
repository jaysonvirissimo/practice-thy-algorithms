import unittest
import sys
import os
sys.path.append(os.path.join(os.path.dirname(__file__), '..', 'lib'))
from merge_intervals import merge_intervals


class TestMergeIntervals(unittest.TestCase):
    """Test cases for Merge Intervals problem"""

    def test_should_merge_overlapping_intervals_1_3_and_2_6_into_1_6(self):
        """Test case: should merge overlapping intervals [1,3] and [2,6] into [1,6]"""
        expected = [[1, 6], [8, 10], [15, 18]]
        result = merge_intervals([[1, 3], [2, 6], [8, 10], [15, 18]])
        self.assertEqual(result, expected)
    def test_should_merge_touching_intervals_1_4_and_4_5_into_1_5(self):
        """Test case: should merge touching intervals [1,4] and [4,5] into [1,5]"""
        expected = [[1, 5]]
        result = merge_intervals([[1, 4], [4, 5]])
        self.assertEqual(result, expected)
    def test_should_merge_overlapping_intervals_after_sorting_4_7_and_1_4_into_1_7(self):
        """Test case: should merge overlapping intervals after sorting [4,7] and [1,4] into [1,7]"""
        expected = [[1, 7]]
        result = merge_intervals([[4, 7], [1, 4]])
        self.assertEqual(result, expected)


if __name__ == '__main__':
    unittest.main()
