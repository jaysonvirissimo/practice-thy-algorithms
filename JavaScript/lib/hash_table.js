// Implement a hash table (also called a hash map).
// Compute hash codes using the given lose lose hash function.
class HashTable {
    constructor() {
      this.table = [];
    }
    get() {}
    loseloseHashCode(key) {
      let hash = 0;
      for (let i = 0; i < key.length; i++) { hash += key.charCodeAt(i); }
      return hash % 37;
    }
    put() {}
    remove() {}
}
module.exports = HashTable;