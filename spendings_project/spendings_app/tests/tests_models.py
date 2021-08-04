from django.test import TestCase
from spendings_app.models import Spending


class ModelTests(TestCase):

    def test_spending_str(self):
        """Test if spending has the string representation"""
        spending = Spending.objects.create(
            description = 'apple',
            amount = 1000,
        )

        self.assertEqual(str(spending), spending.description)