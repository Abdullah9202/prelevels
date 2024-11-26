from uuid import UUID
from datetime import datetime
from ninja import Schema
from typing import Optional

# Schema for Category model
class CategorySchema(Schema):
    id: UUID
    name: str
    created_at: Optional[datetime] = None
    updated_at: Optional[datetime] = None
    is_active: bool = True


# Schemas for Course model
class GetCourseDetailSchema(Schema):
    category: CategorySchema
    id: UUID
    name: str
    description: str = None
    additional_details: Optional[str] = None
    image: Optional[str] = None
    whatsapp_link: str = None
    resource_link: str = None
    price: int
    discount: Optional[int] = None
    validity: Optional[int] = None
    created_at: Optional[datetime] = None
    updated_at: Optional[datetime] = None
    is_active: bool = True
    
    class Config:
        from_attributes = True