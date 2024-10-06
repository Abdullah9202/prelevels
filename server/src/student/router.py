# Python imports
import os
import jwt
import logging
from pathlib import Path
import json
from uuid import UUID
from dotenv import load_dotenv
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
from student.models import Student
from .schemas import (
    QuestionBankSchema, CourseSchema, BundleSchema, StudentSchema,
    RegisterSchema, GetStudentDetailSchema, HelloSchema
)
from .serializers import StudentSerializer

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


# Register Router
@auth_router.post("/register/", response={200: RegisterSchema, codes_4xx: dict})
async def register_student(request, payload: RegisterSchema, *args, **kwargs):
    logger.info(f"Registering student with data: {payload.dict()}")

    try:
        # Checking for existing user
        if await Student.objects.filter(email=payload.email).aexists():
            logger.warning("Registration failed: Email already exists.")
            raise HttpError(400, "Email address is already in use.")
        if await Student.objects.filter(username=payload.username).aexists():
            logger.warning("Registration failed: Username already exists.")
            raise HttpError(400, "Username is already taken.")
        if await Student.objects.filter(phone_number=payload.phone_number).aexists():
            logger.warning("Registration failed: Phone number already exists.")
            raise HttpError(400, "Phone number is already registered.")

        # Using the serializer to validate the input data
        serializer = StudentSerializer(data=payload.dict())
        if not serializer.is_valid():
            logger.error(f"Validation error: {serializer.errors}")
            raise HttpError(400, "Invalid input data.")

        # Hashing the password
        hashed_password = make_password(payload.password)

        # Registering the new student
        new_student = Student(
            clerk_id=payload.clerk_id,
            first_name=payload.first_name,
            last_name=payload.last_name,
            email=payload.email,
            username=payload.username,
            avatar_url=payload.avatar_url,
            password=hashed_password,
        )
        await new_student.asave()

        # Serializing the newly created student and returning it
        serialized_student = StudentSerializer(new_student)
        return JsonResponse(serialized_student.data)

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
        return JsonResponse({"error": f"An unexpected error occurred. Please try again later"}, status=500)


# Update Student Router
@auth_router.put("/update/", response={200: StudentSchema, codes_4xx: dict, codes_5xx: dict})
async def update_student(request, *args, **kwargs):
    try:
        # Geting Clerk user data from the request
        clerk_user = request.clerk_user
        if not clerk_user:
            raise HttpError(401, "User is not authenticated.")

        # Geting the Clerk user ID from the Clerk user data
        clerk_user_id = clerk_user.get("id")

        # Finding the student using the clerk_id
        student = await Student.objects.aget(clerk_id=clerk_user_id)

        # Updating student details with the data from Clerk
        student.first_name = clerk_user.get("first_name", student.first_name)
        student.last_name = clerk_user.get("last_name", student.last_name)
        student.email = clerk_user.get("email", student.email)
        student.username = clerk_user.get("username", student.username)
        student.avatar_url = clerk_user.get("avatar_url", student.avatar_url)
        student.phone_number = clerk_user.get("phone_number", student.phone_number)
        student.password = clerk_user.get("password", student.password)

        # Saving the updated student details
        await student.asave()

        # Serializing the updated student details
        serialized_student = StudentSerializer(student).data

        # Return the serialized data
        return JsonResponse(serialized_student, status=200)

    except Student.DoesNotExist:
        raise HttpError(404, "Student not found.")
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
        # Check if a session already exists for the student
        if "student_id" in request.session:
            student_id = request.session["student_id"]
            student = await Student.objects.aget(id=student_id)
            return JsonResponse({"message": "Session already initialized", "student_id": student.id}, status=200)

        # Get Clerk user data from the request (assuming Clerk middleware adds this to the request)
        clerk_user = request.clerk_user
        if not clerk_user:
            raise HttpError(401, "User is not authenticated.")

        # Get the Clerk user ID from the Clerk user data
        clerk_user_id = clerk_user.get("id")

        # Find the student using the clerk_id
        student = await Student.objects.aget(clerk_id=clerk_user_id)

        # Set up the session for the student
        request.session["student_id"] = student.id

        # Return a success response
        return JsonResponse({"message": "Session initialized", "session_active": True, 
                            "student_id": student.id}, status=200)

    except Student.DoesNotExist:
        raise HttpError(404, "Student not found.")
    except Exception as e:
        logger.error(f"Unexpected error occurred: {e}")
        raise HttpError(500, f"An unexpected error occurred: {e}")


# Session closing Router
@auth_router.post("/close-session/")
async def close_session(request, *args, **kwargs):
    try:
        logout(request)
        return JsonResponse({"message": "Student logged out successfully"}, status=200)
    except ValidationError as err:
        raise HttpError(400, f"Validation error occured: {err}")
    except Exception as e:
        return JsonResponse({"error": f"An unexpected error occured: {e}"}, status=500)
# =============================================================================================


# Student detail router
@auth_router.get("/me/", response={200: GetStudentDetailSchema, codes_4xx: dict})
async def get_student_details(request, *args, **kwargs):
    # Get Clerk user data from the request
    clerk_user = request.clerk_user
    if clerk_user:
        try:
            # Fetch the student using the clerk_id
            student = await Student.objects.aget(clerk_id=clerk_user['id'])
            # Serialize student details
            serialized_student = StudentSerializer(student).data
            # Return the serialized data
            return JsonResponse(serialized_student, status=200)
        except Student.DoesNotExist:
            raise HttpError(404, "Student not found.")
        except Exception as e:
            return JsonResponse({"error": f"Unexpected error: {e}"}, status=500)
    else:
        raise HttpError(401, "User is not authenticated.")
