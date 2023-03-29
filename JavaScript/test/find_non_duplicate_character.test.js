const findNonDuplicateCharacter = require('../lib/find_non_duplicate_character');

test("returns the non-duplicate character", () => {
  const string = "minimum";
  expect(findNonDuplicateCharacter(string)).toEqual("n");
});
