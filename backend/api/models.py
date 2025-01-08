from django.db import models
from django.contrib.auth.models import AbstractUser


class CustomUser(AbstractUser):
    id = models.AutoField(primary_key=True)
    name = models.CharField(max_length=20, default='')
    state = models.CharField(max_length=30, default='')
    university = models.CharField(max_length=100, default='')
    
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    def __str__(self):
        return str(self.username)


class Topic(models.Model):
    name = models.CharField(max_length=25)
    created_at = models.DateTimeField(auto_now_add=True, blank=True)

    def __str__(self):
        return str(self.name)




class Room(models.Model):
    id = models.AutoField(primary_key=True)
    creator = models.ForeignKey(CustomUser, null=False,blank=False, on_delete=models.CASCADE)
    title = models.CharField(max_length=50)
    body = models.CharField(null=True, max_length=1000, blank=True)
    participants = models.ManyToManyField(CustomUser, related_name='participants', blank=True)
    topic = models.ForeignKey(Topic, null=True,blank=True, on_delete=models.DO_NOTHING)
    # images = []
    # videos = []

    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    def __str__(self):
        return str(self.creator) + " ~ " + str(self.title)
    

class Message(models.Model):
    creator = models.ForeignKey(CustomUser, on_delete=models.CASCADE, null=True, blank=False, related_name='created_messages')
    receiver = models.ForeignKey(CustomUser, on_delete=models.CASCADE, null=True, blank=True, related_name='received_messages')
    room = models.ForeignKey(Room, on_delete=models.CASCADE, null=False, blank=False)
    body = models.TextField()
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    def __str__(self):
        return "Message: " + str(self.body[:20])
    
