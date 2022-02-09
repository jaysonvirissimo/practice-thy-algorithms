require "can_win"

describe "can_win?" do
  it "should return false if can't win" do
    array = [1, 2, 3, 4, 5, 0]
    expect(can_win?(array, 1)).to be_falsy
  end

  it "should return true if can win" do
    array = [3, 1, 5, 7, 9, 2, 9, 0]
    expect(can_win?(array, 1)).to be_truthy
  end
end
