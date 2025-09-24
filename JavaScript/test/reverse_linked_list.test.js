const reverseLinkedList = require('../lib/reverse_linked_list');

test("should reverse a 5-node list from [1,2,3,4,5] to [5,4,3,2,1]", () => {
  expect(reverseLinkedList([1,2,3,4,5])).toBe([5,4,3,2,1]);
});

test("should reverse a 2-node list from [1,2] to [2,1]", () => {
  expect(reverseLinkedList([1,2])).toBe([2,1]);
});

test("should handle empty list and return empty list", () => {
  expect(reverseLinkedList([])).toBe([]);
});
