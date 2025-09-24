require 'json'

def generate_ruby_tests(problem_name, problem_data)
  # Check if we need custom matchers for this problem
  needs_custom_matchers = problem_data['testCases'].any? do |test_case|
    comparison = test_case['comparison']
    comparison && comparison['mode'] && !['exact', 'default'].include?(comparison['mode'])
  end

  test_cases = problem_data['testCases'].map do |test_case|
    input_args = test_case['input'].values.map { |val| val.inspect }.join(', ')
    expected = test_case['expected']

    # Determine comparison method
    comparison_mode = test_case.dig('comparison', 'mode') || 'default'

    matcher = case comparison_mode
              when 'unordered_array'
                "match_unordered(#{expected.inspect})"
              when 'set_equality'
                "match_as_set(#{expected.inspect})"
              when 'exact'
                "eq(#{expected.inspect})"
              else
                # Use legacy logic for backward compatibility
                "eq(#{expected.inspect})"
              end

    <<~TEST
      it "#{test_case['description']}" do
        expect(#{problem_name}(#{input_args})).to #{matcher}
      end
    TEST
  end.join("\n")

  # Generate custom matchers if needed
  custom_matchers = if needs_custom_matchers
    <<~MATCHERS

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
    "Expected arrays to have same elements regardless of order." \\
    " Actual: \#{actual.inspect}, Expected: \#{expected.inspect}"
  end
end

RSpec::Matchers.define :match_as_set do |expected|
  match do |actual|
    return false unless actual.is_a?(Array) && expected.is_a?(Array)

    actual.map(&:to_s).to_set == expected.map(&:to_s).to_set
  end

  failure_message do |actual|
    "Expected arrays to have same unique elements (treating as sets)." \\
    " Actual: \#{actual.inspect}, Expected: \#{expected.inspect}"
  end
end
    MATCHERS
  else
    ''
  end

  <<~SPEC
require_relative "../lib/#{problem_name}"
#{custom_matchers}
describe "#{problem_name}" do
#{test_cases.gsub(/^/, '  ')}end
SPEC
end

def generate_all_tests
  problems_path = File.join(__dir__, '..', 'problems.json')
  problems = JSON.parse(File.read(problems_path))

  problems.each do |problem_name, problem_data|
    test_content = generate_ruby_tests(problem_name, problem_data)
    output_path = File.join(__dir__, '..', '..', 'Ruby', 'spec', "#{problem_name}_spec.rb")

    puts "Generating Ruby test for #{problem_name}..."
    File.write(output_path, test_content)
  end
end

# Can be run directly
if __FILE__ == $0
  generate_all_tests
end