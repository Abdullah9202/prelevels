from django.db import models
from django.urls import reverse
from django.utils.translation import gettext as _
import uuid
from django.contrib.auth.models import BaseUserManager, AbstractUser


# Custom User Manager
class CustomUserManager(BaseUserManager):
    def create_user(self, email, username, password=None, **extra_fields):
        if not email:
            raise ValueError('The Email field must be set')
        if not username:
            raise ValueError('The Username field must be set')
        
        email = self.normalize_email(email)
        user = self.model(email=email, username=username, **extra_fields)
        user.set_password(password)
        user.save(using=self._db)
        return user

    def create_superuser(self, email, username, password=None, **extra_fields):
        extra_fields.setdefault('is_superuser', True)
        extra_fields.setdefault('is_staff', True)
        extra_fields.setdefault('is_authenticated', True)

        return self.create_user(email, username, password, **extra_fields)


# Custom User Model
class User(AbstractUser):
    # Unique identifier for each user
    id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)

    # User's personal info
    first_name = models.CharField("First Name", max_length=50, blank=False)
    last_name = models.CharField("Last Name", max_length=50, blank=False)
    email = models.EmailField("Email", max_length=254, unique=True, blank=False)
    username = models.CharField("Username", max_length=50, unique=True, blank=False)
    password = models.CharField("Password", max_length=50, blank=False)

    # Authentication status
    is_authenticated = models.BooleanField("Is Authenticated", default=False)

    # User status flags
    is_active = models.BooleanField(default=True)
    is_staff = models.BooleanField(default=False)
    is_superuser = models.BooleanField(default=False)

    # Custom user manager
    objects = CustomUserManager()
    
    USERNAME_FIELD = 'email'
    REQUIRED_FIELDS = ['username']

    class Meta:
        verbose_name = _("User")
        verbose_name_plural = _("Users")

    def __str__(self):
        return self.email
