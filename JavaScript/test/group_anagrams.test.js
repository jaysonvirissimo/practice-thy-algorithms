const groupAnagrams = require('../lib/group_anagrams');

test("should group anagrams correctly with mixed groups", () => {
  let array = [["eat","tea","ate"],["tan","nat"],["bat"]];
  expect(groupAnagrams(["eat","tea","tan","ate","nat","bat"])).toEqual(array);
});

test("should handle single empty string", () => {
  let array = [[""]];
  expect(groupAnagrams([""])).toEqual(array);
});

test("should handle single character string", () => {
  let array = [["a"]];
  expect(groupAnagrams(["a"])).toEqual(array);
});
