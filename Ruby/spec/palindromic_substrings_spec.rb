require_relative "../lib/palindromic_substrings"

describe "palindromic_substrings" do
  it "should return 3 for palindromes 'a', 'b', 'c'" do
    expect(palindromic_substrings("abc")).to eq(3)
  end
  
  it "should return 6 for palindromes 'a', 'a', 'a', 'aa', 'aa', 'aaa'" do
    expect(palindromic_substrings("aaa")).to eq(6)
  end
  
  it "should return 4 for palindromes 'a', 'b', 'a', 'aba'" do
    expect(palindromic_substrings("aba")).to eq(4)
  end
  
  it "should return 10 for all palindromic substrings in 'racecar'" do
    expect(palindromic_substrings("racecar")).to eq(10)
  end
  
  it "should return 1 for single character 'a'" do
    expect(palindromic_substrings("a")).to eq(1)
  end
  
  it "should return 7 for palindromes including 'bcb' and 'abcba'" do
    expect(palindromic_substrings("abcba")).to eq(7)
  end
end
