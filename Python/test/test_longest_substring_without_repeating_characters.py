import unittest
import sys
import os
sys.path.append(os.path.join(os.path.dirname(__file__), '..', 'lib'))
from longest_substring_without_repeating_characters import longest_substring_without_repeating_characters


class TestLongestSubstringWithoutRepeatingCharacters(unittest.TestCase):
    """Test cases for Longest Substring Without Repeating Characters problem"""

    def test_should_return_3_for_substring_abc(self):
        """Test case: should return 3 for substring 'abc'"""
        expected = 3
        result = longest_substring_without_repeating_characters('abcabcbb')
        self.assertEqual(result, expected)
    def test_should_return_1_for_substring_b(self):
        """Test case: should return 1 for substring 'b'"""
        expected = 1
        result = longest_substring_without_repeating_characters('bbbbb')
        self.assertEqual(result, expected)
    def test_should_return_3_for_substring_wke(self):
        """Test case: should return 3 for substring 'wke'"""
        expected = 3
        result = longest_substring_without_repeating_characters('pwwkew')
        self.assertEqual(result, expected)
    def test_should_return_0_for_empty_string(self):
        """Test case: should return 0 for empty string"""
        expected = 0
        result = longest_substring_without_repeating_characters('')
        self.assertEqual(result, expected)
    def test_should_return_1_for_single_space_character(self):
        """Test case: should return 1 for single space character"""
        expected = 1
        result = longest_substring_without_repeating_characters(' ')
        self.assertEqual(result, expected)
    def test_should_return_2_for_two_distinct_characters(self):
        """Test case: should return 2 for two distinct characters"""
        expected = 2
        result = longest_substring_without_repeating_characters('au')
        self.assertEqual(result, expected)


if __name__ == '__main__':
    unittest.main()
