require "sum_rec"

describe "sum_rec" do
  specify { expect(sum_rec([1, 2, 3])).to eq(6) }
  specify { expect(sum_rec([99, 66, 33])).to eq(198) }

  it "calls itself" do
    expect(self).to receive(:sum_rec).at_least(:twice).and_call_original
    sum_rec([10, 20, 30])
  end
end
