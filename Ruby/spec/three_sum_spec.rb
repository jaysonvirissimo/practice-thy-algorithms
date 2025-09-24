require_relative "../lib/three_sum"

# Custom RSpec matchers for advanced array comparison
RSpec::Matchers.define :match_unordered do |expected|
  match do |actual|
    return false unless actual.is_a?(Array) && expected.is_a?(Array)

    # For nested arrays (like Group Anagrams), sort each sub-array before comparison
    sort_nested = lambda do |arr|
      arr.map { |item| item.is_a?(Array) ? item.sort : item }
         .sort_by(&:to_s)
    end

    sort_nested.call(actual) == sort_nested.call(expected)
  end

  failure_message do |actual|
    "Expected arrays to have same elements regardless of order." \
    " Actual: #{actual.inspect}, Expected: #{expected.inspect}"
  end
end

RSpec::Matchers.define :match_as_set do |expected|
  match do |actual|
    return false unless actual.is_a?(Array) && expected.is_a?(Array)

    actual.map(&:to_s).to_set == expected.map(&:to_s).to_set
  end

  failure_message do |actual|
    "Expected arrays to have same unique elements (treating as sets)." \
    " Actual: #{actual.inspect}, Expected: #{expected.inspect}"
  end
end

describe "three_sum" do
  it "should return [[-1, -1, 2], [-1, 0, 1]] for mixed positive and negative values" do
    expect(three_sum([-1, 0, 1, 2, -1, -4])).to match_unordered([[-1, -1, 2], [-1, 0, 1]])
  end
  
  it "should return empty array when no valid triplets exist" do
    expect(three_sum([0, 1, 1])).to eq([])
  end
  
  it "should return [[0, 0, 0]] for array of all zeros" do
    expect(three_sum([0, 0, 0])).to eq([[0, 0, 0]])
  end
end
