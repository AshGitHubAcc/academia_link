from rest_framework import serializers
from django.core.validators import EmailValidator
from .models import CustomUser, Room, Message, Topic, Folder



class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = CustomUser
        fields = ['id', 'username', 'password', 'name', 'state', 'university']
        extra_kwargs = {
            'password': {'write_only': True},
            'username': {'validators': [EmailValidator()]},
        }

    def create(self, validated_data):
        return CustomUser.objects.create_user(**validated_data)

from rest_framework_simplejwt.serializers import TokenObtainPairSerializer

class CustomTokenObtainPairSerializer(TokenObtainPairSerializer):
    def validate(self, attrs):
        data = super().validate(attrs)

        data.update({
            'user': {
                'id': self.user.id,
                'username': self.user.username,
                'name': self.user.name,
                'state': self.user.state,
                'university': self.user.university,
            }
        })
        return data




class TopicSerializer(serializers.ModelSerializer):
    
    class Meta:
        model = Topic
        fields = ['id', 'name','folder', 'created_at']

class FolderSerializer(serializers.ModelSerializer):

    class Meta:
        model = Folder
        fields = ['id', 'name', 'owner', 'created_at']


class MessageSerializer(serializers.ModelSerializer):
    sender = UserSerializer(read_only=True)
    
    class Meta:
        model = Message
        fields = ['id', 'sender', 'room', 'body', 'is_deleted', 'created_at']
        read_only_fields = ['sender', 'is_deleted']


class RoomSerializer(serializers.ModelSerializer):
    participant_count = serializers.IntegerField(source='participants.count', read_only=True)
    creator = UserSerializer(read_only=True)
    topic = TopicSerializer(read_only=True)

    
    class Meta:
        model = Room
        fields = [
            'id', 'creator', 'title', 'body',
            'participants', 'participant_count', 'topic', 'created_at'
        ]
        read_only_fields = ['creator', 'participants']

