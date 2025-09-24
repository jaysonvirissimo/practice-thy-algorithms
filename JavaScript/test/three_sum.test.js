const threeSum = require('../lib/three_sum');

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

test("should return [[-1, -1, 2], [-1, 0, 1]] for mixed positive and negative values", () => {
  expect(threeSum([-1,0,1,2,-1,-4])).toEqualUnordered([[-1,-1,2],[-1,0,1]]);
});

test("should return empty array when no valid triplets exist", () => {
  let array = [];
  expect(threeSum([0,1,1])).toEqual(array);
});

test("should return [[0, 0, 0]] for array of all zeros", () => {
  let array = [[0,0,0]];
  expect(threeSum([0,0,0])).toEqual(array);
});
