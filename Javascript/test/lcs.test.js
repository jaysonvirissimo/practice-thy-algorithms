const lcs = require('../lib/lcs');

test("should return the largest subsum", () => {
  let array = [4, -1, 5, 6, -13, 2];
  expect(lcs(array)).toBe(14);
});

test("should return the largest subsum", () => {
  let array = [-2, 1, -3, 4, -1, 2, 1, -5, 4];
  expect(lcs(array)).toBe(6);
});
