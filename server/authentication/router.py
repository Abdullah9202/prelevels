from ninja import Router
from django.contrib.auth import authenticate, login, logout
from django.contrib.auth.models import User
from ninja.errors import HttpError
from django.http import JsonResponse
from django.contrib.auth.hashers import make_password
from django.contrib.auth import get_user_model
# My Files
from .schemas import RegisterSchema, LoginSchema


# Getting the custom user model
User = get_user_model()

# Router init
auth_router = Router()


# Login Router
@auth_router.post("/login/")
def login_user(request, payload: LoginSchema):
    user = authenticate(request, phone_number=payload.phone_number, password=payload.password)
    # Validation for user
    if user is not None:
        login(request)
        return JsonResponse({"message": "Login Successful"})
    else:
        raise HttpError(401, "Invalid login details")


# Logout Router
@auth_router.post("/logout/")
def logout_user(request):
    logout(request)
    return JsonResponse({"message": "Logged out successfully"})


# Register Router
@auth_router.post("/register/")
def register_user(request, payload: RegisterSchema):
    # Validation for username
    if User.objects.filter(username=payload.username).exists():
        raise HttpError(400, "Username already exists")
    # Validation for email
    if User.objects.filter(email=payload.email).exists():
        raise HttpError(400, "Email already exists")
    # Validation for phone number
    if User.objects.filter(phone_number=payload.phone_number).exists():
        raise HttpError(400, "Phone number already exists")
    
    # Hashing the password
    hashed_password = make_password(payload.password)
    
    # Creating the new user
    new_user = User(
        first_name = payload.first_name,
        last_name = payload.last_name,
        username = payload.username,
        email = payload.email,
        phone_number = payload.phone_number,
        password = hashed_password,
    )
    new_user.save()
    return JsonResponse({"message": "User registered successfully"})