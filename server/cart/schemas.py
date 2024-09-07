from ninja import Schema

class CartItemSchema(Schema):
    product_id: int
    quantity: int

class CartResponseSchema(Schema):
    id: int
    product_id: int
    product_name: str
    quantity: int
    created_at: str
