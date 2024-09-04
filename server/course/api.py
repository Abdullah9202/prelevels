from ninja_extra import NinjaExtraAPI
from ninja_jwt.controller import NinjaJWTDefaultController
# My Files
from .schemas import CourseSchema


# API init
api = NinjaExtraAPI(version="1.0.0", urls_namespace="course")
# Auth Token
api.register_controllers(NinjaJWTDefaultController)


# Including the router from course
api.add_router("", "course.router.course_router")
