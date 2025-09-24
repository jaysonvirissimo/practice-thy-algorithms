require_relative "../lib/reverse_linked_list"

describe "reverse_linked_list" do
  it "should reverse a 5-node list from [1,2,3,4,5] to [5,4,3,2,1]" do
    expect(reverse_linked_list([1, 2, 3, 4, 5])).to eq([5, 4, 3, 2, 1])
  end
  
  it "should reverse a 2-node list from [1,2] to [2,1]" do
    expect(reverse_linked_list([1, 2])).to eq([2, 1])
  end
  
  it "should handle empty list and return empty list" do
    expect(reverse_linked_list([])).to eq([])
  end
end
