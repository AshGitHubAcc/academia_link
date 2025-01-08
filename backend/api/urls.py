from django.urls import path
from rest_framework_simplejwt.views import TokenObtainPairView, TokenRefreshView
from . import views



urlpatterns = [
    path('auth/register/', views.CreateUserView.as_view(), name='register'),
    path('auth/login/', TokenObtainPairView.as_view(), name='login'),
    path('auth/refresh/', TokenRefreshView.as_view(), name='token_refresh'),
    
    path('rooms/', views.RoomViewSet.as_view(), name='room-list'),
    path('rooms/<int:room_id>/', views.RoomDetailView.as_view(), name='room-detail'),
    path('rooms/<int:room_id>/messages/', views.MessageViewSet.as_view(), name='room-messages'),
    path('rooms/<int:room_id>/messages/<int:messages_id>/', views.MessageDetailView.as_view(), name='room-messages'),

    path('topics/', views.TopicListCreateView.as_view(), name='topic-list'),
    
]

urlpatterns = [
    path('auth/register/', views.CreateUserView.as_view(), name='register'),
    path('auth/login/', TokenObtainPairView.as_view(), name='login'),
    path('auth/refresh/', TokenRefreshView.as_view(), name='token_refresh'),
    
    path('rooms/', views.RoomViewSet.as_view(), name='room-list'),
    path('rooms/<int:id>/', views.RoomDetailView.as_view(), name='room-detail'),
    
    path('rooms/<int:room_id>/messages/', views.MessageViewSet.as_view(), name='room-messages'),
    path('rooms/<int:room_id>/messages/<int:pk>/', views.MessageDetailView.as_view(), name='message-detail'),

    path('topics/', views.TopicListCreateView.as_view(), name='topic-list'),
]