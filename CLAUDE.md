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
4. **IMPORTANT: Update README.md** - Add the new problem to the main README.md table showing which languages have implementations
5. **Test validation**: Write complete solutions to verify tests work properly, then remove the actual implementation code, leaving only the function signature and problem description comments
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

### Test Generator Comparison Logic Issues

**Critical Discovery**: The test generators use overly simplistic logic to determine comparison methods:

**JavaScript Generator Logic**:
```javascript
const isArray = returnType.includes('array');
if (isArray) {
  // Uses toEqual() for deep equality
} else {
  // Uses toBe() for reference/primitive equality
}
```

**Problems with Current Approach**:
1. **String-based detection**: Only checks if return type contains literal string "array"
2. **No actual test data analysis**: Doesn't examine what the test cases actually contain
3. **Complex data structure issues**: Problems like Reverse Linked List return `ListNode` but tests compare arrays
4. **No ordering consideration**: All arrays use `toEqual()` which requires exact ordering

**Abstraction Layer Pattern**:
For complex data structures (linked lists, trees), implement:
- **Core algorithm function**: Works with actual data structures (e.g., `reverseList(head)` returns `ListNode`)
- **Test wrapper function**: Converts between arrays and data structures for testability
- **Helper functions**: `arrayToList()`, `listToArray()`, etc.

**Common Failure**: Tests fail with "received serializes to the same string" when using `toBe()` instead of `toEqual()` for array comparisons.

### Proposed Test Generator Enhancements

**Enhanced JSON Schema**:
Add optional comparison metadata to test cases:
```json
{
  "testCases": [
    {
      "input": {"nums": [1, 2, 3]},
      "expected": [[1, 2], [2, 3]],
      "description": "should return pairs",
      "comparison": {
        "mode": "unordered_array",  // Options: "exact", "unordered_array", "set_equality"
        "type": "deep_equality"     // Options: "reference", "deep_equality", "custom"
      }
    }
  ]
}
```

**Comparison Modes**:
1. **"exact"**: Arrays must match exactly (current `toEqual()` behavior)
2. **"unordered_array"**: Array contents must match but order doesn't matter
3. **"set_equality"**: Treats arrays as sets (no duplicates, no order)

**Enhanced Generator Logic**:
```javascript
function generateComparison(testCase, problemData) {
  const comparison = testCase.comparison || getDefaultComparison(problemData.returnType);

  switch (comparison.mode) {
    case "exact":
      return "toEqual";
    case "unordered_array":
      return "toEqualUnordered";  // Custom matcher
    case "set_equality":
      return "toEqualAsSet";      // Custom matcher
    default:
      return inferComparisonFromType(testCase.expected);
  }
}
```

**Custom Jest Matchers** (for JavaScript):
```javascript
expect.extend({
  toEqualUnordered(received, expected) {
    if (!Array.isArray(received) || !Array.isArray(expected)) {
      return { pass: false, message: () => "Both values must be arrays" };
    }
    const sortedReceived = [...received].sort();
    const sortedExpected = [...expected].sort();
    return {
      pass: JSON.stringify(sortedReceived) === JSON.stringify(sortedExpected),
      message: () => `Expected arrays to have same elements regardless of order`
    };
  }
});
```

**Backward Compatibility**: Default behavior remains unchanged; enhancements are opt-in through metadata.

## Enhanced Test Comparison System (IMPLEMENTED)

The test generator system now supports advanced array comparison modes through optional metadata in `shared/problems.json`.

### Usage

Add comparison metadata to test cases in `problems.json`:

```json
{
  "input": {"strs": ["eat", "tea", "tan"]},
  "expected": [["eat", "tea"], ["tan"]],
  "description": "should group anagrams correctly",
  "comparison": {
    "mode": "unordered_array",
    "type": "deep_equality"
  }
}
```

### Available Comparison Modes

1. **"exact"** (default): Arrays must match exactly (standard behavior)
2. **"unordered_array"**: Array contents must match but order doesn't matter
3. **"set_equality"**: Treats arrays as sets (no duplicates, no order consideration)

### Language-Specific Implementation

**JavaScript**:
- Uses custom Jest matchers: `toEqualUnordered()`, `toEqualAsSet()`
- Automatically injected into test files when needed
- Handles nested arrays (like Group Anagrams) correctly

**Python**:
- Uses custom assertion methods: `assertEqualUnordered()`, `assertEqualAsSet()`
- Added as class methods to test classes when needed
- Properly sorts nested structures before comparison

**Ruby**:
- Uses custom RSpec matchers: `match_unordered()`, `match_as_set()`
- Automatically defined in test files when needed
- Leverages Ruby's functional programming features

### Problems Using Enhanced Comparison

- **Group Anagrams**: Uses `"unordered_array"` mode since result groups can be in any order
- **Three Sum**: Uses `"unordered_array"` mode since triplet order doesn't matter

### Benefits

- **No more manual result adjustment**: Problems with "any order" requirements work automatically
- **Robust comparison logic**: Handles nested arrays, different data types, and edge cases
- **Backward compatible**: Existing tests continue working without changes
- **Maintainable**: Centralized comparison logic in generators, not scattered across tests

## Test Coverage

Problems are implemented across languages with varying coverage - check the README.md table for which problems are available in each language.