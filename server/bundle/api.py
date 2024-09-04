# Ninja imports
from ninja_extra import NinjaExtraAPI
from ninja_jwt.controller import NinjaJWTDefaultController
# My Files
from .schemas import BundleSchema


# API init
api = NinjaExtraAPI(version="1.0.0", urls_namespace="bundle")
# Auth Token
api.register_controllers(NinjaJWTDefaultController)


# Including the router from bundle
api.add_router("", "bundle.router.bundle_router")