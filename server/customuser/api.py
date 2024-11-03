# Ninja imports
from ninja_extra import NinjaExtraAPI
# My Files
from .router import auth_router

# API init
api = NinjaExtraAPI(version="1.0.0", urls_namespace="user")

# Including the auth_router form User
api.add_router("", auth_router)
