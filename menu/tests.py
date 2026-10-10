from django.test import TestCase, Client
from django.urls import reverse

class MenuAppTests(TestCase):
    def setUp(self):
        self.client = Client()

    def test_menu_view(self):
        response = self.client.get(reverse('menu'))
        self.assertEqual(response.status_code, 200)
        self.assertTemplateUsed(response, 'menu/menu.html')
        self.assertContains(response, '<h1>Menu</h1>', html=True)
        self.assertContains(response, 'Matka Tea')
