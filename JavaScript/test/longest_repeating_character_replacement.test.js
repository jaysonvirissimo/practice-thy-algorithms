const longestRepeatingCharacterReplacement = require('../lib/longest_repeating_character_replacement');

test("should return 4 by replacing two 'A's with 'B's or vice versa", () => {
  expect(longestRepeatingCharacterReplacement("ABAB", 2)).toBe(4);
});

test("should return 4 by replacing one 'A' to form substring 'BBBB'", () => {
  expect(longestRepeatingCharacterReplacement("AABABBA", 1)).toBe(4);
});

test("should return 2 since we can make any 2 consecutive chars the same", () => {
  expect(longestRepeatingCharacterReplacement("ABCDE", 1)).toBe(2);
});

test("should return 4 since all characters are already the same", () => {
  expect(longestRepeatingCharacterReplacement("AAAA", 0)).toBe(4);
});

test("should return 1 since no replacements allowed", () => {
  expect(longestRepeatingCharacterReplacement("ABAB", 0)).toBe(1);
});
