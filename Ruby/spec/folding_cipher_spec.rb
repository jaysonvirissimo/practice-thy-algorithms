require "folding_cipher"

describe "folding_cipher" do
  specify { expect(folding_cipher("abcm")).to eq("zyxn") }
  specify { expect(folding_cipher("zyxn")).to eq("abcm") }
end
