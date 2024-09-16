# Python imports
import uuid
# Django imports
from django.db import models
from django.urls import reverse
from django.utils.translation import gettext as _
from phonenumber_field.modelfields import PhoneNumberField
# My Files
from questionbank.models import QuestionBank
from course.models import Course
from bundle.models import Bundle


# Student model
class Student(models.Model):
    # Unique identifier for each student
    id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
    
    # Clerk ID
    clerkId = models.CharField(max_length=150, null=True)
    
    # Student personal information
    first_name = models.CharField(_("First Name"), max_length=50, null=False, blank=False)
    last_name = models.CharField(_("Last Name"), max_length=50, null=False, blank=False)
    avatar_url = models.URLField(_("Avatar Url"), null=True)
    email = models.EmailField(_("Email"), max_length=254, null=False, unique=True, blank=False)
    username = models.CharField(_("Username"), max_length=50, null=False, unique=True, blank=False)
    phone_number = PhoneNumberField(_("Phone Number"), max_length=15, null=False, unique=True, 
                                    blank=False, default="+92XXXXXXXXXX")
    password = models.CharField(_("Password"), max_length=100, null=False, blank=False)
    
    # Relationship with other models
    # Each student can take multiple question banks, courses, and bundles
    # Each question bank, course, and bundle can be taken by a same student
    taking_questionBanks = models.ManyToManyField(QuestionBank, blank=True)
    taking_courses = models.ManyToManyField(Course, blank=True)
    taking_bundles = models.ManyToManyField(Bundle, blank=True)
    
    # Streaks and scores 
    daysStreak = models.IntegerField(_("Days Streak"), default=0)
    questionSolved = models.IntegerField(_("Question Solved"), default=0)
    questionRemained = models.IntegerField(_("Question Remained"), default=0)
    
    # Timestamps for student creation and update
    createdAt = models.DateTimeField(_("Created At"), auto_now_add=True, null=True)
    updatedAt = models.DateTimeField(_("Updated At"), auto_now=True, null=True)

    # Last Login
    last_login = models.DateTimeField(null=True, blank=True)

    class Meta:
        verbose_name = _("Student")
        verbose_name_plural = _("Students")

    def __str__(self):
        return f"{self.first_name} {self.last_name}"

    def get_absolute_url(self):
        return reverse("Student_detail", kwargs={"id": self.id})


# Model for Topical Progress
class TopicalProgress(models.Model):
    # Unique identifier for each topical progress
    id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
    
    # Relationship with student model
    student = models.ForeignKey(Student, verbose_name=_("Student"), related_name="topical_progress", on_delete=models.CASCADE)

    # Progress details
    progress = models.JSONField(_("Topical Progress"), default=dict, blank=True)

    class Meta:
        verbose_name = _("Topical Progress")
        verbose_name_plural = _("Topical Progresses")

    def __str__(self):
        return f"{self.student.first_name} {self.student.last_name} - Topical Progress"

    def get_absolute_url(self):
        return reverse("topical_progress_detail", kwargs={"id": self.id})


# Model for Yearly Progress
class YearlyProgress(models.Model):
    # Unique identifier for each yearly progress
    id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
    
    # Relationship with student model
    student = models.ForeignKey(Student, verbose_name=_("Student"), related_name="yearly_progress", on_delete=models.CASCADE)

    # Progress details
    progress = models.JSONField(_("Yearly Progress"), default=dict, blank=True)

    class Meta:
        verbose_name = _("Yearly Progress")
        verbose_name_plural = _("Yearly Progresses")

    def __str__(self):
        return f"{self.student.first_name} {self.student.last_name} - Yearly Progress"

    def get_absolute_url(self):
        return reverse("yearly_progress_detail", kwargs={"id": self.id})
