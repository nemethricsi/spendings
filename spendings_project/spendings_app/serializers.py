from rest_framework import serializers
from .models import Spending


class SpendingSerializer(serializers.HyperlinkedModelSerializer):
    class Meta:
        model = Spending
        fields = ('id', 'date','description', 'amount', 'created', 'last_updated', 'currency')