require_relative "../lib/longest_repeating_character_replacement"

describe "longest_repeating_character_replacement" do
  it "should return 4 by replacing two 'A's with 'B's or vice versa" do
    expect(longest_repeating_character_replacement("ABAB", 2)).to eq(4)
  end
  
  it "should return 4 by replacing one 'A' to form substring 'BBBB'" do
    expect(longest_repeating_character_replacement("AABABBA", 1)).to eq(4)
  end
  
  it "should return 2 since we can make any 2 consecutive chars the same" do
    expect(longest_repeating_character_replacement("ABCDE", 1)).to eq(2)
  end
  
  it "should return 4 since all characters are already the same" do
    expect(longest_repeating_character_replacement("AAAA", 0)).to eq(4)
  end
  
  it "should return 1 since no replacements allowed" do
    expect(longest_repeating_character_replacement("ABAB", 0)).to eq(1)
  end
end
