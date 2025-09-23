require_relative "../lib/product_of_array_except_self"

describe "product_of_array_except_self" do
  it "should return [24, 12, 8, 6] where each element is the product of all others" do
    expect(product_of_array_except_self([1, 2, 3, 4])).to eq([24, 12, 8, 6])
  end
  
  it "should return [0, 0, 9, 0, 0] handling negative numbers and zero" do
    expect(product_of_array_except_self([-1, 1, 0, -3, 3])).to eq([0, 0, 9, 0, 0])
  end
  
  it "should return [60, 40, 30, 24] for consecutive integer sequence" do
    expect(product_of_array_except_self([2, 3, 4, 5])).to eq([60, 40, 30, 24])
  end
end
