require "fast_intersection"

describe "fast_intersection" do
  it "should return the intersection of two arrays" do
    array_one = [1, 2, 3, 4, 5]
    array_two = [2, 3, 4]
    intersection = [2, 3, 4]
    expect(fast_intersection(array_one, array_two)).to match_array(intersection)
  end

  it "should return the intersection of two arrays" do
    array_one = [1, 3, 5, 7, 9]
    array_two = [2, 4, 5, 6, 8]
    intersection = [5]
    expect(fast_intersection(array_one, array_two)).to match_array(intersection)
  end
end
