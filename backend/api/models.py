from django.db import models
from django.contrib.auth.models import AbstractUser
from django.core.exceptions import ValidationError


class CustomUser(AbstractUser):
    name = models.CharField(max_length=50, null=False)
    state = models.CharField(max_length=30, null=False)
    university = models.CharField(max_length=100, null=False)
    
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    class Meta:
        ordering = ['-created_at']
    
    def __str__(self):
        return f"{self.name} ({self.username})"

    def clean(self):
        if not self.username.endswith('.edu'):
            raise ValidationError('Email must end with .edu domain')

class Folder(models.Model):
    name = models.CharField(max_length=50, null=False, blank=False)
    owner = models.ForeignKey(CustomUser, on_delete=models.CASCADE, related_name='folders')
    created_at = models.DateTimeField(auto_now_add=True)
    
    class Meta:
        ordering = ['-created_at']
        unique_together = ['name', 'owner']

    def __str__(self):
        return f"{self.name} (owned by {self.owner.name})"

class Topic(models.Model):
    name = models.CharField(max_length=50, null=False, blank=False)
    folder = models.ForeignKey(Folder, on_delete=models.CASCADE, related_name='topics', null=True, blank=True) 
    created_at = models.DateTimeField(auto_now_add=True)

    class Meta:
        ordering = ['-created_at']
        unique_together = ['name', 'folder']

    def __str__(self):
        return f"{self.name} ({self.folder.name if self.folder else '____'})"



    

class Room(models.Model):
    creator = models.ForeignKey(CustomUser, on_delete=models.CASCADE, related_name='created_rooms', null=False, blank=False)
    title = models.CharField(max_length=100, null=False, blank=False)
    body = models.TextField(max_length=1000, null=True, blank=True)
    participants = models.ManyToManyField(CustomUser, null=True, blank=True, related_name='joined_rooms')

    topic = models.ForeignKey(Topic, on_delete=models.SET_NULL, null=True, blank=True, related_name='rooms')

    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    class Meta:
        ordering = ['-created_at']

    def __str__(self):
        return f"{self.title} by {self.creator.name}"
    


class Message(models.Model):
    room = models.ForeignKey(Room, on_delete=models.CASCADE, related_name='messages', null=True)
    sender = models.ForeignKey(CustomUser, on_delete=models.CASCADE, related_name='sender')
    body = models.TextField()
    is_deleted = models.BooleanField(default=False)
    
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    class Meta:
        ordering = ['-created_at']

    def __str__(self):
        return f"{self.sender.name} - Message: {self.body[:20]}..."
    