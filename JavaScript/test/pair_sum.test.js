const pairSum = require('../lib/pair_sum');

test("should return all the pairs that sum to 0", () => {
  let array = [[-1, 1]];
  expect(pairSum([1, 2, -1], 0)).toEqual(array);
});

test("should return all the pairs that sum to 1", () => {
  let array = [[-1, 2]];
  expect(pairSum([1, 2, -1, -1, -2], 1)).toEqual(array);
});
