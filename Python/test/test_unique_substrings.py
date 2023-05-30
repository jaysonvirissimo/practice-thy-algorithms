import unittest
from lib.unique_substrings import unique_substrings

class TestUniqueSubstrings(unittest.TestCase):
    def test_uniq_substrings(self):
        array = ['a', 'b', 'c', 'd', 'ab', 'bc', 'cd', 'abc', 'bcd', 'abcd']
        self.assertEqual(set(unique_substrings("abcd")), set(array))

    def test_no_repeats(self):
        array = ['d', 'du', 'dud', 'dude', 'u', 'ud', 'ude', 'de', 'e']
        self.assertEqual(set(unique_substrings("dude")), set(array))

if __name__ == '__main__':
    unittest.main()
