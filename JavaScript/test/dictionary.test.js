const Dictionary = require('../lib/dictionary');

require('../lib/dictionary');

test("is implemented using a JavaScript object", () => {
  const dictionary = new Dictionary();
  expect(typeof dictionary.items).toBe("object");
});

test("set", () => {
  const dictionary = new Dictionary();
  dictionary.set("Foo", "Bar");
  expect(dictionary.size()).toBe(1)
});

test("delete", () => {
  const dictionary = new Dictionary();
  dictionary.set("Foo", "Bar");
  expect(dictionary.has("Foo")).toBe(true);
  dictionary.delete("Foo");
  expect(dictionary.get("Foo")).toBe(undefined);
});

test("has", () => {
  const dictionary = new Dictionary();
  expect(dictionary.has("Luna")).toBe(false);
  dictionary.set("Luna", "Moon");
  expect(dictionary.has("Luna")).toBe(true);
});

test("get", () => {
  const dictionary = new Dictionary();
  dictionary.set("Luna", "Moon");
  expect(dictionary.get("Luna")).toBe("Moon");
});

test("clear", () => {
  const dictionary = new Dictionary();
  dictionary.set("1", "2");
  dictionary.set("2", "4");
  dictionary.set("4", "8");
  dictionary.clear();
  expect(dictionary.size()).toBe(0);
});

test("size", () => {
  const dictionary = new Dictionary();
  dictionary.set("1", "2");
  dictionary.set("2", "4");
  dictionary.set("4", "8");
  expect(dictionary.size()).toBe(3);
});

test("keys", () => {
  const dictionary = new Dictionary();
  dictionary.set("1", "2");
  dictionary.set("2", "4");
  dictionary.set("4", "8");
  expect(dictionary.keys()).toBe(["1", "2", "4"]);
});

test("values", () => {
  const dictionary = new Dictionary();
  dictionary.set("1", "2");
  dictionary.set("2", "4");
  dictionary.set("4", "8");
  expect(dictionary.values()).toBe(["2", "4", "8"]);
});
