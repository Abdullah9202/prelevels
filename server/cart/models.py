# Python imports
from uuid import uuid4
# Django imports
from django.db import models
from django.conf import settings
from django.utils.translation import gettext as _
from django.contrib.contenttypes.models import ContentType
from django.contrib.contenttypes.fields import GenericForeignKey
# My Files
from student.models import Student


class CartItem(models.Model):
    id = models.UUIDField(primary_key=True, default=uuid4, editable=False)
    user = models.ForeignKey(settings.AUTH_USER_MODEL, verbose_name=_("User"), on_delete=models.CASCADE, related_name="cart_items")
    content_type = models.ForeignKey(ContentType, on_delete=models.CASCADE)
    object_id = models.UUIDField()
    content_object = GenericForeignKey('content_type', 'object_id')
    quantity = models.PositiveIntegerField(default=1)
    added_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return f"{self.content_object} (x{self.quantity})"

    def get_total_price(self):
        return self.content_object.price * self.quantity

    def get_discounted_price(self):
        return (self.content_object.price - self.content_object.discount) * self.quantity if self.content_object.discount else self.get_total_price()


class Cart(models.Model):
    id = models.UUIDField(primary_key=True, default=uuid4, editable=False)
    user = models.OneToOneField(settings.AUTH_USER_MODEL, verbose_name=_("User"), on_delete=models.CASCADE, related_name="cart")
    items = models.ManyToManyField(CartItem, verbose_name=_("Cart Items"), related_name="cart")

    def __str__(self):
        return f"Cart of {self.user}"

    def get_total_price(self):
        return sum(item.get_total_price() for item in self.items.all())

    def get_total_discounted_price(self):
        return sum(item.get_discounted_price() for item in self.items.all())


