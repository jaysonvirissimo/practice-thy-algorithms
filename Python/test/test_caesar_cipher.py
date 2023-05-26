import unittest
from lib.caesar_cipher import caesar_cipher

class TestIsPalindrome(unittest.TestCase):
    def test_caesar_cipher(self):
      self.assertEqual(caesar_cipher("hello", 4), "lipps")
      self.assertEqual(caesar_cipher("abc", 0), "abc")
      self.assertEqual(caesar_cipher("asdf asdf", 13), "nfqs nfqs")

if __name__ == '__main__':
    unittest.main()