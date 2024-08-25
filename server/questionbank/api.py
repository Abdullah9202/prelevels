from ninja import NinjaAPI
# My Files
from .schemas import (
    QuestionBankSchema, QuestionSchema, DetailedQuestionBankSchema,
    DetailedQuestionSchema
)


# API init
api = NinjaAPI(version="1.0.0", urls_namespace="questionbank")