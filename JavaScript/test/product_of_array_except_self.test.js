const productOfArrayExceptSelf = require('../lib/product_of_array_except_self');

test("should return [24, 12, 8, 6] where each element is the product of all others", () => {
  let array = [24,12,8,6];
  expect(productOfArrayExceptSelf([1,2,3,4])).toEqual(array);
});

test("should return [0, 0, 9, 0, 0] handling negative numbers and zero", () => {
  let array = [0,0,9,0,0];
  expect(productOfArrayExceptSelf([-1,1,0,-3,3])).toEqual(array);
});

test("should return [60, 40, 30, 24] for consecutive integer sequence", () => {
  let array = [60,40,30,24];
  expect(productOfArrayExceptSelf([2,3,4,5])).toEqual(array);
});
