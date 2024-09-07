# Python imports
import logging
from uuid import UUID
from typing import List
# Django imports
from django.http import JsonResponse
from django.shortcuts import get_object_or_404
from django.contrib.contenttypes.models import ContentType
# Ninja Imports
from ninja import Router
from ninja.errors import HttpError
from ninja_jwt.authentication import JWTAuth
from ninja.responses import codes_4xx
# My Files
from .models import Cart, CartItem
from .schemas import CartResponseSchema, CartItemSchema


# Router Init
cart_router = Router()


# Set up logging
logger = logging.getLogger(__name__)


# Get all items in cart
@cart_router.get("", response={200: List[CartResponseSchema], codes_4xx: dict}, auth=JWTAuth())
def list_cart_items(request, *args, **kwargs):
    cart_items = Cart.objects.filter(user=request.user)
    data = [{"id": str(item.id), "product_id": str(item.content_object.id), "product_name": item.content_object.name, 
            "quantity": item.quantity, "created_at": item.added_at.isoformat()} for item in cart_items]
    return JsonResponse(data, safe=False)


# Add items in cart
@cart_router.post("", response={200 or 201: CartResponseSchema, codes_4xx: dict}, auth=JWTAuth)
def add_to_cart(request, item: CartItemSchema, *args, **kwargs):
    cart, created = Cart.objects.get_or_create(user=request.user)
    product = get_object_or_404(ContentType.objects.get_for_model(item.product_id).model_class(), id=item.product_id)

    cart_item, created = CartItem.objects.get_or_create(
        cart=cart,
        content_type=ContentType.objects.get_for_model(product),
        object_id=product.id,
        defaults={"quantity": item.quantity},
    )
    
    if not created:
        cart_item.quantity += item.quantity
        cart_item.save()

    data = {
        "id": str(cart_item.id),
        "product_id": str(cart_item.content_object.id),
        "product_name": cart_item.content_object.name,
        "quantity": cart_item.quantity,
        "created_at": cart_item.added_at.isoformat(),
    }
    
    return JsonResponse(data, status=201 if created else 200)


# Update item quantity in cart
@cart_router.put("/{item_id}", response={200: CartResponseSchema, codes_4xx: dict}, auth=JWTAuth())
def update_cart_item(request, item_id: UUID, item: CartItemSchema, *args, **kwargs):
    cart_item = get_object_or_404(CartItem, id=item_id, user=request.user)

    cart_item.quantity = item.quantity
    cart_item.save()

    data = {
        "id": str(cart_item.id),
        "product_id": str(cart_item.content_object.id),
        "product_name": cart_item.content_object.name,
        "quantity": cart_item.quantity,
        "created_at": cart_item.added_at.isoformat(),
    }
    
    return JsonResponse(data)


# Remove item from cart
@cart_router.delete("/{item_id}", response={200: dict, codes_4xx: dict}, auth=JWTAuth())
def remove_from_cart(request, item_id: UUID, *args, **kwargs):
    cart_item = get_object_or_404(CartItem, id=item_id, user=request.user)
    cart_item.delete()
    return JsonResponse({"message": "Item deleted from cart"})