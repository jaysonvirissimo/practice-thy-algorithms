import unittest
from lib.fibonacci import fibonacci

class TestFibonacci(unittest.TestCase):
    def test_fibonacci(self):
      self.assertEqual(fibonacci(3), [0, 1, 1])
      self.assertEqual(fibonacci(5), [0, 1, 1, 2, 3])

if __name__ == '__main__':
    unittest.main()