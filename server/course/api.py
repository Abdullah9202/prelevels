from ninja_extra import NinjaExtraAPI

# API init
api = NinjaExtraAPI(version="1.0.0", urls_namespace="course")

# Including the router from course
api.add_router("", "course.router.course_router")
