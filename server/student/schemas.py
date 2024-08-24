from uuid import UUID
from datetime import datetime
from ninja import Schema


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
    taking_questionBanks: list = []
    taking_courses: list = []
    taking_bundles: list = []
    # Student creation and update timestamps
    timestamp: datetime
    updated_at: datetime


# Error Schema
class Error(Schema):
    message: str