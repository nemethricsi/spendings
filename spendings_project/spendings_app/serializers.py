from rest_framework import serializers
from .models import Spending


class SpendingSerializer(serializers.ModelSerializer):
    """Serializer for Spending objects"""

    class Meta:
        model = Spending
        fields = (
            'id', 'date','description', 'amount', 'created', 'last_updated', 'currency'
        )
        read_only_fields = ('id', 'created')


class SpendingDetailSerializer(SpendingSerializer):
    """Serialize a spending detail"""