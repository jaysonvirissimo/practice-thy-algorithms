import unittest
import sys
import os
sys.path.append(os.path.join(os.path.dirname(__file__), '..', 'lib'))
from two_sum import two_sum


class TestTwoSum(unittest.TestCase):
    """Test cases for Two Sum problem"""

    def test_should_return_indices_0_1_because_nums_0_nums_1_2_7_9(self):
        """Test case: should return indices [0, 1] because nums[0] + nums[1] = 2 + 7 = 9"""
        expected = [0, 1]
        result = two_sum([2, 7, 11, 15], 9)
        self.assertEqual(result, expected)
    def test_should_return_indices_1_2_because_nums_1_nums_2_2_4_6(self):
        """Test case: should return indices [1, 2] because nums[1] + nums[2] = 2 + 4 = 6"""
        expected = [1, 2]
        result = two_sum([3, 2, 4], 6)
        self.assertEqual(result, expected)
    def test_should_return_indices_0_1_because_nums_0_nums_1_3_3_6(self):
        """Test case: should return indices [0, 1] because nums[0] + nums[1] = 3 + 3 = 6"""
        expected = [0, 1]
        result = two_sum([3, 3], 6)
        self.assertEqual(result, expected)


if __name__ == '__main__':
    unittest.main()
