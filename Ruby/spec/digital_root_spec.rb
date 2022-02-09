require "digital_root"

describe "digital_root" do
  specify { expect(digital_root(65_536)).to eq(7) }
  specify { expect(digital_root(1853)).to eq(8) }
end
