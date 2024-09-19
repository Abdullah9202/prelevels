# Python imports
import logging
from uuid import UUID
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
from ninja.responses import codes_4xx
# My Files
from student.models import Student
from .schemas import (
    QuestionBankSchema, CourseSchema, BundleSchema, StudentSchema,
    LoginSchema, RegisterSchema, GetStudentDetailSchema, HelloSchema
)
from .serializers import StudentSerializer


# Router Init
auth_router = Router()

# Set up logging
logger = logging.getLogger(__name__)


# Test route
@auth_router.get("/hello/", response={200: HelloSchema, codes_4xx: dict})
def hello(request, *args, **kwargs):
    return JsonResponse({"msg": "Hello World!"}, status=200)


# Register Router
@auth_router.post("/register/", response={200: RegisterSchema, codes_4xx: dict})
def register_student(request, payload: RegisterSchema, *args, **kwargs):
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


# AZAK
# Login and logout are being managed by Clerk ()
# =============================================================================================
# Login Router
@auth_router.post("/login/", response={200: LoginSchema, codes_4xx: dict})
def login_student(request, *args, **kwargs):
    # Getting Clerk user data from the request
    clerk_user = request.clerk_user  
    if clerk_user:
        try:
            student = get_object_or_404(Student, clerk_id=clerk_user['id'])
            login(request, student)  # Django login to attach the session
            return JsonResponse({"message": "Student logged in successfully"}, status=200)
        except Student.DoesNotExist:
            raise HttpError(401, "Student does not exist.")
        except Exception as e:
            return JsonResponse({"error": f"Unexpected error: {e}"}, status=500)
    else:
        raise HttpError(401, "User is not authenticated.")


# Logout Router
@auth_router.post("/logout/")
def logout_student(request, *args, **kwargs):
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
def get_student_details(request, *args, **kwargs):
    # Get Clerk user data from the request
    clerk_user = request.clerk_user
    if clerk_user:
        try:
            # Fetch the student using the clerk_id
            student = get_object_or_404(Student, clerk_id=clerk_user['id'])
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
