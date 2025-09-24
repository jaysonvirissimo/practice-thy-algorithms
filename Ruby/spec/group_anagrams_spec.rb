require_relative "../lib/group_anagrams"

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

describe "group_anagrams" do
  it "should group anagrams correctly with mixed groups" do
    expect(group_anagrams(["eat", "tea", "tan", "ate", "nat", "bat"])).to match_unordered([["eat", "tea", "ate"], ["tan", "nat"], ["bat"]])
  end
  
  it "should handle single empty string" do
    expect(group_anagrams([""])).to eq([[""]])
  end
  
  it "should handle single character string" do
    expect(group_anagrams(["a"])).to eq([["a"]])
  end
end
