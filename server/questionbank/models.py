from django.db import models
from django.urls import reverse
from django.utils.translation import gettext as _
import uuid


# Question bank model
class QuestionBank(models.Model):

    

    class Meta:
        verbose_name = _("QuestionBank")
        verbose_name_plural = _("QuestionBanks")

    def __str__(self):
        return self.name

    def get_absolute_url(self):
        return reverse("QuestionBank_detail", kwargs={"id": self.id})
