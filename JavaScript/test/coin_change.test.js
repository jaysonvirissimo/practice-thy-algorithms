const coinChange = require('../lib/coin_change');

test("should return [25, 10, 1] using minimum 3 coins for 36 cents", () => {
  let array = [25,10,1];
  expect(coinChange(36, [1,5,10,25])).toEqual(array);
});

test("should return [25, 10, 5, 1, 1, 1] using minimum 6 coins for 43 cents", () => {
  let array = [25,10,5,1,1,1];
  expect(coinChange(43, [1,5,10,25])).toEqual(array);
});

test("should return [25, 25, 10, 5, 1, 1] using minimum 6 coins for 67 cents", () => {
  let array = [25,25,10,5,1,1];
  expect(coinChange(67, [1,5,10,25])).toEqual(array);
});
