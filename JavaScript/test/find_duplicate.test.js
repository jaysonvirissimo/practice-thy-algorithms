const findDuplicate = require('../lib/find_duplicate');

test("returns the duplicated character", () => {
  const characters = ["a", "b", "c", "d", "d", "e"];

  expect(findDuplicate(characters)).toEqual("d");
});
