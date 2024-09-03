from django.contrib.auth import authenticate, login, logout
from django.http import JsonResponse
from django.contrib.auth.hashers import make_password, check_password
# Ninja Imports
from ninja import Router
from ninja.errors import HttpError
from ninja_jwt.authentication import JWTAuth
from ninja.responses import codes_4xx
# My Files
from student.models import Student
from .schemas import (
    QuestionBankSchema, CourseSchema, BundleSchema, StudentSchema,
    LoginSchema, RegisterSchema,
)
from .serializers import StudentSerializer


# Router Init
auth_router = Router()


# Hello Router (Test Router)
@auth_router.get("/hello", response={200: dict, codes_4xx: dict}, auth=JWTAuth())
def hello(request):
    print(request)
    return {"message": "Hello World!"}


# Login Router
@auth_router.post("/login", response={200: LoginSchema, codes_4xx: dict}, auth=JWTAuth())
def login_student(request, payload: LoginSchema):
    try:
        # Fetching the student
        student = Student.objects.get(phone_number=payload.phone_number)
        # Checking the password
        if check_password(payload.password, student.password):
            # Login the student
            login(request, student)
            return JsonResponse({"message": "Student logged in successfully"})
        else:
            raise HttpError(401, "Incorrect password")
    except Student.DoesNotExist:
        raise HttpError(401, "Student doesn't exists")


# Logout Router
@auth_router.post("/logout", auth=JWTAuth())
def logout_student(request):
    logout(request)
    return JsonResponse({"message": "Student logged out successfully"})


# Register Router
@auth_router.post("/register", response={200: RegisterSchema, codes_4xx: dict}, auth=JWTAuth())
def register_student(request, payload: RegisterSchema):
    # Using the serializer to validate the input data
    serializer = StudentSerializer(data=payload.dict())
    if not serializer.is_valid():
        raise HttpError(400, serializer.errors)
    
    # Checking for existing user
    if Student.objects.filter(email=payload.email).exists():
        raise HttpError(400, "Email already exists")
    if Student.objects.filter(username=payload.username).exists():
        raise HttpError(400, "Username already exists")
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
        is_authenticated = payload.is_authenticated
    )
    new_student.save()
    
    # Serializing the newely created student and returning it
    serialized_student = StudentSerializer(new_student)
    return JsonResponse(serialized_student.data)