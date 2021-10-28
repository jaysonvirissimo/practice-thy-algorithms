const caesarCipher = require('../lib/caesar_cipher');

test("'hello' should return 'lipps'", () => {
  expect(caesarCipher('hello', 4)).toBe('lipps');
});

test("'abc' should return 'abc'", () => {
  expect(caesarCipher('abc', 26)).toBe('abc');
});
