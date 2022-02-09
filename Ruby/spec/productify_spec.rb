require "productify"

describe "productify" do
  specify { expect(productify([2, 3, 5])).to match_array([15, 10, 6]) }
  specify { expect(productify([4, 2, 5, 7])).to match_array([70, 140, 56, 40]) }
end
