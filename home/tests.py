from django.test import TestCase, Client
from django.urls import reverse

class HomeAppTests(TestCase):
    def setUp(self):
        self.client = Client()

    def test_home_display_view(self):
        response = self.client.get(reverse('display'))
        self.assertEqual(response.status_code, 200)
        self.assertTemplateUsed(response, 'index.html')
        self.assertContains(response, 'The Cutting Tea')
