import unittest
import sys
import os
sys.path.append(os.path.join(os.path.dirname(__file__), '..', 'lib'))
from group_anagrams import group_anagrams


class TestGroupAnagrams(unittest.TestCase):
    """Test cases for Group Anagrams problem"""
    def assertEqualUnordered(self, received, expected):
        """Assert that two arrays have the same elements regardless of order."""
        if not isinstance(received, list) or not isinstance(expected, list):
            self.fail("Both values must be lists for unordered comparison")

        # For nested arrays (like Group Anagrams), sort each sub-array before comparison
        def sort_nested(arr):
            return sorted([
                sorted(item) if isinstance(item, list) else item
                for item in arr
            ], key=lambda x: str(x))

        sorted_received = sort_nested(received)
        sorted_expected = sort_nested(expected)

        self.assertEqual(sorted_received, sorted_expected,
                        f"Arrays should have same elements regardless of order.\n"
                        f"Received: {received}\n"
                        f"Expected: {expected}")

    def assertEqualAsSet(self, received, expected):
        """Assert that two arrays have the same unique elements (treating as sets)."""
        if not isinstance(received, list) or not isinstance(expected, list):
            self.fail("Both values must be lists for set comparison")

        set_received = set(str(item) for item in received)
        set_expected = set(str(item) for item in expected)

        self.assertEqual(set_received, set_expected,
                        f"Arrays should have same unique elements (treating as sets).\n"
                        f"Received: {received}\n"
                        f"Expected: {expected}")


    def test_should_group_anagrams_correctly_with_mixed_groups(self):
        """Test case: should group anagrams correctly with mixed groups"""
        expected = [['eat', 'tea', 'ate'], ['tan', 'nat'], ['bat']]
        result = group_anagrams(['eat', 'tea', 'tan', 'ate', 'nat', 'bat'])
        self.assertEqualUnordered(result, expected)
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
