const mergeIntervals = require('../lib/merge_intervals');

test("should merge overlapping intervals [1,3] and [2,6] into [1,6]", () => {
  let array = [[1,6],[8,10],[15,18]];
  expect(mergeIntervals([[1,3],[2,6],[8,10],[15,18]])).toEqual(array);
});

test("should merge touching intervals [1,4] and [4,5] into [1,5]", () => {
  let array = [[1,5]];
  expect(mergeIntervals([[1,4],[4,5]])).toEqual(array);
});

test("should merge overlapping intervals after sorting [4,7] and [1,4] into [1,7]", () => {
  let array = [[1,7]];
  expect(mergeIntervals([[4,7],[1,4]])).toEqual(array);
});
