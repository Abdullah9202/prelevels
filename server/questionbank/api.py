# Django imports
# Ninja imports
from ninja_extra import NinjaExtraAPI
from ninja_jwt.controller import NinjaJWTDefaultController
# My Files
from .schemas import (
    QuestionBankSchema, QuestionSchema, DetailedQuestionBankSchema,
    DetailedQuestionSchema
)


# API init
api = NinjaExtraAPI(version="1.0.0", urls_namespace="questionbank")
# Auth Token
api.register_controllers(NinjaJWTDefaultController)


# Including the router from question bank
api.add_router("", "questionbank.router.question_bank_router")