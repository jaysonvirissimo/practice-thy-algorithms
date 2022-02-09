require "iterative_factorial"

describe "iterative_factorial" do
  specify { expect(recursive_factorial(0)).to eq(1) }
  specify { expect(recursive_factorial(1)).to eq(1) }
  specify { expect(recursive_factorial(3)).to eq(6) }
  specify { expect(recursive_factorial(5)).to eq(120) }

  it "does not call itself" do
    expect(self).to_not receive(:iterative_factorial)
      .at_least(:twice).and_call_original
    recursive_factorial(10)
  end
end
