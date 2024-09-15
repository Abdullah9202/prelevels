from django.contrib import admin
# My Files
from .models import Student, TopicalProgress, YearlyProgress


# Student with Admin
class StudentAdmin(admin.ModelAdmin):
    # Display Fields and Filters
    list_display = ('username', 'phone_number', 'email', 'createdAt', 'updatedAt', 'last_login')
    search_fields = ('username', 'email', 'phone_number')
    list_filter = ('taking_questionBanks', 'taking_courses', 'taking_bundles')


admin.site.register(Student, StudentAdmin)
admin.site.register(TopicalProgress)
admin.site.register(YearlyProgress)