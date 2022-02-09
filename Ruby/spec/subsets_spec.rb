require "subsets"

describe "subsets" do
  it "should return the subsets of a given array" do
    array = [[], [1], [2], [3], [1, 2], [1, 3], [2, 3], [1, 2, 3]]
    # sort each subset so that differently ordered subsets still pass
    expect(subsets([1, 2, 3]).map(&:sort)).to match_array(array)
  end

  it "should return a set containing an empty set if given an empty set" do
    array = [[]]
    expect(subsets([])).to match_array(array)
  end
end
