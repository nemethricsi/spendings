from django.urls import path, include
from spendings_app import views
from rest_framework.routers import DefaultRouter

router = DefaultRouter()
router.register('spendings', views.SpendingViewSet)

app_name = 'spendings_app'

urlpatterns = [
    path('', include(router.urls))
]