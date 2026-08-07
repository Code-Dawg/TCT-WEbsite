from django.test import TestCase, Client
from django.urls import reverse

class LocationAppTests(TestCase):
    def setUp(self):
        self.client = Client()

    def test_location_view(self):
        response = self.client.get(reverse('location'))
        self.assertEqual(response.status_code, 200)
        self.assertTemplateUsed(response, 'location/location.html')
        self.assertContains(response, 'Nadipur')
        self.assertContains(response, 'Simalchaur')
