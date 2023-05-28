import unittest
from lib.character_count import character_count

class TestCharacterCount(unittest.TestCase):
    def test_character_count(self):
        self.assertEqual(character_count(["a", "bc", "def"]), 6)

if __name__ == '__main__':
    unittest.main()
