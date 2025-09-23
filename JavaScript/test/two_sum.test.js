const twoSum = require('../lib/two_sum');

test("should return indices [0, 1] because nums[0] + nums[1] = 2 + 7 = 9", () => {
  let array = [0,1];
  expect(twoSum([2,7,11,15], 9)).toEqual(array);
});

test("should return indices [1, 2] because nums[1] + nums[2] = 2 + 4 = 6", () => {
  let array = [1,2];
  expect(twoSum([3,2,4], 6)).toEqual(array);
});

test("should return indices [0, 1] because nums[0] + nums[1] = 3 + 3 = 6", () => {
  let array = [0,1];
  expect(twoSum([3,3], 6)).toEqual(array);
});
