import unittest
import sys
import os
sys.path.append(os.path.join(os.path.dirname(__file__), '..', 'lib'))
from coin_change import coin_change


class TestCoinChange(unittest.TestCase):
    """Test cases for Coin Change problem"""

    def test_should_return_25_10_1_using_minimum_3_coins_for_36_cents(self):
        """Test case: should return [25, 10, 1] using minimum 3 coins for 36 cents"""
        expected = [25, 10, 1]
        result = coin_change(36, [1, 5, 10, 25])
        self.assertEqual(result, expected)
    def test_should_return_25_10_5_1_1_1_using_minimum_6_coins_for_43_cents(self):
        """Test case: should return [25, 10, 5, 1, 1, 1] using minimum 6 coins for 43 cents"""
        expected = [25, 10, 5, 1, 1, 1]
        result = coin_change(43, [1, 5, 10, 25])
        self.assertEqual(result, expected)
    def test_should_return_25_25_10_5_1_1_using_minimum_6_coins_for_67_cents(self):
        """Test case: should return [25, 25, 10, 5, 1, 1] using minimum 6 coins for 67 cents"""
        expected = [25, 25, 10, 5, 1, 1]
        result = coin_change(67, [1, 5, 10, 25])
        self.assertEqual(result, expected)


if __name__ == '__main__':
    unittest.main()
