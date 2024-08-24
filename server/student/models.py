from django.db import models
from django.urls import reverse
from django.utils.translation import gettext as _
import uuid


# Student model
class Student(models.Model):
    # Unique identifier for each student
    id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
    # Student personal information
    first_name = models.CharField(_("First Name"), max_length=50, null=False)
    last_name = models.CharField(_("Last Name"), max_length=50, null=False)
    email = models.EmailField(_("Email"), max_length=254, null=False, unique=True)
    username = models.CharField(_("Username"), max_length=50, null=False, unique=True)
    password = models.CharField(_("Password"), max_length=50, null=False)
    # Authentication status
    is_authenticated = models.BooleanField(_("Is Authenticated"), default=False)
    # Relationship with other models
    # Each student can take multiple question banks, courses, and bundles
    # Each question bank, course, and bundle can be taken by a same student
    taking_questionBanks = models.ManyToManyField('QuestionBank', blank=True)
    taking_courses = models.ManyToManyField('Course', blank=True)
    taking_bundles = models.ManyToManyField('Bundle', blank=True)
    # Timestamps for student creation and update
    timestamp = models.DateTimeField(_("Timestamp"), auto_now_add=True)
    updated_at = models.DateTimeField(_("Updated At"), auto_now=True)

    class Meta:
        verbose_name = _("Student")
        verbose_name_plural = _("Students")

    def __str__(self):
        return f"{self.first_name} {self.last_name}"

    def get_absolute_url(self):
        return reverse("Student_detail", kwargs={"id": self.id})

