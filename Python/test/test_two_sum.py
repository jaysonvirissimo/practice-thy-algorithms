import unittest
import sys
import os
sys.path.append(os.path.join(os.path.dirname(__file__), '..', 'lib'))
from two_sum import two_sum


class TestTwoSum(unittest.TestCase):
    """Test cases for Two Sum problem"""

    def test_should_return_all_the_pairs_that_sum_to_0(self):
        """Test case: should return all the pairs that sum to 0"""
        expected = [[-1, 1]]
        result = two_sum([1, 2, -1], 0)
        self.assertEqual(result, expected)
    def test_should_return_all_the_pairs_that_sum_to_1(self):
        """Test case: should return all the pairs that sum to 1"""
        expected = [[-1, 2]]
        result = two_sum([1, 2, -1, -1, -2], 1)
        self.assertEqual(result, expected)


if __name__ == '__main__':
    unittest.main()
