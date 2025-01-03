from django.db import models
from django.contrib.auth.models import AbstractUser


class CustomUser(AbstractUser):
    name = models.CharField(max_length=20, default='')
    state = models.CharField(max_length=30, default='')
    university = models.CharField(max_length=100, default='')


class Room(models.Model):
    title = models.CharField(max_length=50)
    body = models.CharField(null=True)
    # creator = models.ForeignKey(CustomUser, on_delete=models.CASCADE, related_name="ad")
    creator = models.ForeignKey(CustomUser, related_name="rooms")

    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    def __str__(self):
        return str(self.creator) + " ~ " + str(self.title)