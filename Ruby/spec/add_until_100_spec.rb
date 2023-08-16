require "add_until_100"

describe "add_until_100" do
  it "calls itself" do
    expect(self).to receive(:add_until_100).at_least(:twice).and_call_original
    add_until_100([1, 2, 3, 4, 5])
  end

  specify { expect(add_until_100([1, 2, 3, 4, 5])).to eq(15) }
  specify { expect(add_until_100([11, 22, 33, 44, 55, 66, 77])).to eq(99) }
end
