require 'json'

def generate_ruby_tests(problem_name, problem_data)
  test_cases = problem_data['testCases'].map do |test_case|
    input_args = test_case['input'].values.map { |val| val.inspect }.join(', ')
    expected_pairs = test_case['expected']

    <<~TEST
      it "#{test_case['description']}" do
        #{expected_pairs.map { |pair| "set.add(#{pair.inspect})" }.join("\n    ")}
        expect(#{problem_name}(#{input_args})).to eq(set)
      end
    TEST
  end.join("\n")

  <<~SPEC
require "#{problem_name}"
require "set"

describe "#{problem_name}" do
  let(:set) { Set.new }

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