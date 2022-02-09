require "recursive_factorial"

describe "recursive_factorial" do
  specify { expect(recursive_factorial(0)).to eq(1) }
  specify { expect(recursive_factorial(1)).to eq(1) }
  specify { expect(recursive_factorial(3)).to eq(6) }
  specify { expect(recursive_factorial(5)).to eq(120) }

  it "calls itself" do
    expect(self).to receive(:recursive_factorial)
      .at_least(:twice).and_call_original
    recursive_factorial(10)
  end
end
