require "two_sum"
require "set"

describe "two_sum" do
  let(:set) { Set.new }

  it "should return all the pairs that sum to 0" do
    set.add([-1, 1])
    expect(two_sum([1, 2, -1], 0)).to eq(set)
  end
  
  it "should return all the pairs that sum to 1" do
    set.add([-1, 2])
    expect(two_sum([1, 2, -1, -1, -2], 1)).to eq(set)
  end
end
