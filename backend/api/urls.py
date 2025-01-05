from django.urls import path, include
from rest_framework_simplejwt.views import TokenObtainPairView, TokenRefreshView

from . import views


urlpatterns = [
    path('auth/', include('rest_framework.urls')),
    path('register/', views.CreateUser.as_view(), name='register'),
    path('token/', TokenObtainPairView.as_view(), name='get_token'), # login
    path('token-refresh/', TokenRefreshView.as_view(), name='refresh_token'),

    path('rooms/', views.RoomListCreateView.as_view(), name='room-list-create'),
    path('rooms/<int:id>/', views.RoomDetailView.as_view(), name='room-detail'),

]   