from ninja import Schema
from uuid import UUID

class CartItemSchema(Schema):
    product_id: UUID
    product_model: str
    quantity: int

class CartResponseSchema(Schema):
    id: UUID
    product_id: UUID
    product_name: str
    quantity: int
    created_at: str
