from django.urls import reverse
from django.test import TestCase
from rest_framework import status
from rest_framework.test import APIClient
from ..models import Spending
from ..serializers import SpendingSerializer

SPENDINGS_URL = reverse('spendings_app:spending-list')


class PublicSpendingsApiTest(TestCase):
    """Test the publicly available Spending API"""

    def setUp(self):
        self.client = APIClient()

    def test_login_not_required(self):
        """Test that login is not required for retrieveing spendings"""
        res = self.client.get(SPENDINGS_URL)

        self.assertEqual(res.status_code, status.HTTP_200_OK)

    def test_retrieve_spendings(self):
        """Test retrieving spendings"""
        Spending.objects.create(description='Banana', amount=10.34)
        Spending.objects.create(description='Apple', amount=12)

        res = self.client.get(SPENDINGS_URL)

        spendings = Spending.objects.all().order_by('-description')
        serializer = SpendingSerializer(spendings, many=True)

        self.assertEqual(res.status_code, status.HTTP_200_OK)
        self.assertEqual(res.data, serializer.data)

    def test_create_spending_successful(self):
        """Test creating a new spending"""
        payload = {'description': 'Apple', 'amount': 5}
        self.client.post(SPENDINGS_URL, payload)

        exists = Spending.objects.filter(
            description = payload['description']
        ).exists()
        self.assertTrue(exists)

    def test_create_spending_invalid(self):
        """Test creating a spending with invalid payload"""
        payload = {'description': '', 'amount': 10}
        res = self.client.post(SPENDINGS_URL, payload)

        self.assertEqual(res.status_code, status.HTTP_400_BAD_REQUEST)
