require "uniq_subs"

describe "uniq_subs" do
  it "should return all the substrings" do
    array = %w[a b c d ab bc cd abc bcd abcd]
    expect(uniq_subs("abcd")).to match_array(array)
  end

  it "shouldn't have repeats" do
    array = %w[d du dud dude u ud ude de e]
    expect(uniq_subs("dude")).to match_array(array)
  end
end
