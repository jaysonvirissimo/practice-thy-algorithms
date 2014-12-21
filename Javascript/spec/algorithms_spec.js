describe("digitalRoot", function() {
  it("65,536 should return 7", function() {
    expect(Algorithms.digitalRoot(65536)).toBe(7);
  });

  it("1,853 should return 8", function() {
    expect(Algorithms.digitalRoot(1853)).toBe(8);
  });
});

describe("caesarCipher", function() {
  it("'hello' should return 'lipps'", function() {
    expect(Algorithms.caesarCipher('hello')).toBe('lipps');
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

describe("sumRec", function() {
  it("[1, 2, 3] should return 6", function() {
    expect(Algorithms.sumRec([1, 2, 3])).toBe(6);
  });

  it("[99, 66, 33] should return 198", function() {
    expect(Algorithms.sumRec([99, 66, 33])).toBe(198);
  });
});

describe("fibs", function() {
  it("3 should return [0, 1, 1]", function() {
    expect(Algorithms.fibs(3)).toBe([0, 1, 1]);
  });

  it("5 should return [0, 1, 1, 2, 3]", function() {
    expect(Algorithms.fibs(5)).toBe([0, 1, 1, 2, 3]);
  });
});

describe("isPalindrome", function() {
  it("'ricercar' should return false", function() {
    expect(Algorithms.isPalindrome('ricercar')).toBe(false);
  });

  it("'racecar' should return true", function() {
    expect(Algorithms.isPalindrome('racecar')).toBe(true);
  });
});

describe("foldingCipher", function() {
  it("'abcm' should return 'zyxn'", function() {
    expect(Algorithms.foldingCipher('abcm')).toBe('zyxn');
  });

  it("'zyxn' should return 'abcm'", function() {
    expect(Algorithms.foldingCipher('zyxn')).toBe('abcm');
  });
});

describe("uniqSubs", function() {
  it("should return all the substrings", function() {
    var array = ["a", "b", "c", "d", "ab", "bc", "cd", "abc", "bcd", "abcd"]
    expect(Algorithms.uniqSubs('abcd').sort()).toEqual(array.sort());
  });

  it("should not return repeats", function() {
    var array = ["d", "du", "dud", "dude", "u", "ud", "ude", "de", "e"]
    expect(Algorithms.uniqSubs('dude').sort()).toEqual(array.sort());
  });
});
