import unittest
import sys
import os
sys.path.append(os.path.join(os.path.dirname(__file__), '..', 'lib'))
from longest_repeating_character_replacement import longest_repeating_character_replacement


class TestLongestRepeatingCharacterReplacement(unittest.TestCase):
    """Test cases for Longest Repeating Character Replacement problem"""

    def test_should_return_4_by_replacing_two_a_s_with_b_s_or_vice_versa(self):
        """Test case: should return 4 by replacing two 'A's with 'B's or vice versa"""
        expected = 4
        result = longest_repeating_character_replacement('ABAB', 2)
        self.assertEqual(result, expected)
    def test_should_return_4_by_replacing_one_a_to_form_substring_bbbb(self):
        """Test case: should return 4 by replacing one 'A' to form substring 'BBBB'"""
        expected = 4
        result = longest_repeating_character_replacement('AABABBA', 1)
        self.assertEqual(result, expected)
    def test_should_return_2_since_we_can_make_any_2_consecutive_chars_the_same(self):
        """Test case: should return 2 since we can make any 2 consecutive chars the same"""
        expected = 2
        result = longest_repeating_character_replacement('ABCDE', 1)
        self.assertEqual(result, expected)
    def test_should_return_4_since_all_characters_are_already_the_same(self):
        """Test case: should return 4 since all characters are already the same"""
        expected = 4
        result = longest_repeating_character_replacement('AAAA', 0)
        self.assertEqual(result, expected)
    def test_should_return_1_since_no_replacements_allowed(self):
        """Test case: should return 1 since no replacements allowed"""
        expected = 1
        result = longest_repeating_character_replacement('ABAB', 0)
        self.assertEqual(result, expected)


if __name__ == '__main__':
    unittest.main()
