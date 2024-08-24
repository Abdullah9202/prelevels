from ninja import NinjaAPI
# My files
from .schemas import (
    StudentSchema, Error
)

# API init
api = NinjaAPI(version="1.0.0", urls_namespace="student")


# Student
@api.get("/", response={200: StudentSchema, 403: Error})
def student(request):
    if not request.user.is_authenticated:
        return 403, {"message": "Access Denied"}
    return request.user 