from django.contrib import admin
# My Files
from .models import Student, TopicalProgress, YearlyProgress

# Student models
admin.site.register(
    [Student, TopicalProgress, YearlyProgress]
)
