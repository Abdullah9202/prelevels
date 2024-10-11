from django.contrib import admin
# My Files
from .models import Bundle

# Bundle with Admin
class BundleAdmin(admin.ModelAdmin):
    list_display = ('name', 'price', 'discount', 'validity', 'is_active')
    search_fields = ('name', 'description')
    list_filter = ('course', 'question_bank')


# Registering the Bundle model
admin.site.register(Bundle, BundleAdmin)
