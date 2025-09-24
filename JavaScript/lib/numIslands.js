/**
 * Number of Islands
 *
 * Implement a graph traversal algorithm to count the number of distinct islands in a 2D
 * binary grid. Given an m x n matrix where '1' represents land and '0' represents water,
 * determine how many separate landmasses exist. An island is defined as a group of adjacent
 * land cells connected horizontally or vertically, surrounded by water. Design an efficient
 * solution using depth-first search (DFS) or breadth-first search (BFS) to explore and mark
 * visited land cells. The algorithm should handle grids with up to 300x300 dimensions and
 * assume all grid edges are surrounded by water.
 *
 * Time Complexity: O(m*n) where m and n are grid dimensions
 * Space Complexity: O(m*n) for recursion stack in worst case
 *
 * @param {string[][]} grid - 2D binary grid where '1' represents land and '0' represents water
 * @returns {number} - The number of islands
 *
 * Example 1:
 * Input: grid = [
 *   ["1","1","1","1","0"],
 *   ["1","1","0","1","0"],
 *   ["1","1","0","0","0"],
 *   ["0","0","0","0","0"]
 * ]
 * Output: 1
 *
 * Example 2:
 * Input: grid = [
 *   ["1","1","0","0","0"],
 *   ["1","1","0","0","0"],
 *   ["0","0","1","0","0"],
 *   ["0","0","0","1","1"]
 * ]
 * Output: 3
 *
 * Constraints:
 * - m == grid.length
 * - n == grid[i].length
 * - 1 <= m, n <= 300
 * - grid[i][j] is '0' or '1'
 */

function numIslands(grid) {
    // Implementation goes here
}

module.exports = { numIslands };