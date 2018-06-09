const recursiveSum = require('../lib/recursive_sum');

test("[1, 2, 3] should return 6", () => {
  expect(recursiveSum([1, 2, 3])).toBe(6);
});

test("[99, 66, 33] should return 198", () => {
  expect(recursiveSum([99, 66, 33])).toBe(198);
});
