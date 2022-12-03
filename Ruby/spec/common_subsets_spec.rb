require "common_subsets"

describe "common_subsets" do
  it "should return the common subsets of two arrays" do
    array_one = [1, 2, 3, 4, 5]
    array_two = [2, 3, 4]
    actual_subsets = common_subsets(array_one, array_two).map(&:sort)
    expected_subsets = [[], [4], [3], [3, 4], [2], [2, 4], [2, 3], [2, 3, 4]]
    expect(actual_subsets).to match_array(expected_subsets)
  end

  it "should return the common subsets of two arrays" do
    array_one = [1, 3, 5, 7, 9]
    array_two = [2, 4, 5, 6, 8]
    actual_subsets = common_subsets(array_one, array_two).map(&:sort)
    expected_subsets = [[], [5]]
    expect(actual_subsets).to match_array(expected_subsets)
  end
end
