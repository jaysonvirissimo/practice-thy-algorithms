import unittest
from lib.subsets import subsets

class TestSubsets(unittest.TestCase):
    def test_subsets(self):
        self.assertEqual(subsets([]), [[]])
        self.assertEqual(subsets([1, 2, 3]), [[], [1], [2], [3], [1, 2], [1, 3], [2, 3], [1, 2, 3]])

if __name__ == '__main__':
    unittest.main()
