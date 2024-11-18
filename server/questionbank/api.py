# Ninja Extra imports
from ninja_extra import NinjaExtraAPI
# Ninja Jwt imports
from ninja_jwt.controller import NinjaJWTDefaultController
# My Files
from .router import question_bank_router


# API init
api = NinjaExtraAPI(version="1.0.0", urls_namespace="questionbank")

# Registering the controller
api.register_controllers(NinjaJWTDefaultController)

# Including the router from question bank
api.add_router("", question_bank_router)
