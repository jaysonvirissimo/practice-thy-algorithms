const uniquePaths = require('../lib/unique_paths');

test("should return 28 unique paths for 3x7 grid", () => {
  expect(uniquePaths(3, 7)).toBe(28);
});

test("should return 364 unique paths for 4x12 grid", () => {
  expect(uniquePaths(4, 12)).toBe(364);
});

test("should return 3060 unique paths for 5x15 grid", () => {
  expect(uniquePaths(5, 15)).toBe(3060);
});
