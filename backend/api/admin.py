from django.contrib import admin

from .models import CustomUser, Room, Message, Topic
# Register your models here.

admin.site.register(CustomUser)
admin.site.register(Room)
admin.site.register(Message)
admin.site.register(Topic)



