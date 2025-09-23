const validParentheses = require('../lib/valid_parentheses');

test("should return true for simple parentheses pair", () => {
  expect(validParentheses("()")).toBe(true);
});

test("should return true for multiple bracket types in sequence", () => {
  expect(validParentheses("()[]{}")).toBe(true);
});

test("should return false for mismatched bracket types", () => {
  expect(validParentheses("(]")).toBe(false);
});

test("should return true for properly nested brackets", () => {
  expect(validParentheses("([])")).toBe(true);
});

test("should return false for improperly nested brackets", () => {
  expect(validParentheses("([)]")).toBe(false);
});
