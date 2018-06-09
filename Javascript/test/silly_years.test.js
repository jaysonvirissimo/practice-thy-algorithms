const sillyYears = require('../lib/silly_years');

test("should return the ten subsequent silly years", () => {
  let array = [2307, 2417, 2527, 2637, 2747, 2857, 2967, 3406, 3516, 3626];
  expect(sillyYears(1978)).toEqual(array);
});

test("should return the ten subsequent silly years", () => {
  let array = [2417, 2527, 2637, 2747, 2857, 2967, 3406, 3516, 3626, 3736];
  expect(sillyYears(2307)).toEqual(array);
});
