from django.contrib import admin
# My Files
from .models import CourseCategory, Course

# Category with Admin
class CategoryAdmin(admin.ModelAdmin):
    # Display Fields and Filters
    list_display = ('name', 'created_at', 'updated_at', 'is_active',)
    search_fields = ('name',)
    list_filter = ('is_active',)

# Registering the CourseCategory model
admin.site.register(CourseCategory, CategoryAdmin)


# Courses with Admin
class CourseAdmin(admin.ModelAdmin):
    list_display = ('name', 'description', 'price', 'discount', 'validity', 'is_active')
    search_fields = ('name', 'description',)
    list_filter = ('is_active', 'price', 'validity',)


# Registering the Course model
admin.site.register(Course, CourseAdmin)