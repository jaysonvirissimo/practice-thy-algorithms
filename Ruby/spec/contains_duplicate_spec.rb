require_relative "../lib/contains_duplicate"

describe "contains_duplicate" do
  it "should return true when element 1 appears at indices 0 and 3" do
    expect(contains_duplicate([1, 2, 3, 1])).to eq(true)
  end
  
  it "should return false when all elements are distinct" do
    expect(contains_duplicate([1, 2, 3, 4])).to eq(false)
  end
  
  it "should return true when multiple elements have duplicates" do
    expect(contains_duplicate([1, 1, 1, 3, 3, 4, 3, 2, 4, 2])).to eq(true)
  end
end
