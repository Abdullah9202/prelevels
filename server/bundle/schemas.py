from uuid import UUID
from datetime import datetime
from ninja import Schema
from typing import Optional


# Schema for Category mode
class CategorySchema(Schema):
    id: UUID
    name: str
    created_at: Optional[datetime] = None
    updated_at: Optional[datetime] = None
    is_active: bool = True


# Schema for Bundle model
class BundleSchema(Schema):
    category: CategorySchema
    id: UUID
    name: str
    description: Optional[str] = None
    additional_details: Optional[str] = None
    price: int
    discount: Optional[int] = None
    validity: Optional[int] = None
    created_at: Optional[datetime] = None
    updated_at: Optional[datetime] = None
    is_active: bool = True

    class Config:
        from_attributes = True