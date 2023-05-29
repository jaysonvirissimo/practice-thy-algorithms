const valid_ip = require('../lib/valid_ip');

test("1.1.1.1", () => {
  expect(valid_ip("1.1.1.1")).toBe(true);
});

test("256.2.2.2", () => {
  expect(valid_ip("256.2.2.2")).toBe(false);
});

test("1.1.1.1.1", () => {
  expect(valid_ip("1.1.1.1.1")).toBe(false);
});
