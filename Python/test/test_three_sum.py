import unittest
import sys
import os
sys.path.append(os.path.join(os.path.dirname(__file__), '..', 'lib'))
from three_sum import three_sum


class TestThreeSum(unittest.TestCase):
    """Test cases for Three Sum problem"""

    def test_should_return_1_1_2_1_0_1_for_mixed_positive_and_negative_values(self):
        """Test case: should return [[-1, -1, 2], [-1, 0, 1]] for mixed positive and negative values"""
        expected = [[-1, -1, 2], [-1, 0, 1]]
        result = three_sum([-1, 0, 1, 2, -1, -4])
        self.assertEqual(result, expected)
    def test_should_return_empty_array_when_no_valid_triplets_exist(self):
        """Test case: should return empty array when no valid triplets exist"""
        expected = []
        result = three_sum([0, 1, 1])
        self.assertEqual(result, expected)
    def test_should_return_0_0_0_for_array_of_all_zeros(self):
        """Test case: should return [[0, 0, 0]] for array of all zeros"""
        expected = [[0, 0, 0]]
        result = three_sum([0, 0, 0])
        self.assertEqual(result, expected)


if __name__ == '__main__':
    unittest.main()
