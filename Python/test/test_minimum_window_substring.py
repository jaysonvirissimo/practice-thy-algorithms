import unittest
import sys
import os
sys.path.append(os.path.join(os.path.dirname(__file__), '..', 'lib'))
from minimum_window_substring import minimum_window_substring


class TestMinimumWindowSubstring(unittest.TestCase):
    """Test cases for Minimum Window Substring problem"""

    def test_should_return_banc_as_the_minimum_window_containing_all_characters(self):
        """Test case: should return 'BANC' as the minimum window containing all characters"""
        expected = 'BANC'
        result = minimum_window_substring('ADOBECODEBANC', 'ABC')
        self.assertEqual(result, expected)
    def test_should_return_entire_string_when_it_matches_target(self):
        """Test case: should return entire string when it matches target"""
        expected = 'a'
        result = minimum_window_substring('a', 'a')
        self.assertEqual(result, expected)
    def test_should_return_empty_string_when_target_has_more_characters_than_source(self):
        """Test case: should return empty string when target has more characters than source"""
        expected = ''
        result = minimum_window_substring('a', 'aa')
        self.assertEqual(result, expected)
    def test_should_return_single_character_when_it_s_the_only_requirement(self):
        """Test case: should return single character when it's the only requirement"""
        expected = 'b'
        result = minimum_window_substring('ab', 'b')
        self.assertEqual(result, expected)
    def test_should_return_entire_string_when_all_characters_are_needed(self):
        """Test case: should return entire string when all characters are needed"""
        expected = 'abc'
        result = minimum_window_substring('abc', 'cba')
        self.assertEqual(result, expected)
    def test_should_handle_duplicate_characters_correctly(self):
        """Test case: should handle duplicate characters correctly"""
        expected = 'ADOBECODEBA'
        result = minimum_window_substring('ADOBECODEBANC', 'AABC')
        self.assertEqual(result, expected)


if __name__ == '__main__':
    unittest.main()
