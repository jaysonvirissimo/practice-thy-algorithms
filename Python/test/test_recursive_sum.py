import unittest
from lib.recursive_sum import recursive_sum

class TestRecursiveSum(unittest.TestCase):
    def test_recursive_sum(self):
        self.assertEqual(recursive_sum([1, 2, 3]), 6)
        self.assertEqual(recursive_sum([99, 66, 33]), 198)

if __name__ == '__main__':
    unittest.main()
