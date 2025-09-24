require_relative "../lib/minimum_window_substring"

describe "minimum_window_substring" do
  it "should return 'BANC' as the minimum window containing all characters" do
    expect(minimum_window_substring("ADOBECODEBANC", "ABC")).to eq("BANC")
  end
  
  it "should return entire string when it matches target" do
    expect(minimum_window_substring("a", "a")).to eq("a")
  end
  
  it "should return empty string when target has more characters than source" do
    expect(minimum_window_substring("a", "aa")).to eq("")
  end
  
  it "should return single character when it's the only requirement" do
    expect(minimum_window_substring("ab", "b")).to eq("b")
  end
  
  it "should return entire string when all characters are needed" do
    expect(minimum_window_substring("abc", "cba")).to eq("abc")
  end
  
  it "should handle duplicate characters correctly" do
    expect(minimum_window_substring("ADOBECODEBANC", "AABC")).to eq("ADOBECODEBA")
  end
end
