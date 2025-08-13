require "maximum_subarray"

describe "maximum_subarray" do
  specify { expect(maximum_subarray([4, -1, 5, 6, -13, 2])).to eq(14) }
  specify { expect(maximum_subarray([-2, 1, -3, 4, -1, 2, 1, -5, 4])).to eq(6) }
end
