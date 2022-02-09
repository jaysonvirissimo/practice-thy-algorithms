require "sort_two"

describe "sort_two" do
  it "should 'sort' the array with known max value" do
    array = [4, 2, 1, 3, 5]
    expect(sort_two(array, array.max)).to match_array(array.sort)
  end

  it "should 'sort' the array with known max value" do
    array = [4, 3, 8, 5, 1, 2, 7, 6, 10, 9]
    expect(sort_two(array, array.max)).to match_array(array.sort)
  end
end
