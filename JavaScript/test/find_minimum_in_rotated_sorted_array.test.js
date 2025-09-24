const findMinimumInRotatedSortedArray = require('../lib/find_minimum_in_rotated_sorted_array');

test("should return 1 from rotated array [3,4,5,1,2]", () => {
  expect(findMinimumInRotatedSortedArray([3,4,5,1,2])).toBe(1);
});

test("should return 0 from rotated array [4,5,6,7,0,1,2]", () => {
  expect(findMinimumInRotatedSortedArray([4,5,6,7,0,1,2])).toBe(0);
});

test("should return 11 from non-rotated array [11,13,15,17]", () => {
  expect(findMinimumInRotatedSortedArray([11,13,15,17])).toBe(11);
});

test("should return 1 from small rotated array [2,1]", () => {
  expect(findMinimumInRotatedSortedArray([2,1])).toBe(1);
});

test("should return 1 from single element array [1]", () => {
  expect(findMinimumInRotatedSortedArray([1])).toBe(1);
});
