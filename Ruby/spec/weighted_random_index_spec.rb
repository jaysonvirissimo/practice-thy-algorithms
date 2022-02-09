require "weighted_random_index"

describe "weighted_random_index" do
  it "should not return an index out of range" do
    array = [4, 6, 8]
    expect(weighted_random_index(array)).to be_between(0, 2)
  end
end
