require "move_zeros"

describe "move_zeros" do
  it "should return an array with the same elements" do
    array = [1, 2, 0, 3, 4, 0, 5, 6, 0]
    expect(move_zeros(array).sort).to match_array(array.sort)
  end

  it "should move all the zeros to the end of the array" do
    array = [1, 2, 0, 3, 4, 0, 5, 6, 0]
    expect(move_zeros(array).drop(6)).to match_array([0, 0, 0])
  end
end
