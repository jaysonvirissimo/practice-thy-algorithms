require_relative "../lib/has_cycle"

describe "has_cycle" do
  it "should return true when tail connects to 1st node (0-indexed)" do
    expect(has_cycle([3, 2, 0, -4], 1)).to eq(true)
  end
  
  it "should return true when tail connects to 0th node" do
    expect(has_cycle([1, 2], 0)).to eq(true)
  end
  
  it "should return false for single node with no cycle" do
    expect(has_cycle([1], -1)).to eq(false)
  end
  
  it "should return false for empty list" do
    expect(has_cycle([], -1)).to eq(false)
  end
end
