const commonSubstrings = require('../lib/common_substrings');

test("'Hello' and 'Hello World' should return 'Hello'", () => {
  expect(commonSubstrings('Hello', 'Hello World')).toBe(5);
});

test("'ABABC' and 'BABCA' should return 'BABC'", () => {
  expect(commonSubstrings('ABABC', 'BABCA')).toBe(4);
});
