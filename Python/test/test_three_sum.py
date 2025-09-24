import unittest
import sys
import os
sys.path.append(os.path.join(os.path.dirname(__file__), '..', 'lib'))
from three_sum import three_sum


class TestThreeSum(unittest.TestCase):
    """Test cases for Three Sum problem"""
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


    def test_should_return_1_1_2_1_0_1_for_mixed_positive_and_negative_values(self):
        """Test case: should return [[-1, -1, 2], [-1, 0, 1]] for mixed positive and negative values"""
        expected = [[-1, -1, 2], [-1, 0, 1]]
        result = three_sum([-1, 0, 1, 2, -1, -4])
        self.assertEqualUnordered(result, expected)
    def test_should_return_empty_array_when_no_valid_triplets_exist(self):
        """Test case: should return empty array when no valid triplets exist"""
        expected = []
        result = three_sum([0, 1, 1])
        self.assertEqual(result, expected)
    def test_should_return_0_0_0_for_array_of_all_zeros(self):
        """Test case: should return [[0, 0, 0]] for array of all zeros"""
        expected = [[0, 0, 0]]
        result = three_sum([0, 0, 0])
        self.assertEqual(result, expected)


if __name__ == '__main__':
    unittest.main()
