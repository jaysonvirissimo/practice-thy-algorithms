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

## Test Coverage

Problems are implemented across languages with varying coverage - check the README.md table for which problems are available in each language.