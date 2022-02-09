require "common_subsets"

describe "common_subsets" do
  it "should return the common subsets of two arrays" do
    array_one = [1, 2, 3, 4, 5]
    array_two = [2, 3, 4]
    subsets = [[], [4], [3], [4, 3], [2], [4, 2], [3, 2], [4, 3, 2]]
    expect(common_subsets(array_one, array_two)).to eq(subsets)
  end

  it "should return the common subsets of two arrays" do
    array_one = [1, 3, 5, 7, 9]
    array_two = [2, 4, 5, 6, 8]
    subsets = [[], [5]]
    expect(common_subsets(array_one, array_two)).to eq(subsets)
  end
end
