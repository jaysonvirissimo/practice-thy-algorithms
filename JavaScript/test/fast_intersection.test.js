const fastIntersection = require('../lib/fast_intersection');

test('{1, 2, 3, 4, 5} ∩ {2, 3, 4} = {2, 3, 4}', () => {
  const arrayOne = [1, 2, 3, 4, 5];
  const arrayTwo = [2, 3, 4];
  const intersection = [2, 3, 4];

  expect(fastIntersection(arrayOne, arrayTwo).sort()).toEqual(intersection.sort());
});

test('{1, 3, 5, 7, 9} ∩ {2, 4, 5, 6, 8} = {5}', () => {
  const arrayOne = [1, 3, 5, 7, 9];
  const arrayTwo = [2, 4, 5, 6, 8];
  const intersection = [5];

  expect(fastIntersection(arrayOne, arrayTwo).sort()).toEqual(intersection.sort());
});

