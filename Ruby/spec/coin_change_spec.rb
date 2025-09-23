require_relative "../lib/coin_change"

describe "coin_change" do
  it "should return [25, 10, 1] using minimum 3 coins for 36 cents" do
    expect(coin_change(36, [1, 5, 10, 25])).to eq([25, 10, 1])
  end
  
  it "should return [25, 10, 5, 1, 1, 1] using minimum 6 coins for 43 cents" do
    expect(coin_change(43, [1, 5, 10, 25])).to eq([25, 10, 5, 1, 1, 1])
  end
  
  it "should return [25, 25, 10, 5, 1, 1] using minimum 6 coins for 67 cents" do
    expect(coin_change(67, [1, 5, 10, 25])).to eq([25, 25, 10, 5, 1, 1])
  end
end
