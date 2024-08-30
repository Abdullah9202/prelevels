from ninja import NinjaAPI
# My Files
from .router import auth_router

# API Init
api = NinjaAPI(version="1.0.0", urls_namespace="authentication")

# Including the auth_router
api.add_router("/auth/", auth_router)