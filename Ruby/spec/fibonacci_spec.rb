require "fibonacci"

describe "fibonacci" do
  specify { expect(fibonacci(3)).to eq([0, 1, 1]) }
  specify { expect(fibonacci(5)).to eq([0, 1, 1, 2, 3]) }
end
