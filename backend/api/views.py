from django.shortcuts import render
from rest_framework import generics
from rest_framework.permissions import IsAuthenticated, AllowAny

from .models import CustomUser, Room
from .serializers import UserSerializer, RoomSerializer
# Create your views here.

class CreateUser(generics.ListCreateAPIView):
    queryset = CustomUser.objects.all()
    serializer_class = UserSerializer   
    permission_classes = [AllowAny]


class CreateRoom(generics.CreateAPIView):
    serializer_class = RoomSerializer   
    permission_classes = [AllowAny]

    # user = self.request.user
    # queryset = Room.objects.filter(creator=user)
    def get_queryset(self):
        user = self.request.user
        queryset = Room.objects.filter(creator=user)
        return queryset

    def create(self, serializer):
        if serializer.is_valid():
            serializer.save(creator=self.request.user)
        else:
            print(serializer.errors)


class DeleteRoom(generics.CreateAPIView):
    queryset = Room.objects.all()
    serializer_class = RoomSerializer
    permission_classes = [IsAuthenticated]

    def get_queryset(self):
        user = self.request.user
        queryset = Room.objects.filter(creator=user)
        return queryset