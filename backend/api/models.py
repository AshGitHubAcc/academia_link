from django.contrib.auth.models import AbstractUser
from django.db import models

class User(AbstractUser):
    email = models.EmailField(unique=True)
    name = models.CharField(max_length=30, default='')
    state = models.CharField(max_length=30, default='')
    university = models.CharField(max_length=50, default='')

    USERNAME_FIELD = 'email'
    REQUIRED_FIELDS = ['name', 'state', 'university']

    groups = models.ManyToManyField(
        'auth.Group',
        related_name='custom_user_set',
        blank=True
    )
    user_permissions = models.ManyToManyField(
        'auth.Permission',
        related_name='custom_user_set',
        blank=True
    )
