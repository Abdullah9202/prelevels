from ninja import Schema


# Hello Schema
class HelloSchema(Schema):
    name: str = "world"