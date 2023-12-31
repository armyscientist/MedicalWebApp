from app import *
import unittest
from unittest.mock import patch
from app import app

class TestApp(unittest.TestCase):

    def setUp(self):
        self.app = app.test_client()

    def test_hospital_login(self):
        response = self.app.get('/hospital-login?hospital_id=1&hospital_email=test@test.com&password=test')
        self.assertEqual(response.status_code, 200)
        self.assertIn(b'"login_status":false', response.data)

    def test_home_display(self):
        response = self.app.get('/top-utility-list')
        self.assertEqual(response.status_code, 200)
        self.assertIn(b'"top_utility_list":', response.data)

    def test_search_hospital_name(self):
        response = self.app.get('/search?hospital_name=test')
        self.assertEqual(response.status_code, 200)
        self.assertIn(b'"result_data":null', response.data)

    def test_search_utility_id(self):
        response = self.app.get('/search?utility_id=1')
        self.assertEqual(response.status_code, 200)
        self.assertIn(b'"result_data":', response.data)

    def test_search_hospital_name_and_utility_id(self):
        response = self.app.get('/search?hospital_name=test&utility_id=1')
        self.assertEqual(response.status_code, 200)
        self.assertIn(b'"result_data":null', response.data)

    def test_get_utility_list_all(self):
        response = self.app.get('/utility_list/all')
        self.assertEqual(response.status_code, 200)
        self.assertIn(b'"utility_list":', response.data)

    def test_get_utility_list_hospital_id(self):
        response = self.app.get('/utility_list/1')
        self.assertEqual(response.status_code, 200)
        self.assertIn(b'"utility_list":', response.data)

if __name__ == '__main__':
    unittest.main()