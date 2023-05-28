import unittest
from lib.reverse import reverse

class TestReverse(unittest.TestCase):
    def test_reverse(self):
        self.assertEqual(reverse("abcd"), "dcba")

if __name__ == '__main__':
    unittest.main()
