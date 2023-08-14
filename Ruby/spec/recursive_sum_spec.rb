require "recursive_sum"

describe "recursive_sum" do
  specify { expect(recursive_sum([1, 2, 3])).to eq(6) }
  specify { expect(recursive_sum([99, 66, 33])).to eq(198) }

  it "calls itself" do
    expect(self).to receive(:recursive_sum).at_least(:twice).and_call_original
    recursive_sum([10, 20, 30])
  end
end
