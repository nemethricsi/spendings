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
        return self.queryset.all().order_by('-amount')

    def perform_create(self, serializer):
        """Create a new spending"""
        serializer.save()

    def perform_destroy(self, instance):
        """Delete a spending"""
        instance.delete()

    def get_serializer_class(self):
        """Return appropriate serializer class"""
        if self.action == "retrieve":
            return SpendingDetailSerializer
        
        return self.serializer_class


# class SpendingViewSet(viewsets.ModelViewSet):
#     authentication_classes = (BasicAuthentication,)
#     permission_classes = (IsAuthenticatedOrReadOnly,)
#     queryset = Spending.objects.all()
#     serializer_class = SpendingSerializer
#     filter_backends = [SearchFilter, OrderingFilter]
#     search_fields = ['currency']

# @api_view(['GET', 'POST'])
# @permission_classes((permissions.AllowAny,))
# def spending_list(request):
#     """
#     List all code spendings, or create a new spending.
#     """
#     if request.method == 'GET':
#         # currency_filter = request.GET['currency']
#         spendings = Spending.objects.all()
#         serializer = SpendingSerializer(spendings, many=True)
#         return Response(serializer.data)

#     elif request.method == 'POST':
#         serializer = SpendingSerializer(data=request.data)
#         if serializer.is_valid():
#             serializer.save()
#             return Response(serializer.data, status=status.HTTP_201_CREATED)
#         return JsonResponse(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

# @api_view(['GET', 'PUT', 'DELETE'])
# @permission_classes((permissions.AllowAny,))
# def spending_detail(request, pk):
#     """
#     Retrieve, update or delete a spending.
#     """
#     try:
#         spending = Spending.objects.get(pk=pk)
#     except Spending.DoesNotExist:
#         return Response(status=status.HTTP_404_NOT_FOUND)

#     if request.method == 'GET':
#         serializer = SpendingSerializer(spending)
#         return Response(serializer.data)

#     elif request.method == 'PUT':
#         serializer = SpendingSerializer(spending, data=request.data)
#         if serializer.is_valid():
#             serializer.save()
#             return Response(serializer.data)
#         return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

#     elif request.method == 'DELETE':
#         spending.delete()
#         return Response(status=status.HTTP_204_NO_CONTENT)