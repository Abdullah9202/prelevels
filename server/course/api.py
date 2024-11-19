# Ninja imports
from ninja_extra import NinjaExtraAPI
# My Files
from .router import course_router


# API init
course_api = NinjaExtraAPI(version="1.0.0", urls_namespace="course")

# Including the router from course
course_api.add_router("", course_router)
