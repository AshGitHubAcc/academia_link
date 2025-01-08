import logging
logger = logging.getLogger(__name__)
from colorama import init, Fore, Style
init()
from rest_framework import generics, status

from rest_framework.permissions import IsAuthenticated, AllowAny, IsAuthenticatedOrReadOnly
from rest_framework.permissions import AllowAny
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


def check_permission(request, object):
    if request.method in ['PUT', 'PATCH', 'DELETE']:
        if object.creator != request.user:
            return False
    return True

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
    permission_classes = [IsAuthenticated]
    
    def get_queryset(self):
        try:
            all_rooms = Room.objects.all().order_by('-created_at')
            print(all_rooms[1].message_set.all())


            print(Fore.GREEN, "=========", "GET: All Rooms Successful", "=========", Style.RESET_ALL)
            return all_rooms
        except Exception as e:
            print(Fore.YELLOW, "=========", "ERRORS", "=========\n",e, Style.RESET_ALL)
            return Response({'message': e},status=status.HTTP_500_INTERNAL_SERVER_ERROR)

    def create(self, request):
        try:

            data = request.data
            serializer = self.get_serializer(data=data)


            def validate_data():
                if data['title'].strip() == '':
                    return "Title can't be empty"
                if len(data['body'].strip()) > 1000:
                    return 'Max characters for body reached'
                return "valid"
            
            validate_message = validate_data()

            if validate_message == 'valid' and serializer.is_valid(raise_exception=True):
                serializer.save(
                    creator=request.user,
                    title=data['title'],
                    body=data['body'],
                    participants = []
                )
                
                print(Fore.GREEN, "=========", "POST: Room Successful", "=========", Style.RESET_ALL)
                return Response({'message': 'successful'}, status=status.HTTP_200_OK)
            
            print(Fore.GREEN, "=========", "POST: Room Unsuccessful", "=========\n", "Problem:", validate_message, Style.RESET_ALL)
            return Response({'message': validate_message}, status=status.HTTP_200_OK)
        

        except Exception as e:
            print(Fore.YELLOW, "=========", "ERRORS", "=========\n",e, Style.RESET_ALL)
            return Response({'message': e},status=status.HTTP_500_INTERNAL_SERVER_ERROR)

        
class RoomDetailView(generics.RetrieveUpdateDestroyAPIView):
    serializer_class = RoomSerializer
    permission_classes = [IsAuthenticated]

    def get_object(self):
        try:
            room = get_object_or_404(Room, id=self.kwargs['id'])
            print(Fore.GREEN, "=========", "GET: Single Room Successful", "=========", Style.RESET_ALL)
            return room
        except Exception as e:
            print(Fore.YELLOW, "=========", "ERRORS", "=========\n",e, Style.RESET_ALL)
            return Response({'message': e},status=status.HTTP_500_INTERNAL_SERVER_ERROR)


    def destroy(self, request, id):
        try:
            
            room = self.get_object()

            permission_allowed = check_permission(request, room)

            if not permission_allowed:
                print(Fore.GREEN, "=========", "DELETE: Single Room Unsuccessful", "=========\n", "Problem:", "permission not allowed", Style.RESET_ALL)
                return Response({'message': 'permission not allowed'}, status=status.HTTP_200_OK)

            self.perform_destroy(room)
            print(Fore.GREEN, "=========", "DELETE: Single Room Successful", "=========", Style.RESET_ALL)
            return Response({'message': 'successful'}, status=status.HTTP_200_OK)
            
        except Exception as e:
            print(Fore.YELLOW, "=========", "ERRORS", "=========\n",e, Style.RESET_ALL)
            return Response({'message': e},status=status.HTTP_500_INTERNAL_SERVER_ERROR)

        
    def update(self, request, partial, id):
        try:

            data = request.data
            room = self.get_object()
            permission_allowed = check_permission(request, room)
            

            if not permission_allowed:
                print(Fore.GREEN, "=========", "PATCH: Single Room Unsuccessful", "=========\n", "Problem:", "permission not allowed", Style.RESET_ALL)
                return Response({'message': 'permission not allowed'}, status=status.HTTP_200_OK)


            def validate_data():
                if data['title'].strip() == '':
                    return "Title can't be empty or only spaces"
                if len(data['body'].strip()) > 1000:
                    return 'Max characters for body reached'
                return "valid"
            
            validate_message = validate_data()


            if validate_message == 'valid':

                serializer = self.get_serializer(room, data=data, partial=True)
                serializer.is_valid(raise_exception=True)
                data2 = serializer.save()

                print(Fore.GREEN, "=========", "PATCH: Single Room Successful", "=========", Style.RESET_ALL)
                return Response({'message': 'successful'}, status=status.HTTP_200_OK)
            
            print(Fore.GREEN, "=========", "PATCH: Single Room Unsuccessful", "=========\n", "Problem:", validate_message, Style.RESET_ALL)
            return Response({'message': validate_message}, status=status.HTTP_200_OK)

        except Exception as e:
            print(Fore.YELLOW, "=========", "ERRORS", "=========\n",e, Style.RESET_ALL)
            return Response({'message': e},status=status.HTTP_500_INTERNAL_SERVER_ERROR)


