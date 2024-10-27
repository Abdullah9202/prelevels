from django.contrib import admin
from django.contrib.auth.admin import UserAdmin
from .models import User, TopicalProgress, YearlyProgress

class UserAdmin(UserAdmin):
    model = User
    list_display = ('username', 'phone_number', 'email', 'createdAt', 'updatedAt', 'last_login')
    search_fields = ('username', 'email', 'phone_number')
    list_filter = ('taking_questionBanks', 'taking_courses', 'taking_bundles')

    fieldsets = (
        (None, {'fields': ('username', 'password')}),
        ('Personal info', {'fields': ('first_name', 'last_name', 'email', 'phone_number')}),
        ('Permissions', {'fields': ('is_active', 'is_staff', 'is_superuser', 'groups', 'user_permissions')}),
        ('Additional info (Only for Students)', {'fields': ('daysStreak', 'questionSolved', 'questionRemained', 'taking_questionBanks', 'taking_courses', 'taking_bundles')}),
        ('Last login & Date joined', {'fields': ('last_login', 'date_joined')}),
    )

    add_fieldsets = (
        (None, {
            'classes': ('wide',),
            'fields': ('username', 'email', 'phone_number', 'password1', 'password2', 'is_active', 'is_staff', 'is_superuser', 'groups', 'user_permissions')}
        ),
    )

admin.site.register(User, UserAdmin)
admin.site.register(TopicalProgress)
admin.site.register(YearlyProgress)