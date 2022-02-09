require "sum_upon_sums"

describe "sum_upon_sums" do
  it "should return the missing number" do
    array = [0, 3, 6, 4, 10, 5, 1, 9, 2, 8]
    expect(sum_upon_sums(array)).to eq(7)
  end

  it "should return the missing number" do
    array = [5, 1, 10, 3, 0, 4, 2, 7, 6, 8]
    expect(sum_upon_sums(array)).to eq(9)
  end
end
