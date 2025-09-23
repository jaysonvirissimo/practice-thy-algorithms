require_relative "../lib/group_anagrams"

describe "group_anagrams" do
  it "should group anagrams correctly with mixed groups" do
    expect(group_anagrams(["eat", "tea", "tan", "ate", "nat", "bat"])).to eq([["eat", "tea", "ate"], ["tan", "nat"], ["bat"]])
  end
  
  it "should handle single empty string" do
    expect(group_anagrams([""])).to eq([[""]])
  end
  
  it "should handle single character string" do
    expect(group_anagrams(["a"])).to eq([["a"]])
  end
end
