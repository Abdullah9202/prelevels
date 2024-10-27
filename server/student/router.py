# Python imports
import os
import jwt
import logging
from pathlib import Path
import json
from uuid import UUID
from dotenv import load_dotenv
from asgiref.sync import sync_to_async
# Django imports
from django.contrib.auth import login, logout, authenticate
from django.http import JsonResponse
from django.contrib.auth.hashers import make_password, check_password
from django.db import IntegrityError
from django.core.exceptions import ValidationError
from django.shortcuts import get_object_or_404
# Ninja Imports
from ninja import Router
from ninja.errors import HttpError
from ninja.responses import codes_4xx, codes_5xx
# Clerk imports
from clerk_django.client import ClerkClient
# My Files
from .models import User
from .schemas import (
    QuestionBankSchema, CourseSchema, BundleSchema, UserSchema,
    RegisterSchema, UpdateSchema, GetUserDetailSchema, HelloSchema
)
from .serializers import UserSerializer

# Loading the env
load_dotenv()

# Router Init
auth_router = Router()

# Clerk Client Init
clerk_client = ClerkClient()

# Set up logging
logger = logging.getLogger(__name__)


# Test route
@auth_router.get("/hello/", response={200: HelloSchema, codes_4xx: dict})
async def hello(request, *args, **kwargs):
    return JsonResponse({"msg": "Hello World!"}, status=200)


# Register User Router
@auth_router.post("/register/", response={200: RegisterSchema, codes_4xx: dict, codes_5xx: dict})
async def register_User(request, payload: RegisterSchema, *args, **kwargs):
    logger.info(f"Registering User with data: {payload.dict()}")

    try:
        # Checking for existing user
        if await User.objects.filter(email=payload.email).aexists():
            logger.warning("Registration failed: Email already exists.")
            raise HttpError(400, "Email address is already in use.")
        if await User.objects.filter(username=payload.username).aexists():
            logger.warning("Registration failed: Username already exists.")
            raise HttpError(400, "Username is already taken.")
        if await User.objects.filter(phone_number=payload.phone_number).aexists():
            logger.warning("Registration failed: Phone number already exists.")
            raise HttpError(400, "Phone number is already registered.")

        # Using the serializer to validate the input data
        serializer = UserSerializer(data=payload.dict())
        if not await sync_to_async(serializer.is_valid)():
            logger.error(f"Validation error: {serializer.errors}")
            raise HttpError(400, "Invalid input data.")

        # Hashing the password
        hashed_password = await sync_to_async(make_password)(payload.password)

        # Registering the new User
        new_User = User(
            clerk_id=payload.clerk_id,
            first_name=payload.first_name,
            last_name=payload.last_name,
            email=payload.email,
            username=payload.username,
            avatar_url=payload.avatar_url,
            phone_number=payload.phone_number,
            password=hashed_password,
        )
        await new_User.asave()

        # Serializing the newly created User and returning it
        serialized_User = await sync_to_async(UserSerializer)(new_User)
        serialized_data = await sync_to_async(lambda: serialized_User.data)()

        return JsonResponse(serialized_data)

    except IntegrityError as err:
        logger.error(f"IntegrityError: {str(err)}")
        raise HttpError(400, "Database error. Please ensure your data is unique.")
    except ValidationError as err:
        logger.error(f"ValidationError: {str(err)}")
        raise HttpError(400, "Validation error.")
    except HttpError as err:
        logger.error(f"HttpError: {err}")
        raise err
    except Exception as e:
        logger.error(f"Unexpected error: {str(e)}")
        return JsonResponse({"error": "An unexpected error occurred. Please try again later"}, status=500)


