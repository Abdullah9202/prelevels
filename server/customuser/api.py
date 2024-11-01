from ninja_extra import NinjaExtraAPI

# API init
api = NinjaExtraAPI(version="1.0.0", urls_namespace="user")

# Including the auth_router form User
api.add_router("", "customuser.router.auth_router")
