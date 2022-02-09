require "sort_three"

describe "sort_three" do
  it "should 'sort' an array of strings with known length" do
    array = %w[bbb ccc aaa]
    expect(sort_three(array, array.first.length)).to match_array(array.sort)
  end

  it "should 'sort' an array of strings with known length" do
    array = %w[zz yy xx aa bb cc]
    expect(sort_three(array, array.first.length)).to match_array(array.sort)
  end
end
