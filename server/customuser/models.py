# Python imports
import uuid
# Django imports
from django.db import models
from django.urls import reverse
from django.contrib.auth.models import AbstractUser
from django.utils.translation import gettext as _
from phonenumber_field.modelfields import PhoneNumberField
# My Files
from questionbank.models import QuestionBank
from course.models import Course
from bundle.models import Bundle


# User model
class User(AbstractUser):
    # Overriding the default fields
    email = models.EmailField(_("Email Address"), max_length=50, unique=True, blank=False, null=False)
    
    # Additional fields
    phone_number = PhoneNumberField(_("Phone Number"), max_length=15, null=False, unique=True, blank=False, default="+92XXXXXXXXXX")
    
    # Relationship with other models
    taking_questionBanks = models.ManyToManyField(QuestionBank, blank=True)
    taking_courses = models.ManyToManyField(Course, blank=True)
    taking_bundles = models.ManyToManyField(Bundle, blank=True)
    
    # Streaks and scores 
    daysStreak = models.IntegerField(_("Days Streak"), default=0)
    questionSolved = models.IntegerField(_("Question Solved"), default=0)
    questionRemained = models.IntegerField(_("Question Remained"), default=0)
    
    # Timestamps for user creation and update
    createdAt = models.DateTimeField(_("Created At"), auto_now_add=True, null=True)
    updatedAt = models.DateTimeField(_("Updated At"), auto_now=True, null=True)

    # Last Login
    last_login = models.DateTimeField(null=True, blank=True)

    # Permissions and groups
    groups = models.ManyToManyField(
        'auth.Group',
        verbose_name=_('groups'),
        blank=True,
        help_text=_('The groups this user belongs to. A user will get all permissions granted to each of their groups.'),
        related_name='user_set'
    )
    user_permissions = models.ManyToManyField(
        'auth.Permission',
        verbose_name=_('user permissions'),
        blank=True,
        help_text=_('Specific permissions for this user.'),
        related_name='user_set'
    )

    class Meta:
        verbose_name = _("User")
        verbose_name_plural = _("Users")

    def __str__(self):
        return f"{self.first_name} {self.last_name}"

    def get_absolute_url(self):
        return reverse("User_detail", kwargs={"id": self.id})


# Model for Topical Progress
class TopicalProgress(models.Model):
    # Unique identifier for each topical progress
    id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
    
    # Relationship with User model
    user = models.ForeignKey(User, verbose_name=_("User"), related_name="topical_progress", on_delete=models.CASCADE)

    # Progress details
    progress = models.JSONField(_("Topical Progress"), default=dict, blank=True)

    class Meta:
        verbose_name = _("Topical Progress")
        verbose_name_plural = _("Topical Progresses")

    def __str__(self):
        return f"{self.user.first_name} {self.user.last_name} - Topical Progress"

    def get_absolute_url(self):
        return reverse("topical_progress_detail", kwargs={"id": self.id})


# Model for Yearly Progress
class YearlyProgress(models.Model):
    # Unique identifier for each yearly progress
    id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
    
    # Relationship with User model
    user = models.ForeignKey(User, verbose_name=_("User"), related_name="yearly_progress", on_delete=models.CASCADE)

    # Progress details
    progress = models.JSONField(_("Yearly Progress"), default=dict, blank=True)

    class Meta:
        verbose_name = _("Yearly Progress")
        verbose_name_plural = _("Yearly Progresses")

    def __str__(self):
        return f"{self.user.first_name} {self.user.last_name} - Yearly Progress"

    def get_absolute_url(self):
        return reverse("yearly_progress_detail", kwargs={"id": self.id})