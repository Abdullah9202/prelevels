from django.contrib import admin
# My Files
from .models import Bundle

# Bundle with Admin
class BundleAdmin(admin.ModelAdmin):
    list_display = ('name', 'price', 'discount', 'validity', 'is_active')
    search_fields = ('name',)
    filter_horizontal = ('courses', 'question_banks')


# Registering the Bundle model
admin.site.register(Bundle)
