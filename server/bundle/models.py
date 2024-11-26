# Python imports
import uuid
# Django imports
from django.db import models
from django.urls import reverse
from django.utils.translation import gettext as _
from django.contrib.contenttypes.models import ContentType
# My Files
from course.models import Course
from questionbank.models import QuestionBank
from cart.models import Cart


# Category model
class BundleCategory(models.Model):
    id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False, unique=True, null=False)
    name = models.CharField(_("Name"), max_length=50, null=False, blank=False, default="Untitled Category", 
                            unique=True)
    created_at = models.DateTimeField(_("Created At"), auto_now_add=True)
    updated_at = models.DateTimeField(_("Updated At"), auto_now=True)
    is_active = models.BooleanField(_("Is Active"), default=True)
    
    class Meta:
        verbose_name = _("Category")
        verbose_name_plural = _("Categories")
    
    def __str__(self):
        return self.name
    
    def get_absolute_url(self):
        return reverse("bundle:BundleCategory_detail", kwargs={"id": self.id})


# Bundle model
class Bundle(models.Model):
    id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False, unique=True, null=False)
    # Foreign key (One to many relation with category)
    category = models.ForeignKey(BundleCategory, verbose_name=_("Category"), related_name="bundles",
                                    on_delete=models.CASCADE)
    name = models.CharField(_("Name"), max_length=50, null=False, default="Untitled Bundle", unique=True)
    image = models.ImageField(_("Bundle Image"), 
                                    upload_to="images/", 
                                    height_field=None, width_field=None, max_length=None,
                                    null=True, blank=True)
    description = models.TextField(_("Description"), null=True, blank=True)
    additional_details = models.TextField(_("Additional Details"), null=True, blank=True)
    price = models.DecimalField(_("Price"), max_digits=10, decimal_places=0, null=True)
    discount = models.DecimalField(_("Discount %"), max_digits=10, decimal_places=0, null=True, blank=True)
    validity = models.IntegerField(_("Validity"), null=True, blank=True)
    created_at = models.DateTimeField(_("Created At"), auto_now_add=True)
    updated_at = models.DateTimeField(_("Updated At"), auto_now=True)
    is_active = models.BooleanField(_("Is Active"), default=True)

    # Adding many to many relation with question bank and courses
    course = models.ManyToManyField(Course, verbose_name=_("Courses"), related_name="bundles", blank=True)
    question_bank = models.ManyToManyField(QuestionBank, verbose_name=_("Question Banks"), related_name="bundles", blank=True)

    class Meta:
        verbose_name = _("Bundle")
        verbose_name_plural = _("Bundles")

    def __str__(self):
        return self.name
    
    def add_to_cart(self, user, quantity=1):
        content_type = ContentType.objects.get_for_model(self)
        cart_item, created = Cart.objects.get_or_create(
            user=user,
            content_type=content_type,
            object_id=self.id,
            defaults={'quantity': quantity}
        )
        if not created:
            cart_item.quantity += quantity
            cart_item.save()

    def get_absolute_url(self):
        return reverse("bundle:Bundle_detail", kwargs={"id": self.id})

