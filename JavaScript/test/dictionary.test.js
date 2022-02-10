const Dictionary = require('../lib/dictionary');

require('../lib/dictionary');

test("acts as a dictionary", () => {
  const dictionary = new Dictionary();
  dictionary.set("Luna", "Moon");
  dictionary.set("Foo", "Bar");
  expect(dictionary.size()).toBe(2);
  expect(dictionary.get("Luna")).toBe("Moon");
  dictionary.delete("Foo");
  expect(dictionary.keys()).toBe(["Luna"]);
  expect(dictionary.values()).toBe(["Moon"]);
  dictionary.clear();
  expect(dictionary.size()).toBe(0);
});
