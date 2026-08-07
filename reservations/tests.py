from django.test import TestCase, Client
from django.urls import reverse
import json

class ReservationsAppTests(TestCase):
    def setUp(self):
        self.client = Client()

    def test_reserve_api_post(self):
        response = self.client.post(
            reverse('reserve'),
            data=json.dumps({'name': 'Test User', 'branch': 'Nadipur'}),
            content_type='application/json'
        )
        self.assertEqual(response.status_code, 200)
        self.assertIn('Reservation received', response.json().get('message', ''))
