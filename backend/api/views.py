
        

from colorama import init, Fore, Style
init()
from rest_framework import generics, status, filters
from rest_framework.permissions import IsAuthenticated, AllowAny
from rest_framework.response import Response
from django.shortcuts import get_object_or_404
from .models import CustomUser, Room, Message, Topic
from .serializers import UserSerializer, RoomSerializer, MessageSerializer, TopicSerializer


import json
import os
file_path = os.path.join(os.path.dirname(__file__), 'states_universities.json')
STATES_UNIVERSITIES = None
with open(file_path, 'r') as file:
    STATES_UNIVERSITIES = json.load(file)



class CreateUserView(generics.CreateAPIView):
    queryset = CustomUser.objects.all()
    serializer_class = UserSerializer
    permission_classes = [AllowAny]

    def create(self, request, *args, **kwargs):
        try:

            data = request.data

            def validate_data():
                if (not data['email'].find('@')) or (not data['email'].endswith('.edu')):
                    return "Email must contain '@' and end with '.edu'"
                elif len(data['password']) < 8 or (not any(char.isdigit() for char in data['password'])):
                    return "Password must be at least 8 character and contain numbers"
                elif len(data['name']) > 20 or len(data['name']) < 2:
                    return 'Name must be at least 2 characters'
                elif (data['state'] not in STATES_UNIVERSITIES):
                    return 'Not a valid state'
                elif not any(data['university'] in colleges for colleges in STATES_UNIVERSITIES.values()):
                    return 'Not a valid university'
                return "valid"

            validate_message = validate_data()
            if validate_message != 'valid':
                print(Fore.YELLOW, "=============", validate_message, "=============", Style.RESET_ALL)
                return Response({'message': validate_message}, status=status.HTTP_200_OK)

            data['username'] = data.pop('email')
            serializer = self.get_serializer(data=data)

            if serializer.is_valid():
                user = serializer.save()
                
                return Response({
                    'message': 'successfully created user',
                    'user': UserSerializer(user).data
                }, status=status.HTTP_201_CREATED)
            
            print(Fore.YELLOW, "=============", serializer.errors, "=============", Style.RESET_ALL)
            return Response({'message': serializer.errors}, status=status.HTTP_200_OK)

        except Exception as e:
            print(Fore.YELLOW, "=============", e, "=============", Style.RESET_ALL)
            return Response({'message': str(e)}, status=status.HTTP_200_OK)








class RoomViewSet(generics.ListCreateAPIView):
    serializer_class = RoomSerializer
    permission_classes = [IsAuthenticated]
    filter_backends = [filters.SearchFilter, filters.OrderingFilter]
    search_fields = ['title', 'body', 'topic__name']

    def get_queryset(self):

        queryset = Room.objects.all()
        topic = self.request.query_params.get('topic', None)
        if topic:
            queryset = queryset.filter(topic__name=topic)
        return queryset

    def perform_create(self, serializer):
        
        topic_id = self.request.data.get('topic')
        serializer.save(creator=self.request.user, topic=Topic.objects.get(id=topic_id))


class RoomDetailView(generics.RetrieveUpdateDestroyAPIView):
    queryset = Room.objects.all()
    serializer_class = RoomSerializer
    permission_classes = [IsAuthenticated]
    lookup_field = 'id'


class MessageViewSet(generics.ListCreateAPIView):
    serializer_class = MessageSerializer
    permission_classes = [IsAuthenticated]

    def get_queryset(self):
        room_id = self.kwargs['room_id']
        return Message.objects.filter(room_id=room_id)

    def perform_create(self, serializer):
        room = get_object_or_404(Room, id=self.kwargs['room_id'])
        print(self.request.data)
        serializer.save(sender=self.request.user, room=room)


class MessageDetailView(generics.RetrieveUpdateDestroyAPIView):
    queryset = Message.objects.all()
    serializer_class = MessageSerializer
    permission_classes = [IsAuthenticated]
    lookup_field = 'pk'


class TopicListCreateView(generics.ListCreateAPIView):
    serializer_class = TopicSerializer
    permission_classes = [IsAuthenticated]
    
    def get_queryset(self):
        return Topic.objects.all().order_by('-created_at')
    
    # def perform_create(self, serializer):
    #     serializer.save()
