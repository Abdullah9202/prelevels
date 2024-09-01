from ninja_extra import NinjaExtraAPI
from ninja_jwt.controller import NinjaJWTDefaultController
# My files
from .schemas import (
    StudentSchema, Error
)
from .router import auth_router


# API init
api = NinjaExtraAPI(version="1.0.0", urls_namespace="student")
# Auth Token
api.register_controllers(NinjaJWTDefaultController)


# Including the auth_router form Student
api.add_router("", auth_router)