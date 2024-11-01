from uuid import UUID
from datetime import datetime
from ninja import Schema
from pydantic import field_validator, EmailStr
from typing import Optional
import phonenumbers


# Function to validate the phone number
@field_validator("phone_number")
def phone_number_validator(cls, value):
    try:
        phone = phonenumbers.parse(value, "PK")
        if not phonenumbers.is_valid_number(phone):
            raise ValueError("Invalid phone number")
    except Exception as e:
        raise ValueError("Invalid phone number")
    return value


# Register Schema
class RegisterSchema(Schema):
    first_name: str
    last_name: str
    email: EmailStr
    phone_number: str
    password: str
    
    # Validating the phone number 
    _phone_number_validator = phone_number_validator

# Login Schema
class LoginSchema(Schema):
    phone_number: str
    password: str

# Update Schema
class UpdateSchema(Schema):
    first_name: str
    last_name: str
    email: EmailStr
    username: str
    avatar_url: Optional[str]
    phone_number: str
    password: str

# Question bank, courses and bundle schema
class QuestionBankSchema(Schema):
    id: UUID
    name: str
    description: str
    price: float
    created_at: datetime
    updated_at: datetime


class CourseSchema(Schema):
    id: UUID
    name: str
    description: str
    price: float
    created_at: datetime
    updated_at: datetime


class BundleSchema(Schema):
    id: UUID
    name: str
    description: str
    price: float
    created_at: datetime
    updated_at: datetime


# User Schema
class UserSchema(Schema):
    id: UUID
    # User identity and details
    first_name: str = None
    last_name: str = None
    user_image: str = None
    email: str = None
    username: str
    password: str
    # Authentication status
    is_authenticated: bool = False
    # User buying history
    taking_questionBanks: list[QuestionBankSchema]  = []
    taking_courses: list[CourseSchema] = []
    taking_bundles: list[BundleSchema] = []
    # User creation and update timestamps
    created_at: datetime
    updated_at: datetime


class GetUserDetailSchema(Schema):
    id: UUID
    first_name: str = None
    last_name: str = None
    user_image: Optional[str] = None
    email: str = None
    username: str
    password: str
    is_authenticated: bool = True
    taking_questionBanks: list[QuestionBankSchema]  = []
    taking_courses: list[CourseSchema] = []
    taking_bundles: list[BundleSchema] = []
    created_at: datetime
    updated_at: datetime


# Error Schema
class Error(Schema):
    message: str