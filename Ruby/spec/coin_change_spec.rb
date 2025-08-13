require "coin_change"

describe CoinChange do
  describe "#make_change" do
    it "uses only 3 coins to make change for 36 cents" do
      subject = CoinChange.new
      expect(subject.make_change(36)).to contain_exactly(25, 10, 1)
    end
  end
end
