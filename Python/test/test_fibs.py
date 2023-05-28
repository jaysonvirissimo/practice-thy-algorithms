import unittest
from lib.fibs import fibs

class TestFibs(unittest.TestCase):
    def test_fibs(self):
      self.assertEqual(fibs(3), [0, 1, 1])
      self.assertEqual(fibs(5), [0, 1, 1, 2, 3])

if __name__ == '__main__':
    unittest.main()
