const removeNthFromEnd = require('../lib/remove_nth_from_end');

test("should remove 2nd node from end [1,2,3,4,5] -> [1,2,3,5]", () => {
  expect(removeNthFromEnd([1,2,3,4,5], 2)).toBe([1,2,3,5]);
});

test("should remove only node [1] -> []", () => {
  expect(removeNthFromEnd([1], 1)).toBe([]);
});

test("should remove last node [1,2] -> [1]", () => {
  expect(removeNthFromEnd([1,2], 1)).toBe([1]);
});

test("should remove first node [1,2] -> [2]", () => {
  expect(removeNthFromEnd([1,2], 2)).toBe([2]);
});

test("should remove first node [1,2,3,4,5] -> [2,3,4,5]", () => {
  expect(removeNthFromEnd([1,2,3,4,5], 5)).toBe([2,3,4,5]);
});
