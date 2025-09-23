# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Repository Structure

This is a multi-language algorithm practice repository with implementations in JavaScript, Python, and Ruby. Each language has its own directory with a consistent structure:

- `lib/` - Problem implementations and solution code
- `test/` or `spec/` - Test files for each problem

## Development Commands

### JavaScript
- **Setup**: `cd JavaScript && npm install`
- **Run tests**: `npm test` (uses Jest)
- **Single test**: `npx jest test/<test_file>.test.js`

### Python
- **Setup**: No additional setup required (standard library only)
- **Run tests**: `python -m unittest discover -s test`
- **Single test**: `python -m unittest discover -s test -p "test_<problem_name>.py"`
- **Generate tests**: `python ../shared/generators/python_test_generator.py`

### Ruby
- **Setup**: `cd Ruby && bundle install`
- **Run tests**: `rspec`
- **Single test**: `rspec spec/<problem_name>_spec.rb`
- **Ruby version**: 3.1.3 (specified in Gemfile)

## Architecture

The repository follows a test-driven development approach where:

1. Problem statements are documented within the implementation files in `lib/`
2. Each problem has corresponding test files that validate the solution
3. Tests are designed to provide feedback on algorithm correctness and performance
4. Some Ruby tests include benchmarking using rspec-benchmark

## Working with Problems

When implementing solutions:
- Problem descriptions are embedded as comments in the `lib/` files
- Follow the existing function signatures and return types
- All problems should pass their respective test suites
- Code should be placed in the appropriate language directory's `lib/` folder

## Shared Problem Definition System

The repository uses a centralized JSON system for problem definitions and test cases:

- **Problem definitions**: `shared/problems.json` - Single source of truth for problem statements, test cases, and function signatures
- **Test generation**: Language-specific generators in `shared/generators/` convert JSON to test files
- **Automation**: `shared/generate_all_tests.sh` regenerates all test files from the shared definitions

### Adding New Test Cases

To add test cases for existing problems:
1. Edit `shared/problems.json` to add new entries to the `testCases` array
2. Run `./shared/generate_all_tests.sh` to regenerate all test files
3. Alternatively, use language-specific commands:
   - JavaScript: `cd JavaScript && npm run generate-tests`
   - Ruby: `cd Ruby && rake generate_tests`
   - Python: `cd Python && python ../shared/generators/python_test_generator.py`

### Adding New Problems

1. Add problem definition to `shared/problems.json` following the existing schema
2. Run the generation script to create initial test files
3. Create implementation files in each language's `lib/` directory
4. **Test validation**: Write complete solutions to verify tests work properly, then remove the actual implementation code, leaving only the function signature and problem description comments
   - **Python syntax requirement**: Python functions must include a `pass` statement in empty function bodies, as Python cannot have syntactically empty functions unlike JavaScript and Ruby

### Problem Description Guidelines

When writing problem descriptions for `shared/problems.json`, use academic and original language to avoid copyright concerns while maintaining clarity:

**Academic Style Elements:**
- Use formal vocabulary: "implement", "design", "develop", "construct", "determine"
- Technical precision: "contiguous subsequence", "distinct shortest paths", "optimal solution"
- Algorithm focus: "classic dynamic programming problem", "recursive algorithm", "optimization problem"
- Performance guidance: "strive for an optimal O(n) solution using constant space"

**Examples of Academic Rephrasing:**
- Instead of: "Given an array of integers and a target sum, return the indices..."
- Use: "Implement a function that locates a pair of elements within an integer array whose sum equals a specified target value..."

- Instead of: "Find the largest contiguous subarray sum..."
- Use: "Design an algorithm to determine the maximum sum achievable from any contiguous subsequence..."

- Instead of: "Count paths in a grid from top-left to bottom-right..."
- Use: "Develop a recursive algorithm to count the total number of distinct shortest paths through a rectangular grid..."

**Key Principles:**
- Maintain complete problem requirements and constraints
- Use textbook-style formal language
- Emphasize algorithmic thinking and optimization
- Be distinctly different from common online problem statements
- Ensure clarity despite formal tone

**Constraint Formatting:**
- When copying constraints from external sources, be careful with scientific notation formatting
- Common issue: "1 <= x <= 105" should be written as "1 <= x <= 10^5"
- Always use proper exponential notation (10^5) rather than concatenated numbers (105) to avoid ambiguity
- Example: "arrays with up to 100,000 elements" is clearer than "arrays with up to 105 elements"
- **Use common sense**: Consider the context - for algorithm problems, "105" is almost certainly 10^5 (100,000) rather than the literal number 105, as most practical algorithms deal with larger datasets

### Test Generator Function Naming Issues

**Known Issue**: The test generators sometimes use inconsistent function naming between the JSON signatures and actual test expectations:

- **JavaScript**: Generally follows camelCase from JSON (e.g., `productExceptSelf`) but test files sometimes expect different names (e.g., `mergeIntervals` vs `merge`)
- **Ruby/Python**: Test generators often use snake_case problem key names instead of respecting the JSON function signatures
  - Example: JSON specifies `max_profit` but tests expect `best_time_to_buy_and_sell_stock`
  - **Workaround**: Match implementation function names to test expectations rather than JSON signatures

**Best Practice**: Always check the generated test files to confirm the expected function name before implementing solutions.

### Test Output Ordering Considerations

**Important**: When implementing problems that return collections (arrays, lists), be aware that:

- Problem statements often specify "return the answer in any order" (e.g., Group Anagrams, Three Sum)
- Test cases should specify one consistent expected ordering rather than trying to test all valid orderings
- When implementing algorithms, use the natural ordering your algorithm produces
- If tests fail due to ordering differences, update the expected results in `shared/problems.json` to match the algorithm's natural output, then regenerate test files

**Example**: Group Anagrams naturally groups by the order elements are first encountered, which may differ from problem examples that show arbitrary orderings.

## Test Coverage

Problems are implemented across languages with varying coverage - check the README.md table for which problems are available in each language.