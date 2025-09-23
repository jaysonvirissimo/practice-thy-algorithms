const containsDuplicate = require('../lib/contains_duplicate');

test("should return true when element 1 appears at indices 0 and 3", () => {
  expect(containsDuplicate([1,2,3,1])).toBe(true);
});

test("should return false when all elements are distinct", () => {
  expect(containsDuplicate([1,2,3,4])).toBe(false);
});

test("should return true when multiple elements have duplicates", () => {
  expect(containsDuplicate([1,1,1,3,3,4,3,2,4,2])).toBe(true);
});
