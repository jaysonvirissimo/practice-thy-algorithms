const maximumSubarray = require('../lib/maximum_subarray');

test("should return the largest subsum", () => {
  expect(maximumSubarray([4,-1,5,6,-13,2])).toBe(14);
});

test("should return the largest subsum", () => {
  expect(maximumSubarray([-2,1,-3,4,-1,2,1,-5,4])).toBe(6);
});
