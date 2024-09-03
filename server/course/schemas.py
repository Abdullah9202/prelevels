from uuid import UUID
from datetime import datetime
from ninja import Schema, File
from typing import Optional

# Schema for Course model
class CourseSchema(Schema):
    id: UUID
    name: str = None
    description: Optional[str] = None
    additional_details: Optional[str] = None
    course_image: Optional[File] = None
    whatsapp_link: str = None
    resource_link: str = None
    price: Optional[float] = None
    discount: Optional[int] = None
    validity: Optional[int] = None
    created_at: datetime
    updated_at: datetime
    is_active: bool = True
