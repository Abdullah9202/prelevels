from django.db import models
from django.urls import reverse
from django.contrib.auth.models import AbstractBaseUser, BaseUserManager, PermissionsMixin
from django.utils.translation import gettext as _
from phonenumber_field.modelfields import PhoneNumberField
import uuid

# Importing related models
from questionbank.models import QuestionBank
from course.models import Course
from bundle.models import Bundle

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
    ROLE_CHOICES = [
        ('student', 'Student'),
        ('teacher', 'Teacher'),
        ('admin', 'Admin'),
    ]

    id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
    first_name = models.CharField(_("First Name"), max_length=50, null=False, blank=False)
    last_name = models.CharField(_("Last Name"), max_length=50, null=False, blank=False)
    email = models.EmailField(_("Email"), unique=True, max_length=254, null=False, blank=False)
    username = models.CharField(_("Username"), max_length=50, unique=True, null=False, blank=False)
    phone_number = PhoneNumberField(_("Phone Number"), max_length=13, unique=True, null=False, blank=False, default="+92XXXXXXXXXX")
    is_active = models.BooleanField(default=True)
    is_staff = models.BooleanField(default=False)
    role = models.CharField(_("Role"), max_length=10, choices=ROLE_CHOICES, default='student')

    # Relationship with other models
    taking_questionBanks = models.ManyToManyField(QuestionBank, blank=True)
    taking_courses = models.ManyToManyField(Course, blank=True)
    taking_bundles = models.ManyToManyField(Bundle, blank=True)

    # Student-specific fields
    daysStreak = models.IntegerField(_("Days Streak"), default=0)
    questionSolved = models.IntegerField(_("Question Solved"), default=0)
    questionRemained = models.IntegerField(_("Question Remained"), default=0)

    # Timestamps
    timestamp = models.DateTimeField(_("Timestamp"), auto_now_add=True)
    updated_at = models.DateTimeField(_("Updated At"), auto_now=True)

    objects = CustomUserManager()

    USERNAME_FIELD = 'email'
    REQUIRED_FIELDS = ['username']

    class Meta:
        verbose_name = _("User")
        verbose_name_plural = _("Users")

    def __str__(self):
        return f"{self.first_name} {self.last_name}"

    def is_student(self):
        return self.role == 'student'

    def is_teacher(self):
        return self.role == 'teacher'

    def is_admin(self):
        return self.role == 'admin'


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

