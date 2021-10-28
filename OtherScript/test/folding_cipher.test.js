const foldingCipher = require('../lib/folding_cipher');

test("'abcm' should return 'zyxn'", () => {
  expect(foldingCipher('abcm')).toBe('zyxn');
});

test("'zyxn' should return 'abcm'", () => {
  expect(foldingCipher('zyxn')).toBe('abcm');
});
