from django.contrib import admin
# My Files
from .models import Course


# Courses with Admin
class CourseAdmin(admin.ModelAdmin):
    list_display = ('name', 'description', 'price', 'discount', 'validity', 'is_active')
    search_fields = ('name', 'description')
    list_filter = ('is_active', 'price', 'validity')


# Registering the Course model
admin.site.register(Course, CourseAdmin)