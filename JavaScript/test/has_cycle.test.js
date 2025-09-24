const hasCycle = require('../lib/has_cycle');

test("should return true when tail connects to 1st node (0-indexed)", () => {
  expect(hasCycle([3,2,0,-4], 1)).toBe(true);
});

test("should return true when tail connects to 0th node", () => {
  expect(hasCycle([1,2], 0)).toBe(true);
});

test("should return false for single node with no cycle", () => {
  expect(hasCycle([1], -1)).toBe(false);
});

test("should return false for empty list", () => {
  expect(hasCycle([], -1)).toBe(false);
});
