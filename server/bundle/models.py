from django.db import models
from django.urls import reverse
from django.utils.translation import gettext as _
import uuid
# My Files
from ..course.models import Course
from ..questionbank.models import QuestionBank


# Bundle model
class Bundle(models.Model):
    id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
    name = models.CharField(_("Name"), max_length=50, null=False, default="Untitled Bundle")
    description = models.TextField(_("Description"), null=True)
    additional_details = models.TextField(_("Additional Details"), null=True)
    price = models.DecimalField(_("Price"), max_digits=10, decimal_places=3, null=True)
    discount = models.DecimalField(_("Discount"), max_digits=10, decimal_places=3, null=True)
    validity = models.IntegerField(_("Validity"), null=True)
    created_at = models.DateTimeField(_("Created At"), auto_now_add=True)
    updated_at = models.DateTimeField(_("Updated At"), auto_now=True)
    is_active = models.BooleanField(_("Is Active"), default=True)

    # Adding many to many relation with question bank and courses
    courses = models.ManyToManyField(Course, verbose_name=_("Courses"), related_name="bundles", blank=True)
    question_bank = models.ManyToManyField(QuestionBank, verbose_name=_("Question Banks"), related_name="bundles", blank=True)

    class Meta:
        verbose_name = _("Bundle")
        verbose_name_plural = _("Bundles")

    def __str__(self):
        return self.name

    def get_absolute_url(self):
        return reverse("bundle:Bundle_detail", kwargs={"id": self.id})

