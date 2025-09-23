const bestTimeToBuyAndSellStock = require('../lib/best_time_to_buy_and_sell_stock');

test("should return 5 by buying at price 1 and selling at price 6", () => {
  expect(bestTimeToBuyAndSellStock([7,1,5,3,6,4])).toBe(5);
});

test("should return 0 when prices only decrease", () => {
  expect(bestTimeToBuyAndSellStock([7,6,4,3,1])).toBe(0);
});

test("should return 4 by buying at price 1 and selling at price 5", () => {
  expect(bestTimeToBuyAndSellStock([1,2,3,4,5])).toBe(4);
});
