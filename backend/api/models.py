from django.db import models
from django.contrib.auth.models import AbstractUser


class CustomUser(AbstractUser):
    id = models.AutoField(primary_key=True)
    name = models.CharField(max_length=20, default='')
    state = models.CharField(max_length=30, default='')
    university = models.CharField(max_length=100, default='')


class Room(models.Model):
    id = models.AutoField(primary_key=True)
    # creator = models.ForeignKey(CustomUser, on_delete=models.CASCADE, related_name="ad")
    creator = models.ForeignKey(CustomUser, null=True, on_delete=models.SET_NULL, related_name="rooms")
    title = models.CharField(max_length=50)
    body = models.CharField(null=True, max_length=1000)

    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    def __str__(self):
        return str(self.creator) + " ~ " + str(self.title)