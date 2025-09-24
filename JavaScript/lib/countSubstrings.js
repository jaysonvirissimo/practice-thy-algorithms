/**
 * Palindromic Substrings
 *
 * Develop an algorithm to count the total number of palindromic substrings within a
 * given string. A palindrome is defined as a sequence that reads identically in both
 * forward and reverse directions. A substring represents any contiguous sequence of
 * characters from the original string. Implement an efficient solution using the
 * expand-around-centers technique, which examines each possible center point (including
 * positions between characters for even-length palindromes) and expands outward while
 * characters match. Design the algorithm to handle strings with up to 1000 lowercase
 * English letters optimally.
 *
 * Time Complexity: O(n^2)
 * Space Complexity: O(1)
 *
 * @param {string} s - String consisting of lowercase English letters
 * @returns {number} - The number of palindromic substrings
 *
 * Example 1:
 * Input: s = "abc"
 * Output: 3
 * Explanation: Three palindromic strings: "a", "b", "c".
 *
 * Example 2:
 * Input: s = "aaa"
 * Output: 6
 * Explanation: Six palindromic strings: "a", "a", "a", "aa", "aa", "aaa".
 *
 * Constraints:
 * - 1 <= s.length <= 1000
 * - s consists of lowercase English letters
 */

function countSubstrings(s) {
    // Implementation goes here
}

module.exports = { countSubstrings };