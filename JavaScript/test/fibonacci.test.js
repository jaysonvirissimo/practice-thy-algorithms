const fibonacci = require('../lib/fibonacci');

test("3 should return [0, 1, 1]", () => {
  expect(fibonacci(3)).toEqual([0, 1, 1]);
});

test("5 should return [0, 1, 1, 2, 3]", () => {
  expect(fibonacci(5)).toEqual([0, 1, 1, 2, 3]);
});
