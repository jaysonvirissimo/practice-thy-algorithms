require_relative "../lib/remove_nth_from_end"

describe "remove_nth_from_end" do
  it "should remove 2nd node from end [1,2,3,4,5] -> [1,2,3,5]" do
    expect(remove_nth_from_end([1, 2, 3, 4, 5], 2)).to eq([1, 2, 3, 5])
  end
  
  it "should remove only node [1] -> []" do
    expect(remove_nth_from_end([1], 1)).to eq([])
  end
  
  it "should remove last node [1,2] -> [1]" do
    expect(remove_nth_from_end([1, 2], 1)).to eq([1])
  end
  
  it "should remove first node [1,2] -> [2]" do
    expect(remove_nth_from_end([1, 2], 2)).to eq([2])
  end
  
  it "should remove first node [1,2,3,4,5] -> [2,3,4,5]" do
    expect(remove_nth_from_end([1, 2, 3, 4, 5], 5)).to eq([2, 3, 4, 5])
  end
end
