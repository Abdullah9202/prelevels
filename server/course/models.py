from django.db import models
from django.urls import reverse
from django.utils.translation import gettext as _
import uuid


# Course model
class Course(models.Model):

    

    class Meta:
        verbose_name = _("Course")
        verbose_name_plural = _("Courses")

    def __str__(self):
        return self.name

    def get_absolute_url(self):
        return reverse("Course_detail", kwargs={"id": self.id})


