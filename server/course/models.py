# Python imports
import uuid
# Django imports
from django.db import models
from django.urls import reverse
from django.utils.translation import gettext as _
from django.contrib.contenttypes.models import ContentType
# My Files
from cart.models import Cart, CartItem


# Course model
class Course(models.Model):
    id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False, unique=True, null=False)
    name = models.CharField(_("Name"), max_length=50, null=False, default="Untitled Course")
    description = models.TextField(_("Description"), null=True)
    additional_details = models.TextField(_("Additional Details"), null=True, blank=True)
    course_image = models.URLField(_("Course image"), null=True)
    whatsapp_link = models.URLField(_("Whatsapp Link"), null=True)
    resource_link = models.URLField(_("Resource Link"), null=True)
    price = models.DecimalField(_("Price"), max_digits=10, decimal_places=0, null=True)
    discount = models.DecimalField(_("Discount"), max_digits=10, decimal_places=0, null=True, blank=True)
    validity = models.IntegerField(_("Validity"), null=True, blank=True)
    created_at = models.DateTimeField(_("Created At"), auto_now_add=True)
    updated_at = models.DateTimeField(_("Updated At"), auto_now=True)
    is_active = models.BooleanField(_("Is Active"), default=True)

    class Meta:
        verbose_name = _("Course")
        verbose_name_plural = _("Courses")

    def __str__(self):
        return self.name

    def add_to_cart(self, user, quantity=1):
        cart, created = Cart.objects.get_or_create(user=user)
        content_type = ContentType.objects.get_for_model(self)
        cart_item, created = CartItem.objects.get_or_create(cart=cart, content_type=content_type, object_id=self.id)
        cart_item.quantity = quantity
        cart_item.save()
        cart.items.add(cart_item)
        cart.save()

    def get_absolute_url(self):
        return reverse("course:Course_detail", kwargs={"id": self.id})


