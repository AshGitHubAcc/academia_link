from django.urls import path
from . import views
from rest_framework_simplejwt.views import TokenRefreshView
from .views import CustomTokenObtainPairView


urlpatterns = [
    path('auth/register/', views.CreateUserView.as_view(), name='register'),
    path('auth/login/', CustomTokenObtainPairView.as_view(), name='login'),
    path('auth/refresh/', TokenRefreshView.as_view(), name='token_refresh'),
    
    path('rooms/', views.RoomViewSet.as_view(), name='room-list'),
    # path('rooms/topic/<int:topic_id>/', views.RoomViewSet.as_view(), name='filtered-room-list'),

    path('rooms/<int:id>/', views.RoomDetailView.as_view(), name='room-detail'),

    path('rooms/<int:room_id>/messages/', views.MessageViewSet.as_view(), name='room-messages'),
    path('rooms/<int:room_id>/messages/<int:pk>/', views.MessageDetailView.as_view(), name='message-detail'),

    path('topics/', views.TopicListCreateView.as_view(), name='topic-list'),
]