require_relative "../lib/merge_intervals"

describe "merge_intervals" do
  it "should merge overlapping intervals [1,3] and [2,6] into [1,6]" do
    expect(merge_intervals([[1, 3], [2, 6], [8, 10], [15, 18]])).to eq([[1, 6], [8, 10], [15, 18]])
  end
  
  it "should merge touching intervals [1,4] and [4,5] into [1,5]" do
    expect(merge_intervals([[1, 4], [4, 5]])).to eq([[1, 5]])
  end
  
  it "should merge overlapping intervals after sorting [4,7] and [1,4] into [1,7]" do
    expect(merge_intervals([[4, 7], [1, 4]])).to eq([[1, 7]])
  end
end
