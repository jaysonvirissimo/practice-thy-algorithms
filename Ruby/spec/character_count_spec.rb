require "character_count"

describe "#character_count" do
  specify do
    expect(character_count(["a", "bc", "def"])).to eq(6)
  end

  it "calls itself" do
    expect(self).to receive(:character_count)
      .at_least(:twice)
      .and_call_original
    character_count(["a", "bc", "def"])
  end 
end
