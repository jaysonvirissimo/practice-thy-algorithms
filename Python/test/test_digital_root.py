import unittest
from lib.digital_root import digital_root

class TestDigitalRoot(unittest.TestCase):
    def test_digital_root(self):
        self.assertEqual(digital_root(65536), 7)
        self.assertEqual(digital_root(1853), 8)

if __name__ == '__main__':
    unittest.main()
