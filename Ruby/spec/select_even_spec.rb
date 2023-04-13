require "select_even"

describe "#select_even" do
  specify do
    expect(select_even([1, 2, 3, 4, 5, 6])).to match_array([2, 4, 6])
  end

  it "calls itself" do
    expect(self).to receive(:select_even)
      .at_least(:twice)
      .and_call_original
    select_even([1, 2])
  end 
end
