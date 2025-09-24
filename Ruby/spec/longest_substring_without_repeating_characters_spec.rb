require_relative "../lib/longest_substring_without_repeating_characters"

describe "longest_substring_without_repeating_characters" do
  it "should return 3 for substring 'abc'" do
    expect(longest_substring_without_repeating_characters("abcabcbb")).to eq(3)
  end
  
  it "should return 1 for substring 'b'" do
    expect(longest_substring_without_repeating_characters("bbbbb")).to eq(1)
  end
  
  it "should return 3 for substring 'wke'" do
    expect(longest_substring_without_repeating_characters("pwwkew")).to eq(3)
  end
  
  it "should return 0 for empty string" do
    expect(longest_substring_without_repeating_characters("")).to eq(0)
  end
  
  it "should return 1 for single space character" do
    expect(longest_substring_without_repeating_characters(" ")).to eq(1)
  end
  
  it "should return 2 for two distinct characters" do
    expect(longest_substring_without_repeating_characters("au")).to eq(2)
  end
end
