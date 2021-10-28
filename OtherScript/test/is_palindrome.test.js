const isPalindrome = require('../lib/is_palindrome');

test("'ricercar' should return false", () => {
  expect(isPalindrome('ricercar')).toBe(false);
});

test("'racecar' should return true", () => {
  expect(isPalindrome('racecar')).toBe(true);
});
