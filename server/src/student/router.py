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
        if Student.objects.filter(email=payload.email).exists():
            logger.warning("Registration failed: Email already exists.")
            raise HttpError(400, "Email address is already in use.")
        if Student.objects.filter(username=payload.username).exists():
            logger.warning("Registration failed: Username already exists.")
            raise HttpError(400, "Username is already taken.")
        if Student.objects.filter(phone_number=payload.phone_number).exists():
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
            phone_number=payload.phone_number,
            password=hashed_password,
        )
        new_student.save()
        
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
        logger.error(f"Unexpected error: {str(err)}")
        return JsonResponse({"error": f"An unexpected error occurred. Please try again later"}, status=500)


# Update Student Router
# @auth_router.put("/update/", response={200: StudentSchema, codes_4xx: dict})


# AZAK
# Login and logout are being managed by Clerk
# =============================================================================================
# Session init Router
# V1
@auth_router.post("/init-session/", response={200: dict, codes_4xx: dict, codes_5xx: dict})
async def init_session(request, *args, **kwargs):
    try:
        # Getting the public key from .env
        CLERK_PUBLIC_KEY = os.getenv("CLERK_PEM_PUBLIC_KEY")

        # Ensure the public key is valid
        if not CLERK_PUBLIC_KEY.startswith("-----BEGIN PUBLIC KEY-----"):
            raise ValueError("Invalid public key format.")

        # Auth header
        auth_header = request.headers.get('Authorization')
        if not auth_header or not auth_header.startswith('Bearer '):
            raise HttpError(401, "Authorization header is missing or invalid.")

        token = auth_header.split(' ')[1]  # Extract the token from the header

        # Decode the token using the public key from the PEM file
        decode_token = jwt.decode(token, CLERK_PUBLIC_KEY, algorithms=['RS256'])

        # Get the Clerk user ID from the decoded token
        clerk_user_id = decode_token.get("sub")

        # Find the student using the clerk_id
        student = await Student.objects.aget(clerk_id=clerk_user_id)

        # Set up the session for the student
        request.session["student_id"] = student.id

        # Return a success response
        return JsonResponse({"message": "Session initialized", "student_id": student.id}, status=200)

    except jwt.ExpiredSignatureError:
        raise HttpError(401, "Token has expired.")
    except jwt.InvalidTokenError:
        raise HttpError(401, "Invalid token.")
    except Student.DoesNotExist:
        raise HttpError(404, "Student not found.")
    except Exception as e:
        logger.error(f"Unexpected error occurred: {e}")
        raise HttpError(500, f"An unexpected error occurred: {e}")

# V2
# @auth_router.post("/init-session/", response={200: dict, codes_4xx: dict, codes_5xx: dict})
# async def init_session(request, *args, **kwargs):
#     try:
#         # Check if a session already exists for the student
#         if "student_id" in request.session:
#             student_id = request.session["student_id"]
#             student = await Student.objects.aget(id=student_id)
#             return JsonResponse({"message": "Session already initialized", "student_id": student.id}, status=200)

#         # Get Clerk user data from the request (assuming Clerk middleware adds this to the request)
#         clerk_user = request.clerk_user
#         if not clerk_user:
#             raise HttpError(401, "User is not authenticated.")

#         # Get the Clerk user ID from the Clerk user data
#         clerk_user_id = clerk_user.get("id")

#         # Find the student using the clerk_id
#         student = await Student.objects.aget(clerk_id=clerk_user_id)

#         # Set up the session for the student
#         request.session["student_id"] = student.id

#         # Return a success response
#         return JsonResponse({"message": "Session initialized", "student_id": student.id}, status=200)

#     except Student.DoesNotExist:
#         raise HttpError(404, "Student not found.")
#     except Exception as e:
#         logger.error(f"Unexpected error occurred: {e}")
#         raise HttpError(500, f"An unexpected error occurred: {e}")


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
