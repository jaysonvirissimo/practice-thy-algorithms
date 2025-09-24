import unittest
import sys
import os
sys.path.append(os.path.join(os.path.dirname(__file__), '..', 'lib'))
from palindromic_substrings import palindromic_substrings


class TestPalindromicSubstrings(unittest.TestCase):
    """Test cases for Palindromic Substrings problem"""

    def test_should_return_3_for_palindromes_a_b_c(self):
        """Test case: should return 3 for palindromes 'a', 'b', 'c'"""
        expected = 3
        result = palindromic_substrings('abc')
        self.assertEqual(result, expected)
    def test_should_return_6_for_palindromes_a_a_a_aa_aa_aaa(self):
        """Test case: should return 6 for palindromes 'a', 'a', 'a', 'aa', 'aa', 'aaa'"""
        expected = 6
        result = palindromic_substrings('aaa')
        self.assertEqual(result, expected)
    def test_should_return_4_for_palindromes_a_b_a_aba(self):
        """Test case: should return 4 for palindromes 'a', 'b', 'a', 'aba'"""
        expected = 4
        result = palindromic_substrings('aba')
        self.assertEqual(result, expected)
    def test_should_return_10_for_all_palindromic_substrings_in_racecar(self):
        """Test case: should return 10 for all palindromic substrings in 'racecar'"""
        expected = 10
        result = palindromic_substrings('racecar')
        self.assertEqual(result, expected)
    def test_should_return_1_for_single_character_a(self):
        """Test case: should return 1 for single character 'a'"""
        expected = 1
        result = palindromic_substrings('a')
        self.assertEqual(result, expected)
    def test_should_return_7_for_palindromes_including_bcb_and_abcba(self):
        """Test case: should return 7 for palindromes including 'bcb' and 'abcba'"""
        expected = 7
        result = palindromic_substrings('abcba')
        self.assertEqual(result, expected)


if __name__ == '__main__':
    unittest.main()
