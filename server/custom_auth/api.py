from ninja_extra import NinjaExtraAPI
from ninja_jwt.controller import NinjaJWTDefaultController

auth_api = NinjaExtraAPI(version="1.0.0", urls_namespace="auth")

# Registering JWT Controller
auth_api.register_controllers(NinjaJWTDefaultController)