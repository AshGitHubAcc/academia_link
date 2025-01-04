
from rest_framework import serializers
from .models import CustomUser, Room

class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = CustomUser
        fields = ['id', 'username', 'password', 'name', 'state', 'university']
        extra_kwargs = {'password': {'write_only': True}}

    def create(self, validated_data):
        user = CustomUser.objects.create_user(**validated_data)
        return user


class RoomSerializer(serializers.ModelSerializer):
    class Meta:
        model = Room
        fields = ['id', 'creator', 'title', 'body', 'created_at', 'updated_at']
        extra_kwargs = {"creator": {'read_only': True}}
    
    # def create(self, validated_data):
    #     room = Room.objects.create(**validated_data)
    #     return room
