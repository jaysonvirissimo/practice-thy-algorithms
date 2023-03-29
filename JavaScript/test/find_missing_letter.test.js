const findMissingLetter = require('../lib/find_missing_letter');

test("returns the missing letter", () => {
  const string = "the quick brown box jumps over a lazy dog";
  expect(findMissingLetter(string)).toEqual("f");
});
