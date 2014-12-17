describe("digitalRoot", function() {
  it("65,536 should return 7", function() {
    expect(Algorithms.digitalRoot(65536)).toBe(7);
  });

  it("1,853 should return 8", function() {
    expect(Algorithms.digitalRoot(1853)).toBe(8);
  });
});

describe("caesarCipher", function() {
  it("'Hello' should return 'Lipps'", function() {
    expect(Algorithms.caesarCipher('Hello')).toBe('Lipps');
  });

  it("'abc' should return 'abc'", function() {
    expect(Algorithms.caesarCipher('abc')).toBe('abc');
  });
});

describe("commonSubstrings", function() {
  it("'Hello' and 'Hello World' should return 'Hello'", function() {
    expect(Algorithms.commonSubstrings('Hello', 'Hello World')).toBe('Hello');
  });

  it("'ABABC' and 'BABCA' should return 'ABC'", function() {
    expect(Algorithms.commonSubstrings('ABABC', 'BABCA')).toBe('ABC');
  });
});
