const threeSum = require('../lib/three_sum');

test("should return [[-1, -1, 2], [-1, 0, 1]] for mixed positive and negative values", () => {
  let array = [[-1,-1,2],[-1,0,1]];
  expect(threeSum([-1,0,1,2,-1,-4])).toEqual(array);
});

test("should return empty array when no valid triplets exist", () => {
  let array = [];
  expect(threeSum([0,1,1])).toEqual(array);
});

test("should return [[0, 0, 0]] for array of all zeros", () => {
  let array = [[0,0,0]];
  expect(threeSum([0,0,0])).toEqual(array);
});