class MessageListCreateView(generics.ListCreateAPIView):
    serializer_class = MessageSerializer
    permission_classes = [IsAuthenticated]

    def get_queryset(self):
        try:

            room_id = self.kwargs.get('id')
            room = Room.objects.get(id=room_id)
            print(Fore.GREEN, "=========", "GET: All Messages From Room Successful", "=========", Style.RESET_ALL)
            return room.message_set.all()
        
        except Exception as e:
            print(Fore.YELLOW, "=========", "ERRORS", "=========\n",e, Style.RESET_ALL)
            return Response({'message': e},status=status.HTTP_500_INTERNAL_SERVER_ERROR)

    def create(self, request):
        try:

            data = request.data
            serializer = self.get_serializer(data=data)

            def validate_data():
                if data['body'].strip() == '':
                    return "Title can't be empty"
                if not int(data['room']):
                    return 'debug'
                return "valid"
            

            validate_message = validate_data()

            if validate_message == 'valid' and serializer.is_valid(raise_exception=True):

                messagedRoom = get_object_or_404(Room, id=int(data['room']))
                serializer.save(
                    creator=request.user,
                    room=messagedRoom,
                    body=data['body'],
                )
                
                print(Fore.GREEN, "=========", "POST: Message Successful", "=========", Style.RESET_ALL)
                return Response({'message': 'successful'}, status=status.HTTP_200_OK)
            
            print(Fore.GREEN, "=========", "POST: Message Unsuccessful", "=========\n", "Problem:", validate_message, Style.RESET_ALL)
            return Response({'message': validate_message}, status=status.HTTP_200_OK)
        

        except Exception as e:
            print(Fore.YELLOW, "=========", "ERRORS", "=========\n",e, Style.RESET_ALL)
            return Response({'message': e},status=status.HTTP_500_INTERNAL_SERVER_ERROR)


