from django.urls import reverse
from django.test import TestCase
from rest_framework import status
from rest_framework.test import APIClient
from ..models import Spending
from ..serializers import SpendingSerializer, SpendingDetailSerializer

SPENDINGS_URL = reverse('spendings_app:spending-list')


def sample_spending(**params):
    """Create and return a sample spending"""
    defaults = {
        'description': 'Sample spending',
        'amount': 12.55
    }
    defaults.update(params)
    
    return Spending.objects.create(**defaults)


def detail_url(spending_id):
    """Return Spending detail url"""
    return reverse('spendings_app:spending-detail', args=[spending_id])


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
        sample_spending()
        sample_spending()

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

    def test_view_spending_detail(self):
        """Test if we can retrieve a single spending"""
        spending = sample_spending()

        url = detail_url(spending.id)
        res = self.client.get(url)

        serializer = SpendingDetailSerializer(spending)
        self.assertEqual(res.data, serializer.data)
        self.assertEqual(res.status_code, status.HTTP_200_OK)

    def test_update_partial_spending(self):
        """Test updating a spending with PATCH"""
        spending = sample_spending()
        new_currency = 'USD'

        payload = {'description':'Updated spending', 'currency': new_currency}
        url = detail_url(spending.id)
        self.client.patch(url, payload)

        spending.refresh_from_db()
        self.assertEqual(spending.description, payload['description'])
        self.assertEqual(spending.currency, payload['currency'])

    def test_update_full_spending(self):
        """Test updating a spending with PUT"""
        spending = sample_spending()
        payload = {
            'description': 'Sample spending updated with PUT',
            'amount': 25.50,
            'currency': 'USD',
        }
        url = detail_url(spending.id)
        self.client.put(url, payload)

        spending.refresh_from_db()
        self.assertEqual(spending.description, payload['description'])
        self.assertEqual(spending.amount, payload['amount'])
        self.assertEqual(spending.currency, payload['currency'])

    def test_delete_spending(self):
        """Test deletion of a spending"""
        spending = sample_spending()
        url = detail_url(spending.id)
        res = self.client.delete(url)

        self.assertEqual(res.status_code, status.HTTP_204_NO_CONTENT)