require "binary_search"

describe "binary_search" do
  it "([1, 5, 13, 23, 305, 333, 402, 454, 500], 13) should return 2" do
    expect(binary_search([1, 5, 13, 23, 305, 333, 402, 454, 500], 13)).to eq(2)
  end

  it "should return nil if the target isn't found" do
    array = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10]
    target = 11
    expect(binary_search(array, target)).to be_nil
  end
end
