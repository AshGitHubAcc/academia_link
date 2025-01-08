from django.urls import path, include
from rest_framework_simplejwt.views import TokenObtainPairView, TokenRefreshView

from . import views


urlpatterns = [
    path('auth/', include('rest_framework.urls')),
    path('register/', views.CreateUser.as_view(), name='register'),
    path('token/', TokenObtainPairView.as_view(), name='get_token'), # login
    path('token-refresh/', TokenRefreshView.as_view(), name='refresh_token'),

    
    path('rooms/', views.RoomListCreateView.as_view(), name='rooms-list-create'),
    path('rooms/<int:id>/', views.RoomDetailView.as_view(), name='rooms-detail'),

    path('rooms/<int:id>/messages/', views.MessageListCreateView.as_view()),

    
    # path('messages/', views.MessageListCreateView.as_view(), name='messages-list-create'),
    # path('messages/<int:id>', views.MessageDetailView.as_view(), name='messages-list-create'),

    path('topics/', views.TopicListCreateView.as_view(), name='messages-list-create'),
    # path('rooms/<int:id>/', views.RoomDetailView.as_view(), name='room-detail'),

]   