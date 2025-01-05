from colorama import init, Fore, Style
init()
from rest_framework import generics, status
from rest_framework.permissions import IsAuthenticated, AllowAny, IsAuthenticatedOrReadOnly
from .models import CustomUser, Room
from .serializers import UserSerializer, RoomSerializer
from rest_framework.permissions import AllowAny
from rest_framework.response import Response

import json
import os

file_path = os.path.join(os.path.dirname(__file__), 'states_universities.json')
STATES_UNIVERSITIES = None
with open(file_path, 'r') as file:
    STATES_UNIVERSITIES = json.load(file)


# Create your views here.


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



# class RoomView(generics.GenericAPIView):
#     serializer_class = RoomSerializer   
#     permission_classes = [AllowAny]

#     def get_queryset(self):
#         return Room.objects.all().order_by('-created_at')
    

#     def validate_data(self, data):

#         if data['title'] == '':
#             return "Title can't be empty"
#         elif len(data['body']) > 1000:
#             return 'Max characters for body reached'
#         return "valid"
    
#     def get_serializer_context(self):
#         context = super().get_serializer_context()
#         context['request'] = self.request
#         return context
    

#     def create(self, request):
#         validate_message = self.validate_data(request.data)
#         if validate_message != 'valid':
#             return Response({'message': validate_message}, status=status.HTTP_400_BAD_REQUEST)
        
#         serializer = self.get_serializer(data=request.data)
        
#         if serializer.is_valid():
#             room = serializer.save() 
#             return Response({'message': "Successful",}, status=status.HTTP_200_OK)
        
#         return Response({'message': serializer.errors}, status=status.HTTP_400_BAD_REQUEST)
    
#     def retrieve(self, request):

#         if not (request.data.isdigit()):
#             return Response({'message': 'Invalid room id'}, status=status.HTTP_400_BAD_REQUEST)
        
#         room = Room.objects.filter(id=(request.data))
#         print(room,'==================')
#         return room




# class DeleteRoom(generics.CreateAPIView):
#     queryset = Room.objects.all()
#     serializer_class = RoomSerializer
#     permission_classes = [IsAuthenticated]

#     def get_queryset(self):
#         user = self.request.user
#         queryset = Room.objects.filter(creator=user)
#         return queryset


# class RoomView(generics.ListCreateAPIView):
#     serializer_class = RoomSerializer
#     permission_classes = [AllowAny]

#     def get_queryset(self):
#         return Room.objects.all().order_by('-created_at')
    
#     def validate_data(self, data):

#         if data['title'] == '':
#             return "Title can't be empty"
#         elif len(data['body']) > 1000:
#             return 'Max characters for body reached'
#         return "valid"
    
#     def get_serializer_context(self):
#         context = super().get_serializer_context()
#         context['request'] = self.request
#         return context

#     def create(self, request):
#         validate_message = self.validate_data(request.data)
#         if validate_message != 'valid':
#             return Response({'message': validate_message}, status=status.HTTP_400_BAD_REQUEST)
        
#         serializer = self.get_serializer(data=request.data)
        
#         if serializer.is_valid():
#             serializer.save()
#             return Response({'message': "Successful",}, status=status.HTTP_200_OK)
#         return Response({'message': serializer.errors}, status=status.HTTP_400_BAD_REQUEST)


# class RoomDetailView(generics.RetrieveUpdateDestroyAPIView):
#     queryset = Room.objects.all()
#     serializer_class = RoomSerializer
#     permission_classes = [AllowAny]



# class RoomDetailView(generics.RetrieveUpdateDestroyAPIView):
#     # GET SINGLE ROOM, UPDATE, DELETE
#     queryset = Room.objects.all()
#     serializer_class = RoomSerializer
#     permission_classes = [AllowAny]
#     lookup_field = 'pk'  # Use primary key to identify room

#     # Optional: Customize update method
#     def update(self, request, *args, **kwargs):
#         partial = kwargs.pop('partial', False)
#         instance = self.get_object()
#         serializer = self.get_serializer(instance, data=request.data, partial=partial)
#         serializer.is_valid(raise_exception=True)
#         self.perform_update(serializer)
#         return Response(serializer.data)

#     # Optional: Customize delete method
#     def destroy(self, request, *args, **kwargs):
#         instance = self.get_object()
#         self.perform_destroy(instance)
#         return Response(status=status.HTTP_204_NO_CONTENT)



class RoomListCreateView(generics.ListCreateAPIView):
    serializer_class = RoomSerializer
    # Allows all to get all rooms but only authericanted users can make a room
    permission_classes = [IsAuthenticatedOrReadOnly] 
    
    def get_queryset(self):
        return Room.objects.all().order_by('-created_at')
    
    def perform_create(self, serializer):
        def validate_data():
            if self.request.data['title'] == '':
                return "Title can't be empty"
            elif len(self.request.data['body']) > 1000:
                return 'Max characters for body reached'
            return "valid"

        if validate_data() == 'valid':
            serializer.save(creator=self.request.user)
            return Response({'message': "sucessful"}, status=status.HTTP_200_OK)
        return Response({'message': serializer.errors}, status=status.HTTP_400_BAD_REQUEST)
        


class RoomDetailView(generics.RetrieveUpdateDestroyAPIView):
    serializer_class = RoomSerializer
    permission_classes = [IsAuthenticated]
    queryset = Room.objects.all()
    
    def get_object(self):

        print(self.request)

        # obj = get_object_or_404(Room, pk=self.kwargs["pk"])
        # self.check_object_permissions(self.request, obj)
        # return obj
        return Response({'message': "sucessful"}, status=status.HTTP_200_OK)

    
    # def check_object_permissions(self, request, obj):
    #     if self.request.method in ['PUT', 'PATCH', 'DELETE']:
    #         if obj.creator != request.user:
    #             raise PermissionDenied("You do not have permission to modify this room.")
    #     return super().check_object_permissions(request, obj)
    
    # def update(self, request, *args, **kwargs):
    #     partial = kwargs.pop('partial', False)
    #     instance = self.get_object()
    #     serializer = self.get_serializer(instance, data=request.data, partial=partial)
    #     serializer.is_valid(raise_exception=True)
    #     self.perform_update(serializer)
    #     return Response(serializer.data)
    
    # def destroy(self, request, *args, **kwargs):
    #     instance = self.get_object()
    #     self.perform_destroy(instance)
    #     return Response(status=status.HTTP_204_NO_CONTENT)