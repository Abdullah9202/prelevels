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
    
    # Validating the phone number 
    _phone_number_validator = phone_number_validator