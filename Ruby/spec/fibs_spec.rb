require "fibs"

describe "fibs" do
  specify { expect(fibs(3)).to eq([0, 1, 1]) }
  specify { expect(fibs(5)).to eq([0, 1, 1, 2, 3]) }
end
