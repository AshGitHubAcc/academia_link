from rest_framework import serializers
from django.core.validators import EmailValidator
from .models import CustomUser, Room, Message, Topic

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


class TopicSerializer(serializers.ModelSerializer):
    class Meta:
        model = Topic
        fields = ['id', 'name', 'created_at']


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
