from uuid import UUID
from datetime import datetime
from ninja import Schema


# Student Schema
class StudentSchema(Schema):
    id: UUID
    first_name: str
    last_name: str
    email: str
    username: str
    password: str
    created_at: datetime
    updated_at: datetime