require "permutations"

describe "permutations" do
  specify { expect(permutations([1])).to match_array([[1]]) }
  specify { expect(permutations([1, 2])).to match_array([[1, 2], [2, 1]]) }
end
