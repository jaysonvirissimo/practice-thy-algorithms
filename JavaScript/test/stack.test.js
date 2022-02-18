const Stack = require('../lib/stack');

test("clear", () => {
  const stack = new Stack();
  stack.push(1);
  stack.push(2);
  stack.push(3);
  stack.clear()
  expect(stack.toString()).toBe("");
});

test("isEmpty", () => {
  const stack = new Stack();
  stack.push(1);
  expect(stack.isEmpty()).toBe(false);
  stack.pop();
  expect(stack.isEmpty()).toBe(true);
});

test("peek", () => {
  const stack = new Stack();
  stack.push(1);
  stack.push(2);
  expect(stack.peek()).toBe(2)
});

test("pop", () => {
  const stack = new Stack();
  stack.push(1);
  stack.push(2);
  stack.push(3);
  expect(stack.pop()).toBe(3)
  expect(stack.toString()).toBe("1,2");
});

test("push", () => {
  const stack = new Stack();
  stack.push(1);
  expect(stack.toString()).toBe("1");
});

test("size", () => {
  const stack = new Stack();
  expect(stack.size()).toBe(0)
  stack.push("foo");
  stack.push("bar");
  stack.push("baz");
  expect(stack.size()).toBe(3);
});



