require "lcs"

describe "lcs" do
  specify { expect(lcs([4, -1, 5, 6, -13, 2])).to eq(14) }
  specify { expect(lcs([-2, 1, -3, 4, -1, 2, 1, -5, 4])).to eq(6) }
end
