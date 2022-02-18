require "decimal_to_binary"

describe "decimal_to_binary" do
  specify { expect(decimal_to_binary(0)).to eq("0") }
  specify { expect(decimal_to_binary(5)).to eq("101") }
  specify { expect(decimal_to_binary(15)).to eq("1111") }
end
