require_relative "../lib/container_with_most_water"

describe "container_with_most_water" do
  it "should return 49 as the maximum water area" do
    expect(container_with_most_water([1, 8, 6, 2, 5, 4, 8, 3, 7])).to eq(49)
  end
  
  it "should return 1 for two lines of equal height" do
    expect(container_with_most_water([1, 1])).to eq(1)
  end
  
  it "should return 16 using the first and last lines" do
    expect(container_with_most_water([4, 3, 2, 1, 4])).to eq(16)
  end
  
  it "should return 2 using the first and last lines" do
    expect(container_with_most_water([1, 2, 1])).to eq(2)
  end
end
