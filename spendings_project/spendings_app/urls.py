from django.urls import path, include
from spendings_app import views
from rest_framework.routers import DefaultRouter

router = DefaultRouter()
router.register('spendings', views.SpendingViewSet)

app_name = 'spendings_app'

urlpatterns = [
    path('', include(router.urls))
]

# urlpatterns = [
#     path('spendings/', views.spending_list),
#     path('spendings/<int:pk>/', views.spending_detail),
# ]