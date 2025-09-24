"""
Container With Most Water

Design an algorithm to find two vertical lines that together with the x-axis form
a container capable of holding the maximum amount of water. Given an integer array
representing the height of n vertical lines drawn at positions (i, 0) to (i, height[i]),
determine the optimal pair of lines that maximizes the water volume. The container's
capacity is determined by the shorter of the two selected lines multiplied by the
distance between them. Note that the container cannot be tilted. Implement an efficient
solution that can handle arrays with up to 10^5 elements containing heights from 0 to 10^4.

Time Complexity: O(n)
Space Complexity: O(1)

Args:
    height (List[int]): Array of integers representing the height of vertical lines

Returns:
    int: The maximum amount of water a container can store

Example 1:
Input: height = [1,8,6,2,5,4,8,3,7]
Output: 49
Explanation: The above vertical lines are represented by array [1,8,6,2,5,4,8,3,7].
In this case, the max area of water (blue section) the container can contain is 49.

Example 2:
Input: height = [1,1]
Output: 1

Constraints:
- n == height.length
- 2 <= n <= 10^5
- 0 <= height[i] <= 10^4
"""


def max_area(height):
    """
    Find the maximum amount of water a container can store.

    Args:
        height (List[int]): Array of integers representing the height of vertical lines

    Returns:
        int: The maximum amount of water a container can store
    """
    # Implementation goes here
    pass