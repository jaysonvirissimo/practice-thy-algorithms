require "binary"

describe "binary" do
  specify { expect(binary(0)).to eq("0") }
  specify { expect(binary(5)).to eq("101") }
  specify { expect(binary(15)).to eq("1111") }
end
