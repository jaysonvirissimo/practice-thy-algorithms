import unittest
import sys
import os
sys.path.append(os.path.join(os.path.dirname(__file__), '..', 'lib'))
from group_anagrams import group_anagrams


class TestGroupAnagrams(unittest.TestCase):
    """Test cases for Group Anagrams problem"""

    def test_should_group_anagrams_correctly_with_mixed_groups(self):
        """Test case: should group anagrams correctly with mixed groups"""
        expected = [['eat', 'tea', 'ate'], ['tan', 'nat'], ['bat']]
        result = group_anagrams(['eat', 'tea', 'tan', 'ate', 'nat', 'bat'])
        self.assertEqual(result, expected)
    def test_should_handle_single_empty_string(self):
        """Test case: should handle single empty string"""
        expected = [['']]
        result = group_anagrams([''])
        self.assertEqual(result, expected)
    def test_should_handle_single_character_string(self):
        """Test case: should handle single character string"""
        expected = [['a']]
        result = group_anagrams(['a'])
        self.assertEqual(result, expected)


if __name__ == '__main__':
    unittest.main()
