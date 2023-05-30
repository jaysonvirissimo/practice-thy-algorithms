import unittest
from lib.folding_cipher import folding_cipher

class TestFoldingCipher(unittest.TestCase):
    def test_folding_cipher(self):
      self.assertEqual(folding_cipher("abcm"), "zyxn")
      self.assertEqual(folding_cipher("zyxn"), "abcm")

if __name__ == '__main__':
    unittest.main()
