require "unique_paths"

describe "#unique_paths" do
  specify { expect(unique_paths(3, 7)).to eq(28) }
  specify { expect(unique_paths(4, 12)).to eq(364) }
  specify { expect(unique_paths(5, 15)).to eq(3060) }

  it "is recursive" do
    expect(self).to receive(:unique_paths).at_least(:twice).and_call_original

    unique_paths(3, 3)
  end

  it "is efficient" do
    expect(self).to receive(:unique_paths)
      .at_most(9)
      .times
      .and_call_original

    unique_paths(3, 3)
  end
end
