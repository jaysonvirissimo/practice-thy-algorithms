const groupAnagrams = require('../lib/group_anagrams');

// Custom Jest matchers for advanced array comparison
expect.extend({
  toEqualUnordered(received, expected) {
    if (!Array.isArray(received) || !Array.isArray(expected)) {
      return {
        pass: false,
        message: () => "Both values must be arrays for unordered comparison"
      };
    }

    // For nested arrays (like Group Anagrams), sort each sub-array before comparison
    const sortNested = (arr) => {
      return arr.map(item =>
        Array.isArray(item) ? [...item].sort() : item
      ).sort((a, b) => JSON.stringify(a).localeCompare(JSON.stringify(b)));
    };

    const sortedReceived = sortNested(received);
    const sortedExpected = sortNested(expected);

    const pass = JSON.stringify(sortedReceived) === JSON.stringify(sortedExpected);

    return {
      pass,
      message: () => pass
        ? `Expected arrays not to have same elements regardless of order`
        : `Expected arrays to have same elements regardless of order.\nReceived: ${JSON.stringify(received)}\nExpected: ${JSON.stringify(expected)}`
    };
  },

  toEqualAsSet(received, expected) {
    if (!Array.isArray(received) || !Array.isArray(expected)) {
      return {
        pass: false,
        message: () => "Both values must be arrays for set comparison"
      };
    }

    const setReceived = new Set(received.map(item => JSON.stringify(item)));
    const setExpected = new Set(expected.map(item => JSON.stringify(item)));

    const pass = setReceived.size === setExpected.size &&
                 [...setReceived].every(item => setExpected.has(item));

    return {
      pass,
      message: () => pass
        ? `Expected arrays not to have same unique elements`
        : `Expected arrays to have same unique elements (treating as sets).\nReceived: ${JSON.stringify([...setReceived])}\nExpected: ${JSON.stringify([...setExpected])}`
    };
  }
});

test("should group anagrams correctly with mixed groups", () => {
  expect(groupAnagrams(["eat","tea","tan","ate","nat","bat"])).toEqualUnordered([["eat","tea","ate"],["tan","nat"],["bat"]]);
});

test("should handle single empty string", () => {
  let array = [[""]];
  expect(groupAnagrams([""])).toEqual(array);
});

test("should handle single character string", () => {
  let array = [["a"]];
  expect(groupAnagrams(["a"])).toEqual(array);
});
