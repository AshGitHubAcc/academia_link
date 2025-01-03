from django.shortcuts import render
from .models import CustomUser
from rest_framework import generics
from .serializers import UserSerializer
from rest_framework.permissions import IsAuthenticated, AllowAny

# Create your views here.

class CreateUser(generics.CreateAPIView):
    existingUsers = CustomUser.objects.all()
    serializer_class = UserSerializer   
    permission_classes = [AllowAny]