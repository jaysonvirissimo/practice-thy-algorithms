require_relative "../lib/best_time_to_buy_and_sell_stock"

describe "best_time_to_buy_and_sell_stock" do
  it "should return 5 by buying at price 1 and selling at price 6" do
    expect(best_time_to_buy_and_sell_stock([7, 1, 5, 3, 6, 4])).to eq(5)
  end
  
  it "should return 0 when prices only decrease" do
    expect(best_time_to_buy_and_sell_stock([7, 6, 4, 3, 1])).to eq(0)
  end
  
  it "should return 4 by buying at price 1 and selling at price 5" do
    expect(best_time_to_buy_and_sell_stock([1, 2, 3, 4, 5])).to eq(4)
  end
end
