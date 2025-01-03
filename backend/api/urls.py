from django.urls import path, include
from rest_framework_simplejwt.views import TokenObtainPairView, TokenRefreshView

from . import views


urlpatterns = [
    path('auth/', include('rest_framework.urls')),
    path('register/', views.CreateUser.as_view, name='register'),
    path('create-room/', views.CreateRoom.as_view(), name='create_room'),
    path('token/', TokenObtainPairView.as_view(), name='get_token'),
    path('token-refresh/', TokenRefreshView.as_view(), name='refresh_token'),


    path('room/', views.CreateRoom.as_view(), name='room'),
    path('room/<int:id>', views.CreateRoom.as_view(), name='room2'),
]