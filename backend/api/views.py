from colorama import init, Fore, Style
init()
from rest_framework import generics, status

from rest_framework.permissions import IsAuthenticated, AllowAny, IsAuthenticatedOrReadOnly
from rest_framework.permissions import AllowAny
from rest_framework.response import Response
from django.shortcuts import get_object_or_404

from .models import CustomUser, Room, Message
from .serializers import UserSerializer, RoomSerializer, MessageSerializer

import json
import os

file_path = os.path.join(os.path.dirname(__file__), 'states_universities.json')
STATES_UNIVERSITIES = None
with open(file_path, 'r') as file:
    STATES_UNIVERSITIES = json.load(file)




class CreateUser(generics.CreateAPIView):
    queryset = CustomUser.objects.all()
    serializer_class = UserSerializer
    permission_classes = [AllowAny]


    def validate_data(self, data):

        if (not data['username'].find('@')) or (not data['username'].endswith('.edu')):
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

    def create(self, request, *args, **kwargs):
        updated_data = request.data
        updated_data['username'] = updated_data.pop('email')
        validte_message = self.validate_data(updated_data)

        if validte_message != "valid":
            print(Fore.RED,"=========================", "User register data was incorrect", Style.RESET_ALL)
            return Response({'message': validte_message}, status=status.HTTP_400_BAD_REQUEST)

        serializer = self.get_serializer(data=updated_data)

        if serializer.is_valid():
            user = serializer.save()
            print(Fore.GREEN, "=========================", "User Valid and created", Style.RESET_ALL)
            return Response({'message': "Sucessful", 'user': UserSerializer(user).data }, status=status.HTTP_200_OK)
        

        print(Fore.RED, "=========================", serializer.errors, Style.RESET_ALL)
        return Response({'message': serializer.errors}, status=status.HTTP_400_BAD_REQUEST)




class RoomListCreateView(generics.ListCreateAPIView):
    serializer_class = RoomSerializer
    # allows everyone to get all data but only authenticated users can patch, post, delete
    permission_classes = [IsAuthenticatedOrReadOnly]
    
    def get_queryset(self):
        try:
            all_rooms = Room.objects.all().order_by('-created_at')
            return all_rooms
        except Exception as e:
            print(Fore.RED, "=========", "ERRORS", "=========\n", e, Style.RESET_ALL)
            return Response({'message': e},status=status.HTTP_500_INTERNAL_SERVER_ERROR)

    def create(self, serializer):
        print("==========")
        return Response({'message': 'sucessful'}, status=status.HTTP_200_OK)

        # try:

        #     request = self.request
        #     data = self.request.data

        #     def validate_data():
        #         if data['title'].strip() == '':
        #             return "Title can't be empty or only spaces"
        #         if len(data['body'].strip()) > 1000:
        #             return 'Max characters for body reached'
        #         return "valid"
            
        #     validate_message = validate_data()

        #     if validate_message == 'valid' and serializer.is_valid():
        #         data = serializer.save(
        #             creator=request.user,
        #             title=data['title'],
        #             body=data['body'],
        #             participants = []
        #         )
        #         print(Fore.GREEN, "=========", "POST: Room Sucess", "=========", Style.RESET_ALL)

        #         return Response({'message': 'sucessful'}, status=status.HTTP_200_OK)
        #     print(Fore.GREEN, "=========", "POST: Room Unsucessful", "=========", Style.RESET_ALL)
        #     return Response(status=status.HTTP_400_BAD_REQUEST)

        # except Exception as e:
        #     print(Fore.RED, "=========", "ERRORS: ", e, "=========", Style.RESET_ALL)
        #     return Response({'message': e},status=status.HTTP_500_INTERNAL_SERVER_ERROR)

        

        

def check_object_permissions(request, object):
    if request.method in ['PUT', 'PATCH', 'DELETE']:
        if object.creator != request.user:
            return False
    return True

class RoomDetailView(generics.RetrieveUpdateDestroyAPIView):
    serializer_class = RoomSerializer
    permission_classes = [IsAuthenticated]

    def get_object(self):
        room = get_object_or_404(Room, id=self.kwargs['id'])
        print(Fore.GREEN, "=========", "GET: Single Room Success", "=========", Style.RESET_ALL)
        return room


    
    def destroy(self, request, id):
        try:
            
            room = self.get_object()
            print("========", room)

            permission_allowed = check_object_permissions(request, room)

            if permission_allowed:
                self.perform_destroy(room)
                print(Fore.GREEN, "=========", "DELETE: Single Room Sucess", "=========", Style.RESET_ALL)
                return Response({'message': 'sucessful'}, status=status.HTTP_200_OK)
            print(Fore.GREEN, "=========", "DELETE: Single Room Unsucessful", "=========", Style.RESET_ALL)
            return Response({'message': "permission not allowed"},status=status.HTTP_200_OK)

        except Exception as e:
            print(Fore.RED, "ERRORS: ", e, Style.RESET_ALL)
            return Response({'message': e},status=status.HTTP_500_INTERNAL_SERVER_ERROR)

        
    def update(self, request, id, partial):
        try:

            def validate_data():
                if request.data['title'].strip() == '':
                    return "Title can't be empty or only spaces"
                if len(request.data['body'].strip()) > 1000:
                    return 'Max characters for body reached'
                return "valid"
            
            validate_message = validate_data()


            if validate_message == 'valid':

                room = self.get_object()
                serializer = self.get_serializer(room, data=request.data, partial=True)
                serializer.is_valid(raise_exception=True)
                serializer.save()
                return Response({'message': 'sucessful'}, status=status.HTTP_200_OK)
            return Response({'message': validate_message},status=status.HTTP_200_OK)
            


        except Exception as e:
            print(Fore.RED, "ERRORS: ", e, Style.RESET_ALL)
            return Response({'message': e},status=status.HTTP_500_INTERNAL_SERVER_ERROR)






class MessageListCreateView(generics.ListCreateAPIView):
    serializer_class = MessageSerializer
    permission_classes = [IsAuthenticated]
    
    def get_queryset(self):
        # return Message.objects.all().order_by('-created_at')
        return [] # any logged in user will be able to get all the messages so I returend an empty array

    
    # def perform_create(self, serializer):

    #     def validate_data():
    #         if self.request.data['body'] == '':
    #             return "Message body can't be empty"
    #         if not self.request.data['room']:
    #             return "Room ID is required"
    #         return "valid"
        
    #     validate_message = validate_data()

    #     if validate_message == 'valid':

    #         # data['room'] is room id
    #         room = get_object_or_404(Room, id=self.request.data['room'])

    #         serializer.save(
    #             creator=self.request.user,
    #             room=room,
    #             body=self.request.data['body']
    #         )
    #         return Response({'message': "successful"}, status=status.HTTP_201_CREATED)
    #     return Response({'message': validate_message}, status=status.HTTP_400_BAD_REQUEST)
    