# Python imports
import os
import logging
from dotenv import load_dotenv
# Django imports
from asgiref.sync import sync_to_async
from django.contrib.auth import login, logout, authenticate
from django.http import JsonResponse
from django.db import IntegrityError
from django.core.exceptions import ValidationError
# Ninja imports
from ninja_extra import Router
from ninja_extra.security import django_auth
from ninja.errors import HttpError
from ninja.responses import codes_4xx, codes_5xx
# My Files
from .models import User
from .schemas import (
    RegisterSchema, UpdateSchema, GetUserDetailSchema
)
from .serializers import UserSerializer, RegisterSerializer


# Loading the env
load_dotenv()

# Router Init
auth_router = Router()

logger = logging.getLogger(__name__)

@auth_router.get("/set-csrf-token")
def get_csrf_token(request):
    return JsonResponse({"csrftoken": request.META["CSRF_COOKIE"]})


# Register User Router
@auth_router.post("/register/", response={200: RegisterSchema, codes_4xx: dict, codes_5xx: dict}, auth=django_auth)
def register_user(request, payload: RegisterSchema, *args, **kwargs):
    try:
        if User.objects.filter(email=payload.email).exists():
            logger.warning("Email already in use: %s", payload.email)
            raise HttpError(400, "Email address is already in use.")
        
        if User.objects.filter(username=payload.username).exists():
            logger.warning("Username already taken: %s", payload.username)
            raise HttpError(400, "Username is already taken.")
        
        if User.objects.filter(phone_number=payload.phone_number).exists():
            logger.warning("Phone number already registered: %s", payload.phone_number)
            raise HttpError(400, "Phone number is already registered.")
        
        # Attempting to serialize and save the user
        serializer = RegisterSerializer(data=payload.dict())
        if not serializer.is_valid():
            logger.error("Serializer validation failed: %s", serializer.errors)
            raise HttpError(400, serializer.errors)

        user = serializer.save()
        serialized_data = UserSerializer(user).data
        
        logger.info("User registered successfully: %s", serialized_data)
        return JsonResponse(serialized_data, status=200)

    except IntegrityError as e:
        logger.error("Database Integrity Error: %s", str(e))
        raise HttpError(400, "Database error. Please ensure your data is unique.")
    except ValidationError as e:
        logger.error("Validation Error: %s", str(e))
        raise HttpError(400, "Validation error.")
    except HttpError as err:
        logger.error("HTTP Error: %s", str(err))
        raise err
    except Exception as e:
        logger.exception("Unexpected error occurred")
        return JsonResponse({"error": "An unexpected error occurred. Please try again later"}, status=500)


# Login router
@auth_router.post("/login/", response={200: dict, codes_4xx: dict}, auth=django_auth)
async def login_user(request, payload: RegisterSchema, *args, **kwargs):
    user = await sync_to_async(authenticate)(username=payload.username, password=payload.password)
    if user is not None:
        await sync_to_async(login)(request, user)
        return JsonResponse({"message": "Login successful"}, status=200)
    else:
        raise HttpError(400, "Invalid credentials or user does not exists.")


# Logout router
@auth_router.post("/logout/", response={200: dict}, auth=django_auth)
async def logout_user(request, *args, **kwargs):
    await sync_to_async(logout)(request)
    return JsonResponse({"message": "User logged out successfully"}, status=200)


# User detail router
@auth_router.get("/me/", response={200: GetUserDetailSchema, codes_4xx: dict}, auth=django_auth)
async def get_user_details(request, *args, **kwargs):
    if request.user.is_authenticated:
        user = request.user
        serialized_user = await sync_to_async(UserSerializer)(user)
        serialized_data = await sync_to_async(lambda: serialized_user.data)()
        return JsonResponse(serialized_data, status=200)
    else:
        raise HttpError(401, "User is not authenticated.")
