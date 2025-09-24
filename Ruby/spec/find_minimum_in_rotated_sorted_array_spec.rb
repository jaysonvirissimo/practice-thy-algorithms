require_relative "../lib/find_minimum_in_rotated_sorted_array"

describe "find_minimum_in_rotated_sorted_array" do
  it "should return 1 from rotated array [3,4,5,1,2]" do
    expect(find_minimum_in_rotated_sorted_array([3, 4, 5, 1, 2])).to eq(1)
  end
  
  it "should return 0 from rotated array [4,5,6,7,0,1,2]" do
    expect(find_minimum_in_rotated_sorted_array([4, 5, 6, 7, 0, 1, 2])).to eq(0)
  end
  
  it "should return 11 from non-rotated array [11,13,15,17]" do
    expect(find_minimum_in_rotated_sorted_array([11, 13, 15, 17])).to eq(11)
  end
  
  it "should return 1 from small rotated array [2,1]" do
    expect(find_minimum_in_rotated_sorted_array([2, 1])).to eq(1)
  end
  
  it "should return 1 from single element array [1]" do
    expect(find_minimum_in_rotated_sorted_array([1])).to eq(1)
  end
end
