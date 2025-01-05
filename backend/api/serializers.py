
from rest_framework import serializers
from .models import CustomUser, Room, Message

class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = CustomUser
        fields = ['id', 'username', 'password', 'name', 'state', 'university']
        extra_kwargs = {'password': {'write_only': True}}

    def create(self, validated_data):
        user = CustomUser.objects.create_user(**validated_data)
        return user



class MessageSerializer(serializers.ModelSerializer):
    creator = UserSerializer(read_only=True)
    
    class Meta:
        model = Message
        fields = ['id', 'creator', 'receiver', 'room', 'body', 'created_at', 'updated_at']


class RoomSerializer(serializers.ModelSerializer):
    creator = UserSerializer(read_only=True)
    messages = MessageSerializer(source='message_set', many=True, read_only=True)

    class Meta:
        model = Room
        fields = ['id', 'creator', 'title', 'body', 'created_at', 'updated_at', 'messages']
        extra_kwargs = {"creator": {'read_only': True}}

