from django.contrib import admin
from .models import CustomUserManager, User

# Custom User and User Model 
admin.site.register([CustomUserManager, User])
