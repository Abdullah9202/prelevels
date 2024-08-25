from ninja import NinjaAPI
# My Files
from .schemas import HelloSchema

# API init
api = NinjaAPI(version="1.0.0", urls_namespace="hello")



@api.get("")
def hello(request):
    return {"message": "Hello World!"}


@api.post("/hello2") # Create the 405 error
def hello2(request, data: HelloSchema):
    return {"message": f"Hello {data.name}"}