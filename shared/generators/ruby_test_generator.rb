require 'json'

def generate_ruby_tests(problem_name, problem_data)
  return_type = problem_data['returnType']['ruby']
  uses_set = return_type.include?('set')

  test_cases = problem_data['testCases'].map do |test_case|
    input_args = test_case['input'].values.map { |val| val.inspect }.join(', ')
    expected = test_case['expected']

    if uses_set
      # For set-based returns (like two_sum), populate a set
      expected_pairs = expected
      <<~TEST
        it "#{test_case['description']}" do
          #{expected_pairs.map { |pair| "set.add(#{pair.inspect})" }.join("\n    ")}
          expect(#{problem_name}(#{input_args})).to eq(set)
        end
      TEST
    else
      # For simple returns (like maximum_subarray), compare directly
      <<~TEST
        it "#{test_case['description']}" do
          expect(#{problem_name}(#{input_args})).to eq(#{expected.inspect})
        end
      TEST
    end
  end.join("\n")

  if uses_set
    <<~SPEC
require "#{problem_name}"
require "set"

describe "#{problem_name}" do
  let(:set) { Set.new }

#{test_cases.gsub(/^/, '  ')}end
SPEC
  else
    <<~SPEC
require "#{problem_name}"

describe "#{problem_name}" do
#{test_cases.gsub(/^/, '  ')}end
SPEC
  end
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