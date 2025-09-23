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
- **Single test**: `python -m unittest test.test_<problem_name>`

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

### Adding New Problems

1. Add problem definition to `shared/problems.json` following the existing schema
2. Run the generation script to create initial test files
3. Create implementation files in each language's `lib/` directory

## Test Coverage

Problems are implemented across languages with varying coverage - check the README.md table for which problems are available in each language.