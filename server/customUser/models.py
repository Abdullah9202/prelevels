from django.contrib.auth.models import AbstractBaseUser, BaseUserManager, PermissionsMixin
from django.db import models
from django.urls import reverse
from django.utils.translation import gettext_lazy as _
import uuid
from phonenumber_field.modelfields import PhoneNumberField

# Custom User Manager
class CustomUserManager(BaseUserManager):
    def create_user(self, email, username, password=None, **extra_fields):
        if not email:
            raise ValueError('The Email field must be set')
        email = self.normalize_email(email)
        user = self.model(email=email, username=username, **extra_fields)
        user.set_password(password)
        user.save(using=self._db)
        return user

    def create_superuser(self, email, username, password=None, **extra_fields):
        extra_fields.setdefault('is_staff', True)
        extra_fields.setdefault('is_superuser', True)
        return self.create_user(email, username, password, **extra_fields)

# Custom User Model
class CustomUser(AbstractBaseUser, PermissionsMixin):
    id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
    first_name = models.CharField(_("First Name"), max_length=50)
    last_name = models.CharField(_("Last Name"), max_length=50)
    email = models.EmailField(_("Email"), unique=True)
    username = models.CharField(_("Username"), max_length=50, unique=True)
    phone_number = PhoneNumberField(_("Phone Number"), max_length=13, unique=True, blank=False, default="+92XXXXXXXXXX")
    is_active = models.BooleanField(default=True)
    is_staff = models.BooleanField(default=False)
    
    taking_questionBanks = models.ManyToManyField('questionbank.QuestionBank', blank=True)
    taking_courses = models.ManyToManyField('course.Course', blank=True)
    taking_bundles = models.ManyToManyField('bundle.Bundle', blank=True)
    
    daysStreak = models.IntegerField(_("Days Streak"), default=0)
    questionSolved = models.IntegerField(_("Question Solved"), default=0)
    questionRemained = models.IntegerField(_("Question Remained"), default=0)
    
    timestamp = models.DateTimeField(_("Timestamp"), auto_now_add=True)
    updated_at = models.DateTimeField(_("Updated At"), auto_now=True)

    objects = CustomUserManager()

    USERNAME_FIELD = 'email'
    REQUIRED_FIELDS = ['username']

    def __str__(self):
        return f"{self.first_name} {self.last_name}"

    class Meta:
        verbose_name = _("Custom User")
        verbose_name_plural = _("Custom Users")
        
    # Overriding the related_name to avoid conflicts
    groups = models.ManyToManyField(
        'auth.Group',
        related_name='customuser_set',
        blank=True
    )
    user_permissions = models.ManyToManyField(
        'auth.Permission',
        related_name='customuser_set',
        blank=True
    )



# Topical Progress model
class TopicalProgress(models.Model):
    id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
    user = models.ForeignKey(CustomUser, verbose_name=_("User"), related_name="topical_progress", on_delete=models.CASCADE)
    progress = models.JSONField(_("Topical Progress"), default=dict, blank=True)

    class Meta:
        verbose_name = _("Topical Progress")
        verbose_name_plural = _("Topical Progresses")

    def __str__(self):
        return f"{self.user.first_name} {self.user.last_name} - Topical Progress"

    def get_absolute_url(self):
        return reverse("topical_progress_detail", kwargs={"id": self.id})


# Yearly Progress model
class YearlyProgress(models.Model):
    id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
    user = models.ForeignKey(CustomUser, verbose_name=_("User"), related_name="yearly_progress", on_delete=models.CASCADE)
    progress = models.JSONField(_("Yearly Progress"), default=dict, blank=True)

    class Meta:
        verbose_name = _("Yearly Progress")
        verbose_name_plural = _("Yearly Progresses")

    def __str__(self):
        return f"{self.user.first_name} {self.user.last_name} - Yearly Progress"

    def get_absolute_url(self):
        return reverse("yearly_progress_detail", kwargs={"id": self.id})

