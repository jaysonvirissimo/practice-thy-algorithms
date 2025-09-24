"""
Longest Substring Without Repeating Characters

Implement a sliding window algorithm to determine the maximum length of a substring
that contains no duplicate characters. Given a string consisting of English letters,
digits, symbols, and spaces, design an efficient solution that identifies the longest
contiguous sequence where each character appears at most once. The algorithm should
employ a two-pointer technique with a hash set or hash map to track character
occurrences within the current window. Optimize the solution to handle strings with
up to 50,000 characters efficiently by dynamically adjusting the window boundaries
when duplicates are encountered.

Time Complexity: O(n)
Space Complexity: O(min(m, n)) where m is the size of the character set

Args:
    s (str): String consisting of English letters, digits, symbols and spaces

Returns:
    int: Length of the longest substring without repeating characters

Example 1:
Input: s = "abcabcbb"
Output: 3
Explanation: The answer is "abc", with the length of 3.

Example 2:
Input: s = "bbbbb"
Output: 1
Explanation: The answer is "b", with the length of 1.

Example 3:
Input: s = "pwwkew"
Output: 3
Explanation: The answer is "wke", with the length of 3.
Notice that the answer must be a substring, "pwke" is a subsequence and not a substring.

Constraints:
- 0 <= s.length <= 5 * 10^4
- s consists of English letters, digits, symbols and spaces
"""


def length_of_longest_substring(s):
    """
    Find the length of the longest substring without repeating characters.

    Args:
        s (str): String consisting of English letters, digits, symbols and spaces

    Returns:
        int: Length of the longest substring without repeating characters
    """
    # Implementation goes here
    pass