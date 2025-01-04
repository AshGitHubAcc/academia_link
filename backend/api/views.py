from colorama import init, Fore, Style
init()  

from rest_framework import generics, status
from rest_framework.permissions import IsAuthenticated, AllowAny

from .models import CustomUser, Room
from .serializers import UserSerializer, RoomSerializer
from rest_framework.permissions import AllowAny
from .state_university_api import all_states_universities

from rest_framework.response import Response

# Create your views here.


class CreateUser(generics.CreateAPIView):
    queryset = CustomUser.objects.all()
    
    serializer_class = UserSerializer
    permission_classes = [AllowAny]


    def validate_data(self, data):

        all_states = []
        all_universities = []

        if (not data['username'].find('@')) or (not data['username'].endswith('.edu')):
            return "Email must contain '@' and end with '.edu'"
        elif len(data['password']) < 8 or (not any(char.isdigit() for char in data['password'])):
            return "Password must be at least 8 character and contain numbers"
        elif len(data['name']) > 20 or len(data['name']) < 2:
            return 'Name must be at least 2 characters'
        
        # elif data['state'] not in all_states:
        #     return 'Not a valid state'
        # elif data['university'] not in all_states:
        #     return 'Not a valid university'

        return "Valid"


    def create(self, request, *args, **kwargs):

        updated_data = request.data
        updated_data['username'] = updated_data.pop('email')
        validte_message = self.validate_data(updated_data)

        if validte_message != "Valid":
            print(Fore.RED,"=========================", "User register data was incorrect", Style.RESET_ALL)
            return Response({'message': validte_message}, status=status.HTTP_400_BAD_REQUEST)

        serializer = self.get_serializer(data=updated_data)

        if serializer.is_valid():
            user = serializer.save()
            print(Fore.GREEN, "=========================", "User Valid and created", Style.RESET_ALL)
            return Response({'message': "Sucessful", 'user': UserSerializer(user).data }, status=status.HTTP_200_OK)
        

        print(Fore.RED, "=========================", serializer.errors, Style.RESET_ALL)
        return Response({'message': serializer.errors}, status=status.HTTP_400_BAD_REQUEST)


            




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