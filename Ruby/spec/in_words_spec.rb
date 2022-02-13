require "in_words"

describe "in_words" do
  it { expect(in_words(0)).to eq("zero") }
  it { expect(in_words(11)).to eq("eleven") }
  it { expect(in_words(23)).to eq("twenty three") }
  it { expect(in_words(134)).to eq("one hundred thirty four") }
  it { expect(in_words(1456)).to eq("one thousand four hundred fifty six") }
end
