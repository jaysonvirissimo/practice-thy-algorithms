require "valid_ip"

describe "valid_ip?" do
  specify { expect(valid_ip?("1.1.1.1")).to be_truthy }
  specify { expect(valid_ip?("256.2.2.2")).to be_falsy }
end
