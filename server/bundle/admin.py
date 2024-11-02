from django.contrib import admin
# My Files
from .models import BundleCategory, Bundle

# BundleCategory with Admin
class CategoryAdmin(admin.ModelAdmin):
    list_display = ('name', 'created_at', 'updated_at', 'is_active')
    search_fields = ('name',)
    list_filter = ('is_active',)

# Registering the BundleCategory model
admin.site.register(BundleCategory, CategoryAdmin)


# Bundle with Admin
class BundleAdmin(admin.ModelAdmin):
    list_display = ('name', 'price', 'discount', 'validity', 'is_active',)
    search_fields = ('name', 'description',)
    list_filter = ('course', 'question_bank',)


# Registering the Bundle model
admin.site.register(Bundle, BundleAdmin)
