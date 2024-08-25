from uuid import UUID
from datetime import datetime
from ninja import Schema
from typing import Optional

# Schema for Course model
class CourseSchema(Schema):
    id: UUID
    name: str
    description: Optional[str]
    additional_details: Optional[str]
    price: Optional[float]
    validity: Optional[int]
    created_at: datetime
    updated_at: datetime
    is_active: bool