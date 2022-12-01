require "iterative_factorial"

describe "iterative_factorial" do
  specify { expect(iterative_factorial(0)).to eq(1) }
  specify { expect(iterative_factorial(1)).to eq(1) }
  specify { expect(iterative_factorial(3)).to eq(6) }
  specify { expect(iterative_factorial(5)).to eq(120) }

  it "does not call itself" do
    allow(self).to receive(:iterative_factorial).at_least(:once).and_call_original
    iterative_factorial(10)

    expect(self).to have_received(:iterative_factorial).exactly(:once)
  end
end
