# Python imports
import os
import random
import logging
from dotenv import load_dotenv
# Django imports
from asgiref.sync import sync_to_async
from django.contrib.auth import login, logout, authenticate
from django_ratelimit.decorators import ratelimit
from django.http import JsonResponse
from django.db import IntegrityError
from django.core.exceptions import ValidationError
from django.middleware.csrf import get_token
# Ninja imports
from ninja_extra import Router
from ninja_extra.security import django_auth
from ninja.errors import HttpError
from ninja.responses import codes_4xx, codes_5xx
# My Files
from .models import User
from .schemas import (
    RegisterSchema, LoginSchema, UpdateSchema, UserSchema
)
from .serializers import UserSerializer, RegisterSerializer

# Loading the env
load_dotenv()

# Router Init
auth_router = Router()

logger = logging.getLogger(__name__)


@auth_router.get("/set-csrf-token/")
def get_csrf_token(request):
    csrf_token_meta = request.META.get("CSRF_COOKIE", None)
    csrf_token = get_token(request)
    logger.debug(f"CSRF Token Meta: {csrf_token_meta}, CSRF Token: {csrf_token}")
    return JsonResponse(
        {
            "csrf_token_meta": csrf_token_meta,
            "csrf_token": csrf_token
        }
    )


# Register User Router
@auth_router.post("/register/", response={200: RegisterSchema, codes_4xx: dict, codes_5xx: dict})
async def register_user(request, payload: RegisterSchema, *args, **kwargs):
    try:
        # Optimize existence check by using sync_to_async for database I/O only
        exists = await sync_to_async(lambda: User.objects.filter(email=payload.email).exists())()
        if exists:
            logger.warning("Email already in use: %s", payload.email)
            raise HttpError(400, "Email address is already in use.")

        # Creating the username
        username = f"{payload.first_name.capitalize()}{payload.last_name.capitalize()}{random.randint(1000, 9999)}"

        payload_dict = payload.dict()
        payload_dict['username'] = username

        # Attempting to serialize and save the user
        serializer = RegisterSerializer(data=payload_dict)
        if not serializer.is_valid():
            logger.error("Serializer validation failed: %s", serializer.errors)
            raise HttpError(400, str(serializer.errors))

        user = await sync_to_async(serializer.save)()
        serialized_data = RegisterSerializer(user).data
        
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


# Login and get the user details router
@auth_router.post("/login/", response={200: UserSchema, codes_4xx: dict})
@ratelimit(key="ip", rate="5/m", method="POST", block=True)  # Rate limiting
def login_user(request, payload: LoginSchema, *args, **kwargs):
    # Checking if the user is already logged in
    if request.user.is_authenticated:
        user = request.user
    else:
        # Authenticating the user using the custom backend
        user = authenticate(request, phone_number=payload.phone_number, password=payload.password)
        
        # Checking if the user exists
        if user is not None:
            login(request, user)
        else:
            logger.warning("Failed login attempt for user with phone number: %s", payload.phone_number)
            raise HttpError(400, "Invalid credentials or user does not exist.")
    
    # Serializing the user data
    serialized_user = UserSerializer(user).data
    
    # Returning the user details
    return JsonResponse(serialized_user, status=200)


# Logout router
@auth_router.post("/logout/", response={200: dict})
async def logout_user(request, *args, **kwargs):
    try:
        await sync_to_async(logout)(request)
        logger.info("User logged out successfully")
        return JsonResponse({"message": "User logged out successfully"}, status=200)
    except Exception as e:
        logger.error("Error during logout: %s", str(e))
        return JsonResponse({"error": "An error occurred during logout. Please try again later."}, status=500)
