from ninja import NinjaAPI
# My files
from .schemas import (
    StudentSchema
)

# API init
api = NinjaAPI()


# Student
@api.get("/")
def student(request):
    return {"message": "Student API"}