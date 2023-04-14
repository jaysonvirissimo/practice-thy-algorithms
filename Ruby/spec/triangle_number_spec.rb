require "triangle_number"

describe "#triangle_number" do
  specify { expect(triangle_number(1)).to eq(1) }
  specify { expect(triangle_number(2)).to eq(3) }
  specify { expect(triangle_number(3)).to eq(6) }
  specify { expect(triangle_number(4)).to eq(10) }
  specify { expect(triangle_number(5)).to eq(15) }
  specify { expect(triangle_number(6)).to eq(21) }
  specify { expect(triangle_number(7)).to eq(28) }
end
