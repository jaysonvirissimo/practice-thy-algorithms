const decimalToBinary = require('../lib/decimal_to_binary');

test('0 should return 0', () => {
  expect(decimalToBinary(0)).toBe("0");
});

test('1 should return 1', () => {
  expect(decimalToBinary(1)).toBe("1");
});

test('17 should return 10001 ', () => {
  expect(decimalToBinary(17)).toBe("10001");
});
