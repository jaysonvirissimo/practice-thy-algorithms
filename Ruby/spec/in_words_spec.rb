require "in_words"

describe "in_words" do
  it { expect(in_words(132)).to eq("one hundred and thirty two") }
end
