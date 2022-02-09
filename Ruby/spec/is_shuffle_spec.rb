require "is_shuffle"

describe "is_shuffle?" do
  let(:first) { "abc" }
  let(:second) { "def" }

  specify { expect(is_shuffle?(first, second, "abdecf")).to be_truthy }
  specify { expect(is_shuffle?(first, second, "fcedba")).to be_falsy }
end
