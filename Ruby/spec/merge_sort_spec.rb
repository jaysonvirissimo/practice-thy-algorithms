require "merge_sort"

describe "merge_sort" do
  specify { expect(merge_sort([1452, 23, 1, 5])).to eq([1, 5, 23, 1452]) }
  specify { expect(merge_sort([10, 4, 6, 2])).to eq([2, 4, 6, 10]) }
end
