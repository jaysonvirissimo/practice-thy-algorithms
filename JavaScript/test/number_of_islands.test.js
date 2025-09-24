const numberOfIslands = require('../lib/number_of_islands');

test("should return 1 for a single connected island", () => {
  expect(numberOfIslands([["1","1","1","1","0"],["1","1","0","1","0"],["1","1","0","0","0"],["0","0","0","0","0"]])).toBe(1);
});

test("should return 3 for three separate islands", () => {
  expect(numberOfIslands([["1","1","0","0","0"],["1","1","0","0","0"],["0","0","1","0","0"],["0","0","0","1","1"]])).toBe(3);
});

test("should return 1 for one large connected island", () => {
  expect(numberOfIslands([["1","0","1","1","1"],["1","0","1","0","1"],["1","1","1","0","1"]])).toBe(1);
});

test("should return 0 for grid with no land", () => {
  expect(numberOfIslands([["0","0","0","0"],["0","0","0","0"],["0","0","0","0"]])).toBe(0);
});

test("should return 1 for single land cell", () => {
  expect(numberOfIslands([["1"]])).toBe(1);
});
