const palindromicSubstrings = require('../lib/palindromic_substrings');

test("should return 3 for palindromes 'a', 'b', 'c'", () => {
  expect(palindromicSubstrings("abc")).toBe(3);
});

test("should return 6 for palindromes 'a', 'a', 'a', 'aa', 'aa', 'aaa'", () => {
  expect(palindromicSubstrings("aaa")).toBe(6);
});

test("should return 4 for palindromes 'a', 'b', 'a', 'aba'", () => {
  expect(palindromicSubstrings("aba")).toBe(4);
});

test("should return 10 for all palindromic substrings in 'racecar'", () => {
  expect(palindromicSubstrings("racecar")).toBe(10);
});

test("should return 1 for single character 'a'", () => {
  expect(palindromicSubstrings("a")).toBe(1);
});

test("should return 7 for palindromes including 'bcb' and 'abcba'", () => {
  expect(palindromicSubstrings("abcba")).toBe(7);
});