# Update User Router
@auth_router.put("/update/", response={200: UpdateSchema, 400: dict, 500: dict})
async def update_User(request, *args, **kwargs):
    try:
        # Getting Clerk user data from the request
        clerk_user = request.clerk_user
        if not clerk_user:
            raise HttpError(401, "User is not authenticated.")

        # Getting the Clerk user ID from the Clerk user data
        clerk_user_id = clerk_user.get("id")

        # Finding the User using the clerk_id
        User = await User.objects.aget(clerk_id=clerk_user_id)

        # Updating User details with the data from Clerk
        User.first_name = clerk_user.get("first_name", User.first_name)
        User.last_name = clerk_user.get("last_name", User.last_name)
        User.email = clerk_user.get("email", User.email)
        User.username = clerk_user.get("username", User.username)
        User.avatar_url = clerk_user.get("avatar_url", User.avatar_url)
        User.phone_number = clerk_user.get("phone_number", User.phone_number)
        User.password = await sync_to_async(make_password)(clerk_user.get("password", User.password))

        # Saving the updated User details
        await User.asave()

        # Serializing the updated User details
        serialized_User = await sync_to_async(UserSerializer)(User)
        serialized_data = await sync_to_async(lambda: serialized_User.data)()

        # Return the serialized data
        return JsonResponse(serialized_data, status=200)

    except User.DoesNotExist:
        raise HttpError(404, "User not found.")
    except Exception as e:
        logger.error(f"Unexpected error occurred: {e}")
        raise HttpError(500, f"An unexpected error occurred: {e}")


# AZAK
# Login and logout are being managed by Clerk
# =============================================================================================
# Session init Router
@auth_router.post("/init-session/", response={200: dict, codes_4xx: dict, codes_5xx: dict})
async def init_session(request, *args, **kwargs):
    try:
        # Check if a session already exists for the User
        if "User_id" in request.session:
            User_id = request.session["User_id"]
            User = await User.objects.aget(id=User_id)
            return JsonResponse({"message": "Session already initialized", "session_active": True, 
                                "User_id": User.id}, status=200)

        # Get Clerk user data from the request (assuming Clerk middleware adds this to the request)
        clerk_user = request.clerk_user
        if not clerk_user:
            raise HttpError(401, "User is not authenticated.")

        # Get the Clerk user ID from the Clerk user data
        clerk_user_id = clerk_user.get("id")

        # Find the User using the clerk_id
        User = await User.objects.aget(clerk_id=clerk_user_id)

        # Set up the session for the User
        request.session["User_id"] = User.id

        # Return a success response
        return JsonResponse({"message": "Session initialized", "session_active": True,
                            "User_id": User.id}, status=200)

    except User.DoesNotExist:
        raise HttpError(404, "User not found.")
    except Exception as e:
        logger.error(f"Unexpected error occurred: {e}")
        raise HttpError(500, f"An unexpected error occurred: {e}")


# Session closing Router
@auth_router.post("/close-session/")
async def close_session(request, *args, **kwargs):
    try:
        await sync_to_async(logout)(request)
        return JsonResponse({"message": "User logged out successfully"}, status=200)
    except ValidationError as err:
        raise HttpError(400, f"Validation error occurred: {err}")
    except Exception as e:
        return JsonResponse({"error": f"An unexpected error occurred: {e}"}, status=500)
# =============================================================================================


# User detail router
@auth_router.get("/me/", response={200: GetUserDetailSchema, codes_4xx: dict})
async def get_User_details(request, *args, **kwargs):
    # Get Clerk user data from the request
    clerk_user = request.clerk_user
    if clerk_user:
        try:
            clerk_user_id = clerk_user.get("id")
            User = await User.objects.aget(clerk_id=clerk_user_id)
            serialized_User = await sync_to_async(UserSerializer)(User)
            serialized_data = await sync_to_async(lambda: serialized_User.data)()
            return JsonResponse(serialized_data, status=200)
        except User.DoesNotExist:
            raise HttpError(404, "User not found.")
        except Exception as e:
            logger.error(f"Unexpected error occurred: {e}")
            raise HttpError(500, f"An unexpected error occurred: {e}")
    else:
        raise HttpError(401, "User is not authenticated.")
