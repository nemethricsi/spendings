from django.urls import path
from spendings_app import views

urlpatterns = [
    path('spendings/', views.spending_list),
    path('spendings/<int:pk>/', views.spending_detail),
]