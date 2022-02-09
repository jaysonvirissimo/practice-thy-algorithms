require "find_missing_number"

describe "find_missing_number" do
  let(:integers) { [1, 2, 3, 4, 5, 6, 7, 8, 9, 10] }
  let(:shuffled) { [8, 7, 2, 1, 10, 9, 6, 3, 5] }
  let(:deleted) { 4 }

  specify { expect(find_missing_number(integers, shuffled)).to eq(deleted) }
end
