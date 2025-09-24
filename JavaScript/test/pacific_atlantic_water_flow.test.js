const pacificAtlanticWaterFlow = require('../lib/pacific_atlantic_water_flow');

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

test("should return coordinates reachable by both oceans", () => {
  expect(pacificAtlanticWaterFlow([[1,2,2,3,5],[3,2,3,4,4],[2,4,5,3,1],[6,7,1,4,5],[5,1,1,2,4]])).toEqualUnordered([[0,4],[1,3],[1,4],[2,2],[3,0],[3,1],[4,0]]);
});

test("should return [0,0] for single cell touching both oceans", () => {
  let array = [[0,0]];
  expect(pacificAtlanticWaterFlow([[1]])).toEqual(array);
});

test("should return all cells for 2x2 grid", () => {
  expect(pacificAtlanticWaterFlow([[1,2],[2,1]])).toEqualUnordered([[0,0],[0,1],[1,0],[1,1]]);
});

test("should return corner and edge cells for increasing heights", () => {
  expect(pacificAtlanticWaterFlow([[1,2,3],[4,5,6],[7,8,9]])).toEqualUnordered([[0,2],[1,2],[2,0],[2,1],[2,2]]);
});
