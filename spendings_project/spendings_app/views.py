from .models import Spending
from .serializers import SpendingSerializer, SpendingDetailSerializer
from rest_framework import viewsets, mixins, status, filters
from rest_framework.response import Response

huf_rates = {
    'USD' : 300,
    'HUF': 1
}

def get_amount_in_huf(amount, currency):
    return int(amount) * int(huf_rates[currency])

class SpendingViewSet(viewsets.GenericViewSet, 
                      mixins.ListModelMixin,
                      mixins.RetrieveModelMixin,
                      mixins.UpdateModelMixin,
                      mixins.CreateModelMixin,
                      mixins.DestroyModelMixin):
    """Manage Spendings in the database"""
    queryset = Spending.objects.all()
    serializer_class = SpendingSerializer
    filter_backends = [filters.OrderingFilter]

    def perform_create(self, serializer):
        currency = self.request.POST.get('currency')
        amount = self.request.POST.get('amount')

        if currency is None or amount is None:
            currency = serializer.validated_data['currency']
            amount = serializer.validated_data['amount']

        serializer.save(
            amount_in_huf = get_amount_in_huf(amount, currency)
        )
        
    def perform_update(self, serializer):
        currency = self.request.POST.get('currency')
        amount = self.request.POST.get('amount')

        if currency is None or amount is None:
            currency = serializer.validated_data['currency']
            amount = serializer.validated_data['amount']

        # if currency is None or amount is None:
        #     return serializer.save()

        serializer.save(
            amount_in_huf = get_amount_in_huf(amount, currency)
        )

    def get_queryset(self):
        currency_filter = self.request.query_params.get('currency')
        queryset = self.queryset
        if currency_filter:
            currency_upper = currency_filter.upper()
            queryset = queryset.filter(currency=currency_upper)

        return queryset.all().order_by('-date')

    def get_serializer_class(self):
        """Return appropriate serializer class"""
        if self.action == "retrieve":
            return SpendingDetailSerializer
        
        return self.serializer_class
        