from django.contrib import admin
# My Files
from .models import Student, TopicalProgress, YearlyProgress


# Student with Admin
class StudentAdmin(admin.ModelAdmin):
    # Display Fields and Filters
    list_display = ('username', 'phone_number', 'email', 'is_authenticated', 'timestamp', 'updated_at', 'last_login')
    search_fields = ('username', 'email', 'phone_number')
    list_filter = ('is_authenticated', 'taking_questionBanks', 'taking_courses', 'taking_bundles')


admin.site.register(Student, StudentAdmin)
admin.site.register(TopicalProgress)
admin.site.register(YearlyProgress)