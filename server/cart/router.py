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

# Model mapping
MODEL_MAP = {
    'QuestionBank': 'questionbank.QuestionBank',
    'Course': 'course.Course',
    'Bundle': 'bundle.Bundle',
}


# Get all items in cart
@cart_router.get("/list/", response={200: List[CartResponseSchema], codes_4xx: dict}, auth=JWTAuth())
def list_cart_items(request, *args, **kwargs):
    cart_items = CartItem.objects.filter(cart__user=request.user)
    data = [{
        "id": str(item.id),  # Assuming CartItem.id is a UUID
        "product_id": str(item.content_object.id),  # Assuming product IDs are UUIDs
        "product_name": item.content_object.name,
        "quantity": item.quantity,
        "price": item.content_object.price,
        "total_price": item.content_object.price * item.quantity,
        "created_at": item.added_at.isoformat()
    } for item in cart_items]
    
    return JsonResponse(data, safe=False)


# Add items in cart
@cart_router.post("/add/", response={200: CartResponseSchema, 201: CartResponseSchema, codes_4xx: dict}, auth=JWTAuth())
def add_to_cart(request, item: CartItemSchema, *args, **kwargs):
    try:
        # Validate the UUID format for product_id
        product_id = UUID(str(item.product_id))
    except ValueError:
        return JsonResponse({"error": "Invalid UUID format"}, status=400)

    # Get or create the user's cart
    cart, created = Cart.objects.get_or_create(user=request.user)

    # Retrieve the model class path based on the product_model
    model_class_path = MODEL_MAP.get(item.product_model)
    if not model_class_path:
        return JsonResponse({"error": "Invalid product model"}, status=400)

    app_label, model_name = model_class_path.split('.')

    try:
        # Get the ContentType and corresponding model class
        content_type = ContentType.objects.get(app_label=app_label, model=model_name.lower())
        product_model = content_type.model_class()
        product = get_object_or_404(product_model, id=product_id)
    except ContentType.DoesNotExist:
        return JsonResponse({"error": f"Content type for '{model_name}' does not exist"}, status=400)
    except AttributeError:
        return JsonResponse({"error": "Invalid model class"}, status=400)

    # Try to find an existing CartItem or create a new one without setting the cart first
    try:
        cart_item = CartItem.objects.get(
            content_type=content_type,
            object_id=product.id,
        )
        cart_item.quantity += item.quantity
        cart_item.save()
    except CartItem.DoesNotExist:
        cart_item = CartItem.objects.create(
            content_type=content_type,
            object_id=product.id,
            quantity=item.quantity,
        )
        cart.items.add(cart_item)

    # Calculating the total price for items in the cart
    total_price = cart_item.quantity * product.price

    # Response data
    data = {
        "id": str(cart_item.id),
        "product_id": str(cart_item.content_object.id),
        "product_name": cart_item.content_object.name,
        "quantity": cart_item.quantity,
        "price": product.price, # Price of one item
        "total_price": total_price, # Total price of all items
        "created_at": cart_item.added_at.isoformat(),
    }

    return JsonResponse(data, status=201 if created else 200)


# Update item quantity in cart
@cart_router.put("/{item_id}/update/", response={200: CartResponseSchema, codes_4xx: dict}, auth=JWTAuth())
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
@cart_router.delete("/{item_id}/delete/", response={200: dict, codes_4xx: dict}, auth=JWTAuth())
def remove_from_cart(request, item_id: UUID, *args, **kwargs):
    cart_item = get_object_or_404(CartItem, id=item_id, user=request.user)
    cart_item.delete()
    return JsonResponse({"message": "Item deleted from cart"})