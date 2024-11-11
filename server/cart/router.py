# Python imports
import logging
from uuid import UUID
from typing import List
# Django imports
from django.http import JsonResponse
from django.shortcuts import get_object_or_404
from django.contrib.contenttypes.models import ContentType
from django.contrib.auth.decorators import login_required
# Ninja Imports
from ninja import Router
from ninja_extra.security import django_auth
from ninja.responses import codes_4xx
# My Files
from .models import Cart
from .schemas import CartResponseSchema, CartSchema
from .serializers import CartItemSerializer

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
@cart_router.get("/", response={200: List[CartResponseSchema], codes_4xx: dict})
@login_required
def list_cart_items(request, *args, **kwargs):
    cart_items = Cart.objects.filter(user=request.user)
    serializer = CartItemSerializer(cart_items, many=True)
    return JsonResponse(serializer.data, safe=False)


# Add items in cart
@cart_router.post("/add/", response={200: CartResponseSchema, 201: CartResponseSchema, 
                                            codes_4xx: dict})
@login_required
def add_to_cart(request, item: CartSchema, *args, **kwargs):
    try:
        # Validate the UUID format for item_id
        product_id = UUID(str(item.product_id))
    except ValueError:
        return JsonResponse({"error": "Invalid UUID format"}, status=400)

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

    # Try to find an existing Cart item or create a new one
    try:
        cart_item = Cart.objects.get(
            user=request.user,
            content_type=content_type,
            object_id=product.id,
        )
        cart_item.quantity += item.quantity
        cart_item.save()
    except Cart.DoesNotExist:
        cart_item = Cart.objects.create(
            user=request.user,
            content_type=content_type,
            object_id=product.id,
            quantity=item.quantity,
        )

    # Calculating the total price for items in the cart
    total_price = cart_item.quantity * product.price

    # Response data
    data = {
        "cart_item_id": UUID(str(cart_item.id)),
        "product_id": UUID(str(cart_item.content_object.id)),
        "product_name": cart_item.content_object.name,
        "quantity": cart_item.quantity,
        "price": product.price,  # Price of one item
        "total_price": total_price,  # Total price of all items
        "created_at": cart_item.added_at.isoformat(),
    }

    return JsonResponse(data)


# Update item quantity in cart
@cart_router.put("/{cart_item_id}/update/", response={200: CartResponseSchema, 
                                                            codes_4xx: dict})
@login_required
def update_cart_item(request, cart_item_id: UUID, item: CartSchema = None, *args, **kwargs):
    # Getting the cart item
    try:
        cart_item = get_object_or_404(Cart, id=cart_item_id)
    except Cart.DoesNotExist:
        return JsonResponse({"error": "Cart item not found"}, status=404)
    except Exception as e:
        return JsonResponse({"error": f"An error occurred: {str(e)}"})

    # Update logic (based on item schema if provided)
    if item:
        cart_item.quantity = item.quantity  # Update quantity if present in body

    cart_item.save()

    # Updating the price of items in the cart
    total_price = cart_item.get_total_price()

    data = {
        "cart_item_id": UUID(str(cart_item.id)),
        "product_id": UUID(str(cart_item.content_object.id)),
        "product_name": cart_item.content_object.name,
        "quantity": cart_item.quantity,
        "total_price": total_price,
        "created_at": cart_item.added_at.isoformat(),
    }

    return JsonResponse(data)


# Remove item from cart
@cart_router.delete("/{cart_item_id}/delete/", response={200: dict, 
                                            codes_4xx: dict})
@login_required
def remove_from_cart(request, cart_item_id: UUID, *args, **kwargs):
    try:
        # Getting the cart item
        cart_item = get_object_or_404(Cart, id=cart_item_id)
    except Cart.DoesNotExist:
        return JsonResponse({"error": "Cart item not found"}, status=404)
    except Exception as e:
        return JsonResponse({"error": f"An error occurred: {str(e)}"})
    else:
        cart_item.delete()
        return JsonResponse({"message": "Item deleted from cart"})