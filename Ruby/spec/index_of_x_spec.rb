require "index_of_x"

describe "#index_of_x" do
  specify do
    alphabet = "abcdefghijklmnopqrstuvwxyz"
    expect(index_of_x(alphabet)).to eq(23)
  end

  it "calls itself" do
    expect(self)
      .to receive(:index_of_x)
      .at_least(:twice)
      .and_call_original
    index_of_x("abcdx")
  end
end
