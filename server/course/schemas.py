from uuid import UUID
from datetime import datetime
from ninja import Schema
from typing import Optional

# Schemas for Course model
class GetCourseDetailSchema(Schema):
    id: UUID
    name: str
    description: str = None
    additional_details: Optional[str] = None
    course_image: Optional[str] = None
    whatsapp_link: str = None
    resource_link: str = None
    price: float = None
    discount: Optional[int] = None
    validity: Optional[int] = None
    created_at: Optional[datetime] = None
    updated_at: Optional[datetime] = None
    is_active: bool = True


class GetCourseListSchema(Schema):
    id: UUID
    name: str
    description: str = None
    additional_details: Optional[str] = None
    course_image: Optional[str] = None
    whatsapp_link: str = None
    resource_link: str = None
    price: float = None
    discount: Optional[int] = None
    validity: Optional[int] = None
    created_at: Optional[datetime] = None
    updated_at: Optional[datetime] = None
    is_active: bool = True