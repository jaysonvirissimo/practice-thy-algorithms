const maxRegionSum = require('../lib/max_region_sum');

test("should return the sum of the elements within the coordinates", () => {
  let matrix = [[1, 2, 3], [2, 3, 4], [3, 4, 5]];
  let topLeftCoords = [0, 0];
  let bottomRightCoords = [1, 1];
  expect(matrixRegionSum(matrix, topLeftCoords, bottomRightCoords)).toBe(8);
});

test("should return the sum of the elements within the coordinates", () => {
  let matrix = [[2, 3, 4], [3, 4, 5], [4, 5, 6]];
  let topLeftCoords = [0, 0];
  let bottomRightCoords = [2, 2];
  expect(matrixRegionSum(matrix, topLeftCoords, bottomRightCoords)).toBe(36);
});
