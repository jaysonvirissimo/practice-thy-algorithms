import unittest
from lib.valid_ip import valid_ip

class TestValidIp(unittest.TestCase):
    def test_valid_ip(self):
        self.assertTrue(valid_ip("1.1.1.1"))
        self.assertFalse(valid_ip("256.2.2.2"))
        self.assertFalse(valid_ip("1.1.1.1.1"))

if __name__ == '__main__':
    unittest.main()
