require "look_and_say"

describe "look_and_say" do
  it "should describe the count of the elements in the array as they appear" do
    expect(look_and_say([1])).to match_array([[1, 1]])
  end

  it "should describe the count of the elements in the array as they appear" do
    expect(look_and_say([1, 2, 1, 1])).to match_array([[1, 1], [1, 2], [2, 1]])
  end
end
