from uuid import UUID
from datetime import datetime
from ninja import Schema
from pydantic import field_validator, EmailStr
import phonenumbers


# Function to validate the phone number
@field_validator("phone_number")
def phone_number_validator(cls, value):
    try:
        phone = phonenumbers.parse(value, None)
        if not phonenumbers.is_valid_number(phone):
            raise ValueError("Invalid phone number")
    except Exception as e:
        raise ValueError("Invalid phone number")
    return value


# Login Schema
class LoginSchema(Schema):
    phone_number: str
    password: str 
    
    # Validating the phone number 
    _phone_number_validator = phone_number_validator


# Register Schema
class RegisterSchema(Schema):
    first_name: str
    last_name: str
    username: str
    email: EmailStr
    phone_number: str
    password: str
    is_authenticated: bool = False
    
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


# Student Schema
class StudentSchema(Schema):
    id: UUID
    # Student identity and details
    first_name: str = None
    last_name: str = None
    email: str = None
    username: str
    password: str
    # Authentication status
    is_authenticated: bool = False
    # Student buying history
    taking_questionBanks: list[QuestionBankSchema]  = []
    taking_courses: list[CourseSchema] = []
    taking_bundles: list[BundleSchema] = []
    # Student creation and update timestamps
    created_at: datetime
    updated_at: datetime


# Error Schema
class Error(Schema):
    message: str