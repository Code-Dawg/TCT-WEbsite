from django.test import TestCase, Client
from django.urls import reverse

class AboutAppTests(TestCase):
    def setUp(self):
        self.client = Client()

    def test_aboutus_view(self):
        response = self.client.get(reverse('aboutus'))
        self.assertEqual(response.status_code, 200)
        self.assertTemplateUsed(response, 'about/aboutus.html')
        self.assertContains(response, 'From Mumbai Tapris to Pokhara Hills')
