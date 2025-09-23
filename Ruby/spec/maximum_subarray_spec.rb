require_relative "../lib/maximum_subarray"

describe "maximum_subarray" do
  it "should return the largest subsum" do
    expect(maximum_subarray([4, -1, 5, 6, -13, 2])).to eq(14)
  end
  
  it "should return the largest subsum" do
    expect(maximum_subarray([-2, 1, -3, 4, -1, 2, 1, -5, 4])).to eq(6)
  end
end
