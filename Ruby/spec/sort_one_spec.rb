require "sort_one"

describe "sort_one" do
  it "should 'sort' the array" do
    array = [4, 2, 1, 3, 5]
    expect(sort_one(array)).to match_array(array.sort)
  end

  it "should 'sort' the array" do
    array = [4, 3, 8, 5, 1, 2, 7, 6, 10, 9]
    expect(sort_one(array)).to match_array(array.sort)
  end
end
