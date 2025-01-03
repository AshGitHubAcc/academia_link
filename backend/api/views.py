from django.shortcuts import render
from rest_framework import generics
from rest_framework.permissions import IsAuthenticated, AllowAny

from .models import CustomUser, Room
from .serializers import UserSerializer, RoomSerializer
# Create your views here.

class CreateUser(generics.ListCreateAPIView):
    existingUsers = CustomUser.objects.all()
    serializer_class = UserSerializer   
    permission_classes = [AllowAny]


class CreateRoom(generics.CreateAPIView):
    serializer_class = RoomSerializer   
    permission_classes = [IsAuthenticated]

    def get_queryset(self):
        user = self.request.user


        return Room.objects.filter(creator=user)

