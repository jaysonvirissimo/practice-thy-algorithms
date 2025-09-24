"""
Pacific Atlantic Water Flow

Design an algorithm to identify grid coordinates where rainwater can reach both
Pacific and Atlantic oceans through elevation-based flow. Given an m x n matrix
representing island heights, where the Pacific Ocean borders the left and top edges
while the Atlantic Ocean borders the right and bottom edges, determine all cells
from which water can flow to both oceans. Water flows from higher to lower or equal
elevation cells in four cardinal directions. Implement an efficient solution using
depth-first search (DFS) from ocean boundaries, working backwards to identify
reachable cells. The algorithm should handle grids up to 200x200 with elevations
from 0 to 10^5.

Time Complexity: O(m*n)
Space Complexity: O(m*n) for visited sets

Args:
    heights (List[List[int]]): 2D matrix where heights[r][c] represents elevation of cell (r,c)

Returns:
    List[List[int]]: Array of [row, col] coordinates reachable by both oceans

Example 1:
Input: heights = [[1,2,2,3,5],[3,2,3,4,4],[2,4,5,3,1],[6,7,1,4,5],[5,1,1,2,4]]
Output: [[0,4],[1,3],[1,4],[2,2],[3,0],[3,1],[4,0]]

Example 2:
Input: heights = [[1]]
Output: [[0,0]]
Explanation: The water can flow from the only cell to the Pacific and Atlantic oceans.

Constraints:
- m == heights.length
- n == heights[r].length
- 1 <= m, n <= 200
- 0 <= heights[r][c] <= 10^5
"""


def pacific_atlantic(heights):
    """
    Find coordinates where water can reach both Pacific and Atlantic oceans.

    Args:
        heights (List[List[int]]): 2D matrix where heights[r][c] represents elevation of cell (r,c)

    Returns:
        List[List[int]]: Array of [row, col] coordinates reachable by both oceans
    """
    # Implementation goes here
    pass