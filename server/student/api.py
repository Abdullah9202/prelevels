from ninja import NinjaAPI

# API init
api = NinjaAPI()

# Test function
@api.get("/hello")
def hello(request):
    return {"message": "Hello World!"}


# Student
@api.get("/")
def student(request):
    return {"message": "Student API"}