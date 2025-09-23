import json
import os

def generate_python_tests(problem_name, problem_data):
    test_cases = []

    for test_case in problem_data['testCases']:
        input_args = ', '.join(repr(val) for val in test_case['input'].values())
        expected = repr(test_case['expected'])

        test_case_code = f'''    def test_{test_case['description'].replace(' ', '_').replace('?', '').lower()}(self):
        """Test case: {test_case['description']}"""
        expected = {expected}
        result = {problem_name}({input_args})
        self.assertEqual(result, expected)'''

        test_cases.append(test_case_code)

    test_content = f'''import unittest
import sys
import os
sys.path.append(os.path.join(os.path.dirname(__file__), '..', 'lib'))
from {problem_name} import {problem_name}


class Test{problem_name.title().replace('_', '')}(unittest.TestCase):
    """Test cases for {problem_data['title']} problem"""

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