from ninja_extra import NinjaExtraAPI

# API init
api = NinjaExtraAPI(version="1.0.0", urls_namespace="student") # AZAK > Test CSRF in API routes

# Including the auth_router form Student
api.add_router("", "student.router.auth_router")
