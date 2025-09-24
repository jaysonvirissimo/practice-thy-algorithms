const minimumWindowSubstring = require('../lib/minimum_window_substring');

test("should return 'BANC' as the minimum window containing all characters", () => {
  expect(minimumWindowSubstring("ADOBECODEBANC", "ABC")).toBe("BANC");
});

test("should return entire string when it matches target", () => {
  expect(minimumWindowSubstring("a", "a")).toBe("a");
});

test("should return empty string when target has more characters than source", () => {
  expect(minimumWindowSubstring("a", "aa")).toBe("");
});

test("should return single character when it's the only requirement", () => {
  expect(minimumWindowSubstring("ab", "b")).toBe("b");
});

test("should return entire string when all characters are needed", () => {
  expect(minimumWindowSubstring("abc", "cba")).toBe("abc");
});

test("should handle duplicate characters correctly", () => {
  expect(minimumWindowSubstring("ADOBECODEBANC", "AABC")).toBe("ADOBECODEBA");
});
