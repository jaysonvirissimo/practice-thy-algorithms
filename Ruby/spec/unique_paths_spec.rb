require_relative "../lib/unique_paths"

describe "unique_paths" do
  it "should return 28 unique paths for 3x7 grid" do
    expect(unique_paths(3, 7)).to eq(28)
  end
  
  it "should return 364 unique paths for 4x12 grid" do
    expect(unique_paths(4, 12)).to eq(364)
  end
  
  it "should return 3060 unique paths for 5x15 grid" do
    expect(unique_paths(5, 15)).to eq(3060)
  end
end
