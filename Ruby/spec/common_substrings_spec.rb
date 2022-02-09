require "common_substrings"

describe "common_substrings" do
  specify { expect(common_substrings("Hello", "Hello World")).to eq("Hello") }
  specify { expect(common_substrings("ABABC", "BABCA")).to eq("BABC") }
end
