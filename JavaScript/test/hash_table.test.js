const HashTable = require('../lib/hash_table');

test("is implemented using a JavaScript array", () => {
  const hashTable = new HashTable();
  expect(Array.isArray(hashTable.table)).toBe(true);
});

test("preserves the given lose lose hash function", () => {
  const hashTable = new HashTable();
  expect(hashTable.loseloseHashCode("foo")).toBe(28);
});

test("get", () => {
  let hashTable = new HashTable();
  hashTable.put("foo", "bar");
  expect(hashTable.get("foo")).toBe("bar");
});

test("remove", () => {
  let hashTable = new HashTable();
  hashTable.put("foo", "bar");
  expect(hashTable.get("foo")).toBe("bar");
  hashTable.remove("foo")
  expect(hashTable.get("foo")).toBe(undefined);
});


