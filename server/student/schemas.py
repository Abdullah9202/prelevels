from uuid import UUID
from datetime import datetime
from ninja import Schema


# Question bank, courses and bundle schema
class QuestionBankSchema(Schema):
    id: UUID
    name: str
    description: str
    price: float
    timestamp: datetime
    updated_at: datetime


class CourseSchema(Schema):
    id: UUID
    name: str
    description: str
    price: float
    timestamp: datetime
    updated_at: datetime


class BundleSchema(Schema):
    id: UUID
    name: str
    description: str
    price: float
    timestamp: datetime
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
    timestamp: datetime
    updated_at: datetime


# Error Schema
class Error(Schema):
    message: str