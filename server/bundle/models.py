from django.db import models
from django.urls import reverse
from django.utils.translation import gettext as _
import uuid


# Bundle model
class Bundle(models.Model):

    

    class Meta:
        verbose_name = _("Bundle")
        verbose_name_plural = _("Bundles")

    def __str__(self):
        return self.name

    def get_absolute_url(self):
        return reverse("Bundle_detail", kwargs={"id": self.id})

