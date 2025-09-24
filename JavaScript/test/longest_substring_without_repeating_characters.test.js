const longestSubstringWithoutRepeatingCharacters = require('../lib/longest_substring_without_repeating_characters');

test("should return 3 for substring 'abc'", () => {
  expect(longestSubstringWithoutRepeatingCharacters("abcabcbb")).toBe(3);
});

test("should return 1 for substring 'b'", () => {
  expect(longestSubstringWithoutRepeatingCharacters("bbbbb")).toBe(1);
});

test("should return 3 for substring 'wke'", () => {
  expect(longestSubstringWithoutRepeatingCharacters("pwwkew")).toBe(3);
});

test("should return 0 for empty string", () => {
  expect(longestSubstringWithoutRepeatingCharacters("")).toBe(0);
});

test("should return 1 for single space character", () => {
  expect(longestSubstringWithoutRepeatingCharacters(" ")).toBe(1);
});

test("should return 2 for two distinct characters", () => {
  expect(longestSubstringWithoutRepeatingCharacters("au")).toBe(2);
});
