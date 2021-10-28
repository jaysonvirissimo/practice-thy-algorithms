const digitalRoot = require('../lib/digital_root');

test('65,536 should return 7', () => {
  expect(digitalRoot(65536)).toBe(7);
});

test('1,853 should return 8', () => {
  expect(digitalRoot(1853)).toBe(8);
});
