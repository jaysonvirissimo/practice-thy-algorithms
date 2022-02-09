require "caesar_cipher"

describe "caesar_cipher" do
  specify { expect(caesar_cipher("hello", 4)).to eq("lipps") }
  specify { expect(caesar_cipher("abc", 0)).to eq("abc") }
  specify { expect(caesar_cipher("asdf asdf", 13)).to eq("nfqs nfqs") }
end
