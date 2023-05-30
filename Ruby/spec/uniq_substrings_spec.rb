require "uniq_subs"

describe "unique_substrings" do
  it "should return all the substrings" do
    array = %w[a b c d ab bc cd abc bcd abcd]
    expect(unique_substrings("abcd")).to match_array(array)
  end

  it "shouldn't have repeats" do
    array = %w[d du dud dude u ud ude de e]
    expect(unique_substrings("dude")).to match_array(array)
  end
end
