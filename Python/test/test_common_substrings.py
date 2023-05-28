import unittest
from lib.common_substrings import common_substrings

class TestCommonSubstrings(unittest.TestCase):
    def test_common_substrings(self):
        self.assertEqual(common_substrings("Hello", "Hellow World"), "Hello")
        self.assertEqual(common_substrings("ABABC", "BABCA"), "BABC")

if __name__ == '__main__':
    unittest.main()
