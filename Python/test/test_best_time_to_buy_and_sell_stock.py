import unittest
import sys
import os
sys.path.append(os.path.join(os.path.dirname(__file__), '..', 'lib'))
from best_time_to_buy_and_sell_stock import best_time_to_buy_and_sell_stock


class TestBestTimeToBuyAndSellStock(unittest.TestCase):
    """Test cases for Best Time to Buy and Sell Stock problem"""

    def test_should_return_5_by_buying_at_price_1_and_selling_at_price_6(self):
        """Test case: should return 5 by buying at price 1 and selling at price 6"""
        expected = 5
        result = best_time_to_buy_and_sell_stock([7, 1, 5, 3, 6, 4])
        self.assertEqual(result, expected)
    def test_should_return_0_when_prices_only_decrease(self):
        """Test case: should return 0 when prices only decrease"""
        expected = 0
        result = best_time_to_buy_and_sell_stock([7, 6, 4, 3, 1])
        self.assertEqual(result, expected)
    def test_should_return_4_by_buying_at_price_1_and_selling_at_price_5(self):
        """Test case: should return 4 by buying at price 1 and selling at price 5"""
        expected = 4
        result = best_time_to_buy_and_sell_stock([1, 2, 3, 4, 5])
        self.assertEqual(result, expected)


if __name__ == '__main__':
    unittest.main()
