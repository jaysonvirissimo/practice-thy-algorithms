const containerWithMostWater = require('../lib/container_with_most_water');

test("should return 49 as the maximum water area", () => {
  expect(containerWithMostWater([1,8,6,2,5,4,8,3,7])).toBe(49);
});

test("should return 1 for two lines of equal height", () => {
  expect(containerWithMostWater([1,1])).toBe(1);
});

test("should return 16 using the first and last lines", () => {
  expect(containerWithMostWater([4,3,2,1,4])).toBe(16);
});

test("should return 2 using the first and last lines", () => {
  expect(containerWithMostWater([1,2,1])).toBe(2);
});
