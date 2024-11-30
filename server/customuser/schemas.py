# Python imports
from uuid import UUID
from datetime import datetime
from pydantic import field_validator, EmailStr
from typing import Optional
import phonenumbers
# Ninja imports
from ninja import Schema


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
    username: Optional[str] = None
    email: EmailStr
    phone_number: str
    password: str
    
    # Validating the phone number 
    _phone_number_validator = phone_number_validator


# Login Schema
class LoginSchema(Schema):
    phone_number: str
    password: str
    
    # Validating the phone number 
    _phone_number_validator = phone_number_validator


# Update Schema
class UpdateSchema(Schema):
    first_name: str
    last_name: str
    email: EmailStr
    username: str
    avatar_url: Optional[str]
    phone_number: str
    password: str
    
    # Validating the phone number 
    _phone_number_validator = phone_number_validator


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
    first_name: str
    last_name: str
    image: Optional[str] = None
    email: str
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
    
    class Config:
        from_attributes = True


# Error Schema
class Error(Schema):
    message: str