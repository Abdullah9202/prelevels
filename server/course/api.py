# Ninja imports
from ninja_extra import NinjaExtraAPI
# My Files
from .router import course_router


# API init
api = NinjaExtraAPI(version="1.0.0", urls_namespace="course", csrf=True)

# Including the router from course
api.add_router("", course_router)
