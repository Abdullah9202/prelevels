# Ninja imports
from ninja_extra import NinjaExtraAPI

# API init
api = NinjaExtraAPI(version="1.0.0", urls_namespace="questionbank")

# Including the router from question bank
api.add_router("", "questionbank.router.question_bank_router")