import unittest
import sys
import os
sys.path.append(os.path.join(os.path.dirname(__file__), '..', 'lib'))
from pacific_atlantic_water_flow import pacific_atlantic_water_flow


class TestPacificAtlanticWaterFlow(unittest.TestCase):
    """Test cases for Pacific Atlantic Water Flow problem"""
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


    def test_should_return_coordinates_reachable_by_both_oceans(self):
        """Test case: should return coordinates reachable by both oceans"""
        expected = [[0, 4], [1, 3], [1, 4], [2, 2], [3, 0], [3, 1], [4, 0]]
        result = pacific_atlantic_water_flow([[1, 2, 2, 3, 5], [3, 2, 3, 4, 4], [2, 4, 5, 3, 1], [6, 7, 1, 4, 5], [5, 1, 1, 2, 4]])
        self.assertEqualUnordered(result, expected)
    def test_should_return_0_0_for_single_cell_touching_both_oceans(self):
        """Test case: should return [0,0] for single cell touching both oceans"""
        expected = [[0, 0]]
        result = pacific_atlantic_water_flow([[1]])
        self.assertEqual(result, expected)
    def test_should_return_all_cells_for_2x2_grid(self):
        """Test case: should return all cells for 2x2 grid"""
        expected = [[0, 0], [0, 1], [1, 0], [1, 1]]
        result = pacific_atlantic_water_flow([[1, 2], [2, 1]])
        self.assertEqualUnordered(result, expected)
    def test_should_return_corner_and_edge_cells_for_increasing_heights(self):
        """Test case: should return corner and edge cells for increasing heights"""
        expected = [[0, 2], [1, 2], [2, 0], [2, 1], [2, 2]]
        result = pacific_atlantic_water_flow([[1, 2, 3], [4, 5, 6], [7, 8, 9]])
        self.assertEqualUnordered(result, expected)


if __name__ == '__main__':
    unittest.main()
