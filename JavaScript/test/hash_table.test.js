const HashTable = require('../lib/hash_table');

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


