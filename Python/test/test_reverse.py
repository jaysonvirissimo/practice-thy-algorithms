import unittest
from lib.reverse import reverse

class TestCharacterCount(unittest.TestCase):
    def test_character_count(self):
        self.assertEqual(reverse("abcd"), "dcba")

if __name__ == '__main__':
    unittest.main()
