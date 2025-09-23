import unittest
import sys
import os
sys.path.append(os.path.join(os.path.dirname(__file__), '..', 'lib'))
from contains_duplicate import contains_duplicate


class TestContainsDuplicate(unittest.TestCase):
    """Test cases for Contains Duplicate problem"""

    def test_should_return_true_when_element_1_appears_at_indices_0_and_3(self):
        """Test case: should return true when element 1 appears at indices 0 and 3"""
        expected = True
        result = contains_duplicate([1, 2, 3, 1])
        self.assertEqual(result, expected)
    def test_should_return_false_when_all_elements_are_distinct(self):
        """Test case: should return false when all elements are distinct"""
        expected = False
        result = contains_duplicate([1, 2, 3, 4])
        self.assertEqual(result, expected)
    def test_should_return_true_when_multiple_elements_have_duplicates(self):
        """Test case: should return true when multiple elements have duplicates"""
        expected = True
        result = contains_duplicate([1, 1, 1, 3, 3, 4, 3, 2, 4, 2])
        self.assertEqual(result, expected)


if __name__ == '__main__':
    unittest.main()
