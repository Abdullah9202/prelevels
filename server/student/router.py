from django.contrib.auth import authenticate, login, logout
from django.http import JsonResponse
from django.contrib.auth.hashers import make_password
from ninja import Router
from ninja.errors import HttpError
from ninja_jwt.authentication import JWTAuth
# My Files
from student.models import Student
from .schemas import (
    QuestionBankSchema, CourseSchema, BundleSchema, StudentSchema,
    LoginSchema, RegisterSchema,
)


# Router Init
auth_router = Router()


# Login Router
@auth_router.post("/login/", response=LoginSchema, auth=JWTAuth())
def login_student(request, payload: LoginSchema):
    # Authenticating
    student = authenticate(request, phone_number=payload.phone_number, password=payload.password)
    # Validation 
    if student is not None:
        login(student)
        return JsonResponse({"message": "Student logged in successfully"})
    else:
        raise HttpError(401, "Login failed")


# Logout Router
@auth_router.post("/logout/", auth=JWTAuth())
def logout_student(request):
    logout(request)
    return JsonResponse({"message": "Student logged out successfully"})


# Register Router
@auth_router.post("/register/", response=RegisterSchema, auth=JWTAuth())
def register_student(request, payload: RegisterSchema):
    # Validation for email
    if Student.objects.filter(email=payload.email).exists():
        raise HttpError(400, "Email already exists")
    # Validation for username
    if Student.objects.filter(username=payload.username).exists():
        raise HttpError(400, "Username already exists")
    # Validation for phone number
    if Student.objects.filter(phone_number=payload.phone_number).exists():
        raise HttpError(400, "Phone number already exists")
    
    # Hashing the password
    hashed_password = make_password(payload.password)
    
    # Registering the new student
    new_student = Student(
        first_name = payload.first_name,
        last_name = payload.last_name,
        email = payload.email,
        username = payload.username,
        phone_number = payload.phone_number,
        password = hashed_password,
    )
    new_student.save()
    return JsonResponse({"message": "Student registered successfully"})