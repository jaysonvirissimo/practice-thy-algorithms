import json
import os

def generate_python_tests(problem_name, problem_data):
    test_cases = []

    # Check if we need custom comparison helpers for this problem
    needs_custom_helpers = any(
        test_case.get('comparison', {}).get('mode') not in [None, 'exact', 'default']
        for test_case in problem_data['testCases']
    )

    for test_case in problem_data['testCases']:
        input_args = ', '.join(repr(val) for val in test_case['input'].values())
        expected = repr(test_case['expected'])

        # Clean the description for a valid Python method name
        method_name = test_case['description'].lower()
        # Replace invalid characters with underscores and remove duplicates
        import re
        method_name = re.sub(r'[^a-zA-Z0-9_]', '_', method_name)
        method_name = re.sub(r'_+', '_', method_name)  # Replace multiple underscores with single
        method_name = method_name.strip('_')  # Remove leading/trailing underscores

        # Determine comparison method
        comparison_mode = test_case.get('comparison', {}).get('mode', 'default')

        if comparison_mode == 'unordered_array':
            assertion = f'self.assertEqualUnordered(result, expected)'
        elif comparison_mode == 'set_equality':
            assertion = f'self.assertEqualAsSet(result, expected)'
        elif comparison_mode == 'exact':
            assertion = f'self.assertEqual(result, expected)'
        else:
            # Use legacy logic for backward compatibility
            assertion = f'self.assertEqual(result, expected)'

        test_case_code = f'''    def test_{method_name}(self):
        """Test case: {test_case['description']}"""
        expected = {expected}
        result = {problem_name}({input_args})
        {assertion}'''

        test_cases.append(test_case_code)

    # Generate custom helper methods if needed
    custom_helpers = ''
    if needs_custom_helpers:
        custom_helpers = '''
    def assertEqualUnordered(self, received, expected):
        """Assert that two arrays have the same elements regardless of order."""
        if not isinstance(received, list) or not isinstance(expected, list):
            self.fail("Both values must be lists for unordered comparison")

        # For nested arrays (like Group Anagrams), sort each sub-array before comparison
        def sort_nested(arr):
            return sorted([
                sorted(item) if isinstance(item, list) else item
                for item in arr
            ], key=lambda x: str(x))

        sorted_received = sort_nested(received)
        sorted_expected = sort_nested(expected)

        self.assertEqual(sorted_received, sorted_expected,
                        f"Arrays should have same elements regardless of order.\\n"
                        f"Received: {received}\\n"
                        f"Expected: {expected}")

    def assertEqualAsSet(self, received, expected):
        """Assert that two arrays have the same unique elements (treating as sets)."""
        if not isinstance(received, list) or not isinstance(expected, list):
            self.fail("Both values must be lists for set comparison")

        set_received = set(str(item) for item in received)
        set_expected = set(str(item) for item in expected)

        self.assertEqual(set_received, set_expected,
                        f"Arrays should have same unique elements (treating as sets).\\n"
                        f"Received: {received}\\n"
                        f"Expected: {expected}")
'''

    test_content = f'''import unittest
import sys
import os
sys.path.append(os.path.join(os.path.dirname(__file__), '..', 'lib'))
from {problem_name} import {problem_name}


class Test{problem_name.title().replace('_', '')}(unittest.TestCase):
    """Test cases for {problem_data['title']} problem"""{custom_helpers}

{chr(10).join(test_cases)}


if __name__ == '__main__':
    unittest.main()
'''

    return test_content

def generate_all_tests():
    script_dir = os.path.dirname(os.path.abspath(__file__))
    problems_path = os.path.join(script_dir, '..', 'problems.json')

    with open(problems_path, 'r') as f:
        problems = json.load(f)

    for problem_name, problem_data in problems.items():
        test_content = generate_python_tests(problem_name, problem_data)
        output_path = os.path.join(script_dir, '..', '..', 'Python', 'test', f'test_{problem_name}.py')

        print(f"Generating Python test for {problem_name}...")
        with open(output_path, 'w') as f:
            f.write(test_content)

if __name__ == '__main__':
    generate_all_tests()