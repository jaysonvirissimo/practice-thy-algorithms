import unittest
import sys
import os
sys.path.append(os.path.join(os.path.dirname(__file__), '..', 'lib'))
from maximum_subarray import maximum_subarray


class TestMaximumSubarray(unittest.TestCase):
    """Test cases for Maximum Subarray problem"""

    def test_should_return_the_largest_subsum(self):
        """Test case: should return the largest subsum"""
        expected = 14
        result = maximum_subarray([4, -1, 5, 6, -13, 2])
        self.assertEqual(result, expected)
    def test_should_return_the_largest_subsum(self):
        """Test case: should return the largest subsum"""
        expected = 6
        result = maximum_subarray([-2, 1, -3, 4, -1, 2, 1, -5, 4])
        self.assertEqual(result, expected)


if __name__ == '__main__':
    unittest.main()
