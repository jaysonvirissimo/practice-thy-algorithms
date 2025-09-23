require_relative "../lib/two_sum"

describe "two_sum" do
  it "should return indices [0, 1] because nums[0] + nums[1] = 2 + 7 = 9" do
    expect(two_sum([2, 7, 11, 15], 9)).to eq([0, 1])
  end
  
  it "should return indices [1, 2] because nums[1] + nums[2] = 2 + 4 = 6" do
    expect(two_sum([3, 2, 4], 6)).to eq([1, 2])
  end
  
  it "should return indices [0, 1] because nums[0] + nums[1] = 3 + 3 = 6" do
    expect(two_sum([3, 3], 6)).to eq([0, 1])
  end
end
