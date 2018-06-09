const uniqueSubstrings = require('../lib/unique_substrings');

test("should return all the substrings", () => {
  let array = ["a", "b", "c", "d", "ab", "bc", "cd", "abc", "bcd", "abcd"];
  expect(uniqueSubstrings('abcd').sort()).toEqual(array.sort());
});

it("should not return repeats", function() {
  let array = ["d", "du", "dud", "dude", "u", "ud", "ude", "de", "e"];
  expect(uniqueSubstrings('dude').sort()).toEqual(array.sort());
});
