

from rest_framework import serializers
from .models import CustomUser, Room, Message, Topic

class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = CustomUser
        fields = ['id', 'username', 'password', 'name', 'state', 'university']
        extra_kwargs = {'password': {'write_only': True}}

    def create(self, validated_data):
        user = CustomUser.objects.create_user(**validated_data)
        return user


class TopicSerializer(serializers.ModelSerializer):
    
    class Meta:
        model = Topic
        fields = ['id', 'name', 'created_at']

class MessageSerializer(serializers.ModelSerializer):
    # creator = UserSerializer(read_only=True)
    
    class Meta:
        model = Message
        fields = ['id', 'creator', 'receiver', 'room', 'body', 'created_at', 'updated_at']


# class RoomSerializer(serializers.ModelSerializer):
#     creator = UserSerializer(read_only=True)
#     messages = MessageSerializer(source='message_set', many=True, read_only=True)

#     class Meta:
#         model = Room
#         fields = ['id', 'creator', 'title', 'body', 'created_at', 'updated_at', 'messages', 'participants']
#         extra_kwargs = {"creator": {'read_only': True}}


class RoomSerializer(serializers.ModelSerializer):
   creator = UserSerializer(read_only=True)
   participants = UserSerializer(many=True, read_only=True)
   
   class Meta:
       model = Room
       fields = ['id', 'creator', 'title', 'body', 'participants', 'topic', 'created_at']
       read_only_fields = ['creator']

#    def create(self, validated_data):
#        # Get participants data if provided
#        participants = validated_data.pop('participants', [])
#        room = Room.objects.create(**validated_data)
#        room.participants.set(participants)
#        return room