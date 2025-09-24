import unittest
import sys
import os
sys.path.append(os.path.join(os.path.dirname(__file__), '..', 'lib'))
from container_with_most_water import container_with_most_water


class TestContainerWithMostWater(unittest.TestCase):
    """Test cases for Container With Most Water problem"""

    def test_should_return_49_as_the_maximum_water_area(self):
        """Test case: should return 49 as the maximum water area"""
        expected = 49
        result = container_with_most_water([1, 8, 6, 2, 5, 4, 8, 3, 7])
        self.assertEqual(result, expected)
    def test_should_return_1_for_two_lines_of_equal_height(self):
        """Test case: should return 1 for two lines of equal height"""
        expected = 1
        result = container_with_most_water([1, 1])
        self.assertEqual(result, expected)
    def test_should_return_16_using_the_first_and_last_lines(self):
        """Test case: should return 16 using the first and last lines"""
        expected = 16
        result = container_with_most_water([4, 3, 2, 1, 4])
        self.assertEqual(result, expected)
    def test_should_return_2_using_the_first_and_last_lines(self):
        """Test case: should return 2 using the first and last lines"""
        expected = 2
        result = container_with_most_water([1, 2, 1])
        self.assertEqual(result, expected)


if __name__ == '__main__':
    unittest.main()
