import unittest
import sys
import os
sys.path.append(os.path.join(os.path.dirname(__file__), '..', 'lib'))
from unique_paths import unique_paths


class TestUniquePaths(unittest.TestCase):
    """Test cases for Unique Paths problem"""

    def test_should_return_28_unique_paths_for_3x7_grid(self):
        """Test case: should return 28 unique paths for 3x7 grid"""
        expected = 28
        result = unique_paths(3, 7)
        self.assertEqual(result, expected)
    def test_should_return_364_unique_paths_for_4x12_grid(self):
        """Test case: should return 364 unique paths for 4x12 grid"""
        expected = 364
        result = unique_paths(4, 12)
        self.assertEqual(result, expected)
    def test_should_return_3060_unique_paths_for_5x15_grid(self):
        """Test case: should return 3060 unique paths for 5x15 grid"""
        expected = 3060
        result = unique_paths(5, 15)
        self.assertEqual(result, expected)


if __name__ == '__main__':
    unittest.main()
