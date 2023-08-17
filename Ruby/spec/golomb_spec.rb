require "golomb"

describe "golomb" do
  let(:sequence) do
    [1, 2, 2, 3, 3, 4, 4, 4, 5, 5, 5, 6, 6, 6, 6, 7, 7, 7, 7]
  end

  it "returns the Nth number in the sequence" do
    sequence.each_with_index do |n, index|
      expect(golomb(index + 1)).to eq(n)
    end
  end

  it "is recursive" do
    expect(self).to receive(:golomb).at_least(:twice).and_call_original
    golomb(10)
  end

  it "is optimized to avoid unecessary method calls" do
    expect(self).to receive(:golomb).at_most(28).times.and_call_original
    golomb(10)
  end
end
