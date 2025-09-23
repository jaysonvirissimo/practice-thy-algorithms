require_relative "../lib/three_sum"

describe "three_sum" do
  it "should return [[-1, -1, 2], [-1, 0, 1]] for mixed positive and negative values" do
    expect(three_sum([-1, 0, 1, 2, -1, -4])).to eq([[-1, -1, 2], [-1, 0, 1]])
  end
  
  it "should return empty array when no valid triplets exist" do
    expect(three_sum([0, 1, 1])).to eq([])
  end
  
  it "should return [[0, 0, 0]] for array of all zeros" do
    expect(three_sum([0, 0, 0])).to eq([[0, 0, 0]])
  end
end
