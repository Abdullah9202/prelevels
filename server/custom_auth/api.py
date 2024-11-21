# Django Imports
from django.contrib.auth import authenticate
# Ninja Imports
from ninja import Schema
from ninja.errors import HttpError
# Ninja Extra Imports
from ninja_extra import NinjaExtraAPI
from ninja_jwt.tokens import RefreshToken
from ninja_jwt.controller import NinjaJWTDefaultController
# My Files
from customuser.backends import PhoneNumberBackend

auth_api = NinjaExtraAPI(version="1.0.0", urls_namespace="auth")

class PhoneNumberAuthSchema(Schema):
    phone_number: str
    password: str

class CustomNinjaJWTController(NinjaJWTDefaultController):
    def obtain_token(self, request, data: PhoneNumberAuthSchema):
        user = authenticate(request, phone_number=data.phone_number, password=data.password)
        if user is None:
            raise HttpError(401, "Invalid phone number or password.")
        
        refresh = RefreshToken.for_user(user)
        access_token = str(refresh.access_token)
        refresh_token = str(refresh)
        
        return {
            "access": access_token,
            "refresh": refresh_token,
        }

# Registering custom JWT Controller
auth_api.register_controllers(CustomNinjaJWTController)

# Adding the endpoint to the API
@auth_api.post("/my-token/pair", response={200: dict})
def obtain_token(request, data: PhoneNumberAuthSchema):
    controller = CustomNinjaJWTController()
    return controller.obtain_token(request, data)
