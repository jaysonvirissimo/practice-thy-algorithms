import unittest
from lib.is_palindrome import is_palindrome

class TestIsPalindrome(unittest.TestCase):
    def test_is_palindrome(self):
        self.assertFalse(is_palindrome('ricercar'))
        self.assertTrue(is_palindrome('racecar'))

if __name__ == '__main__':
    unittest.main()