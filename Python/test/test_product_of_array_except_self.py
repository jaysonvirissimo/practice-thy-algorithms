import unittest
import sys
import os
sys.path.append(os.path.join(os.path.dirname(__file__), '..', 'lib'))
from product_of_array_except_self import product_of_array_except_self


class TestProductOfArrayExceptSelf(unittest.TestCase):
    """Test cases for Product of Array Except Self problem"""

    def test_should_return_24_12_8_6_where_each_element_is_the_product_of_all_others(self):
        """Test case: should return [24, 12, 8, 6] where each element is the product of all others"""
        expected = [24, 12, 8, 6]
        result = product_of_array_except_self([1, 2, 3, 4])
        self.assertEqual(result, expected)
    def test_should_return_0_0_9_0_0_handling_negative_numbers_and_zero(self):
        """Test case: should return [0, 0, 9, 0, 0] handling negative numbers and zero"""
        expected = [0, 0, 9, 0, 0]
        result = product_of_array_except_self([-1, 1, 0, -3, 3])
        self.assertEqual(result, expected)
    def test_should_return_60_40_30_24_for_consecutive_integer_sequence(self):
        """Test case: should return [60, 40, 30, 24] for consecutive integer sequence"""
        expected = [60, 40, 30, 24]
        result = product_of_array_except_self([2, 3, 4, 5])
        self.assertEqual(result, expected)


if __name__ == '__main__':
    unittest.main()