class MessageDetailView(generics.RetrieveUpdateDestroyAPIView):
    serializer_class = MessageSerializer
    permission_classes = [IsAuthenticated]

    def get_object(self):
        try:
            message = get_object_or_404(Message, id=self.kwargs['id'])
            print(Fore.GREEN, "=========", "GET: Single Message Successful", "=========", Style.RESET_ALL)
            return message
        except Exception as e:
            print(Fore.YELLOW, "=========", "ERRORS", "=========\n",e, Style.RESET_ALL)
            return Response({'message': e},status=status.HTTP_500_INTERNAL_SERVER_ERROR)


    def destroy(self, request, id):
        try:
            
            message = self.get_object()
            permission_allowed = check_permission(request, message)

            if not permission_allowed:
                print(Fore.GREEN, "=========", "DELETE: Single Message Unsuccessful", "=========\n", "Problem:", "permission not allowed", Style.RESET_ALL)
                return Response({'message': 'permission not allowed'}, status=status.HTTP_200_OK)


            message.body = "[Message has been deleted]"
            message.save()
            print(Fore.GREEN, "=========", "DELETE: Single Message Successful", "=========", Style.RESET_ALL)
            return Response({'message': 'successful'}, status=status.HTTP_200_OK)
            
        except Exception as e:
            print(Fore.YELLOW, "=========", "ERRORS", "=========\n",e, Style.RESET_ALL)
            return Response({'message': e},status=status.HTTP_500_INTERNAL_SERVER_ERROR)

        
    # def update(self, request, partial, id):
    #     try:

    #         data = request.data
    #         room = self.get_object()
    #         permission_allowed = check_permission(request, room)
            

    #         if not permission_allowed:
    #             print(Fore.GREEN, "=========", "PATCH: Single Room Unsuccessful", "=========\n", "Problem:", "permission not allowed", Style.RESET_ALL)
    #             return Response({'message': 'permission not allowed'}, status=status.HTTP_200_OK)


    #         def validate_data():
    #             if data['title'].strip() == '':
    #                 return "Title can't be empty or only spaces"
    #             if len(data['body'].strip()) > 1000:
    #                 return 'Max characters for body reached'
    #             return "valid"
            
    #         validate_message = validate_data()

    #         if validate_message == 'valid':

    #             serializer = self.get_serializer(room, data=data, partial=True)
    #             serializer.is_valid(raise_exception=True)
    #             data2 = serializer.save()

    #             print(Fore.GREEN, "=========", "PATCH: Single Room Successful", "=========", Style.RESET_ALL)
    #             return Response({'message': 'successful'}, status=status.HTTP_200_OK)
            
    #         print(Fore.GREEN, "=========", "PATCH: Single Room Unsuccessful", "=========\n", "Problem:", validate_message, Style.RESET_ALL)
    #         return Response({'message': validate_message}, status=status.HTTP_200_OK)

    #     except Exception as e:
    #         print(Fore.YELLOW, "=========", "ERRORS", "=========\n",e, Style.RESET_ALL)
    #         return Response({'message': e},status=status.HTTP_500_INTERNAL_SERVER_ERROR)



class TopicListCreateView(generics.ListCreateAPIView):
    serializer_class = TopicSerializer
    # allows everyone to get all data but only authenticated users can patch, post, delete
    permission_classes = [IsAuthenticated]
    
    def get_queryset(self):
        try:
            all_topics = Topic.objects.all().order_by('-created_at')
            print(Fore.GREEN, "=========", "GET: All Topics Successful", "=========", Style.RESET_ALL)
            return all_topics
        except Exception as e:
            print(Fore.YELLOW, "=========", "ERRORS", "=========\n",e, Style.RESET_ALL)
            return Response({'message': e},status=status.HTTP_500_INTERNAL_SERVER_ERROR)

    # def create(self, request):
    #     try:

    #         data = request.data
    #         serializer = self.get_serializer(data=data)


    #         def validate_data():
    #             if data['title'].strip() == '':
    #                 return "Title can't be empty"
    #             if len(data['body'].strip()) > 1000:
    #                 return 'Max characters for body reached'
    #             return "valid"
            
    #         validate_message = validate_data()

    #         if validate_message == 'valid' and serializer.is_valid(raise_exception=True):
    #             serializer.save(
    #                 creator=request.user,
    #                 title=data['title'],
    #                 body=data['body'],
    #                 participants = []
    #             )
                
    #             print(Fore.GREEN, "=========", "POST: Room Successful", "=========", Style.RESET_ALL)
    #             return Response({'message': 'successful'}, status=status.HTTP_200_OK)
            
    #         print(Fore.GREEN, "=========", "POST: Room Unsuccessful", "=========\n", "Problem:", validate_message, Style.RESET_ALL)
    #         return Response({'message': validate_message}, status=status.HTTP_200_OK)
        

    #     except Exception as e:
    #         print(Fore.YELLOW, "=========", "ERRORS", "=========\n",e, Style.RESET_ALL)
    #         return Response({'message': e},status=status.HTTP_500_INTERNAL_SERVER_ERROR)

        