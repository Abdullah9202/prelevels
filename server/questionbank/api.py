# Ninja imports
from ninja_extra import NinjaExtraAPI
# My Files
from .router import question_bank_router


# API init
api = NinjaExtraAPI(version="1.0.0", urls_namespace="questionbank", csrf=True)

# Including the router from question bank
api.add_router("", question_bank_router)
