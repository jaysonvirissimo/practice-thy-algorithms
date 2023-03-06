require "spec_helper"
require "binary_search"

describe "binary_search" do
  it "returns the proper index" do
    expect(binary_search([1, 5, 13, 23, 305, 333, 402, 454, 500], 13)).to eq(2)
  end

  it "should return nil if the target isn't found" do
    array = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10]
    target = 11
    expect(binary_search(array, target)).to be_nil
  end

  it "performs faster than linear search" do
    array = (0..100_000).to_a
    target = 64_000

    expect { binary_search(array, target) }.to perform_faster_than { linear_search(array, target) }
  end

  def linear_search(array, target)
    (0...array.length).each do |index|
      return index if array[index] == target
    end

    nil
  end
end
