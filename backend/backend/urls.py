from django.contrib import admin
from django.urls import path, include
from api.views import CreateUser
from rest_framework_simplejwt.views import TokenObtainPairView, TokenRefreshView

urlpatterns = [
    path('api/admin/', admin.site.urls),
    path('api/register/', CreateUser.as_view(), name='register'),
    path('api/token/', TokenObtainPairView.as_view(), name='get_token'),
    path('api/refresh/', TokenRefreshView.as_view(), name='refresh_token'),
    path('api/auth/', include('rest_framework.urls')),
]