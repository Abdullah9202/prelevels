from ninja import NinjaAPI
# My Files
from .schemas import HelloSchema

# API init
api = NinjaAPI()



@api.get("/hello")
def hello(request):
    return {"message": "Hello World!"}


@api.post("/hello2") # Create the 405 error
def hello2(request, data: HelloSchema):
    return {"message": f"Hello {data.name}"}