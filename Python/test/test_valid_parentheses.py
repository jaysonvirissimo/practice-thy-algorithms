import unittest
import sys
import os
sys.path.append(os.path.join(os.path.dirname(__file__), '..', 'lib'))
from valid_parentheses import valid_parentheses


class TestValidParentheses(unittest.TestCase):
    """Test cases for Valid Parentheses problem"""

    def test_should_return_true_for_simple_parentheses_pair(self):
        """Test case: should return true for simple parentheses pair"""
        expected = True
        result = valid_parentheses('()')
        self.assertEqual(result, expected)
    def test_should_return_true_for_multiple_bracket_types_in_sequence(self):
        """Test case: should return true for multiple bracket types in sequence"""
        expected = True
        result = valid_parentheses('()[]{}')
        self.assertEqual(result, expected)
    def test_should_return_false_for_mismatched_bracket_types(self):
        """Test case: should return false for mismatched bracket types"""
        expected = False
        result = valid_parentheses('(]')
        self.assertEqual(result, expected)
    def test_should_return_true_for_properly_nested_brackets(self):
        """Test case: should return true for properly nested brackets"""
        expected = True
        result = valid_parentheses('([])')
        self.assertEqual(result, expected)
    def test_should_return_false_for_improperly_nested_brackets(self):
        """Test case: should return false for improperly nested brackets"""
        expected = False
        result = valid_parentheses('([)]')
        self.assertEqual(result, expected)


if __name__ == '__main__':
    unittest.main()
