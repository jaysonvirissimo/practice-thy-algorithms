import unittest
import sys
import os
sys.path.append(os.path.join(os.path.dirname(__file__), '..', 'lib'))
from number_of_islands import number_of_islands


class TestNumberOfIslands(unittest.TestCase):
    """Test cases for Number of Islands problem"""

    def test_should_return_1_for_a_single_connected_island(self):
        """Test case: should return 1 for a single connected island"""
        expected = 1
        result = number_of_islands([['1', '1', '1', '1', '0'], ['1', '1', '0', '1', '0'], ['1', '1', '0', '0', '0'], ['0', '0', '0', '0', '0']])
        self.assertEqual(result, expected)
    def test_should_return_3_for_three_separate_islands(self):
        """Test case: should return 3 for three separate islands"""
        expected = 3
        result = number_of_islands([['1', '1', '0', '0', '0'], ['1', '1', '0', '0', '0'], ['0', '0', '1', '0', '0'], ['0', '0', '0', '1', '1']])
        self.assertEqual(result, expected)
    def test_should_return_1_for_one_large_connected_island(self):
        """Test case: should return 1 for one large connected island"""
        expected = 1
        result = number_of_islands([['1', '0', '1', '1', '1'], ['1', '0', '1', '0', '1'], ['1', '1', '1', '0', '1']])
        self.assertEqual(result, expected)
    def test_should_return_0_for_grid_with_no_land(self):
        """Test case: should return 0 for grid with no land"""
        expected = 0
        result = number_of_islands([['0', '0', '0', '0'], ['0', '0', '0', '0'], ['0', '0', '0', '0']])
        self.assertEqual(result, expected)
    def test_should_return_1_for_single_land_cell(self):
        """Test case: should return 1 for single land cell"""
        expected = 1
        result = number_of_islands([['1']])
        self.assertEqual(result, expected)


if __name__ == '__main__':
    unittest.main()
