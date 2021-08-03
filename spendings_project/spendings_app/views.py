from django.shortcuts import render
from .models import Spending
from .serializers import SpendingSerializer, SpendingDetailSerializer
from rest_framework import viewsets, mixins
# from rest_framework.authentication import BasicAuthentication
# from rest_framework.permissions import IsAuthenticatedOrReadOnly
from rest_framework.filters import (
    SearchFilter,
    OrderingFilter
)

from django.http import HttpResponse, JsonResponse
from django.views.decorators.csrf import csrf_exempt
from rest_framework.parsers import JSONParser
from rest_framework.decorators import api_view, permission_classes
from rest_framework import status, permissions
from rest_framework.response import Response

class SpendingViewSet(viewsets.GenericViewSet, 
                      mixins.ListModelMixin,
                      mixins.RetrieveModelMixin,
                      mixins.UpdateModelMixin,
                      mixins.CreateModelMixin,
                      mixins.DestroyModelMixin):
    """Manage Spendings in the database"""
    queryset = Spending.objects.all()
    serializer_class = SpendingSerializer

    def get_queryset(self):
        currency_filter = self.request.query_params.get('currency')
        queryset = self.queryset
        if currency_filter:
            queryset = queryset.filter(currency=currency_filter)

        return queryset.all().order_by('amount')

    # def perform_create(self, serializer):
    #     """Create a new spending"""
    #     serializer.save()

    # def perform_destroy(self, instance):
    #     """Delete a spending"""
    #     instance.delete()

    def get_serializer_class(self):
        """Return appropriate serializer class"""
        if self.action == "retrieve":
            return SpendingDetailSerializer
        
        return self.serializer_class
        