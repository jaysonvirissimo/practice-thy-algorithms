require_relative "../lib/number_of_islands"

describe "number_of_islands" do
  it "should return 1 for a single connected island" do
    expect(number_of_islands([["1", "1", "1", "1", "0"], ["1", "1", "0", "1", "0"], ["1", "1", "0", "0", "0"], ["0", "0", "0", "0", "0"]])).to eq(1)
  end
  
  it "should return 3 for three separate islands" do
    expect(number_of_islands([["1", "1", "0", "0", "0"], ["1", "1", "0", "0", "0"], ["0", "0", "1", "0", "0"], ["0", "0", "0", "1", "1"]])).to eq(3)
  end
  
  it "should return 1 for one large connected island" do
    expect(number_of_islands([["1", "0", "1", "1", "1"], ["1", "0", "1", "0", "1"], ["1", "1", "1", "0", "1"]])).to eq(1)
  end
  
  it "should return 0 for grid with no land" do
    expect(number_of_islands([["0", "0", "0", "0"], ["0", "0", "0", "0"], ["0", "0", "0", "0"]])).to eq(0)
  end
  
  it "should return 1 for single land cell" do
    expect(number_of_islands([["1"]])).to eq(1)
  end
end
