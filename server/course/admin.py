from django.contrib import admin
# My Files
from .models import Course

# Registering the Bundle model
admin.site.register(Course)