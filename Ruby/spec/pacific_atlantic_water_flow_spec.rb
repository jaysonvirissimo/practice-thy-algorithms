require_relative "../lib/pacific_atlantic_water_flow"

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

describe "pacific_atlantic_water_flow" do
  it "should return coordinates reachable by both oceans" do
    expect(pacific_atlantic_water_flow([[1, 2, 2, 3, 5], [3, 2, 3, 4, 4], [2, 4, 5, 3, 1], [6, 7, 1, 4, 5], [5, 1, 1, 2, 4]])).to match_unordered([[0, 4], [1, 3], [1, 4], [2, 2], [3, 0], [3, 1], [4, 0]])
  end
  
  it "should return [0,0] for single cell touching both oceans" do
    expect(pacific_atlantic_water_flow([[1]])).to eq([[0, 0]])
  end
  
  it "should return all cells for 2x2 grid" do
    expect(pacific_atlantic_water_flow([[1, 2], [2, 1]])).to match_unordered([[0, 0], [0, 1], [1, 0], [1, 1]])
  end
  
  it "should return corner and edge cells for increasing heights" do
    expect(pacific_atlantic_water_flow([[1, 2, 3], [4, 5, 6], [7, 8, 9]])).to match_unordered([[0, 2], [1, 2], [2, 0], [2, 1], [2, 2]])
  end
end
