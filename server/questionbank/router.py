# Python imports
import logging
from uuid import UUID
from typing import List
# Django imports
from django.http import JsonResponse
from django.shortcuts import get_object_or_404
# Ninja Imports
from ninja import Router
from ninja.errors import HttpError
from ninja_jwt.authentication import JWTAuth
from ninja.responses import codes_4xx
# My Files
from .models import QuestionBank
from .schemas import QuestionBankSchema, QuestionBankDetailSchema
from .serializers import QuestionBankSerializer


# Router Init
question_bank_router = Router()

# Set up logging
logger = logging.getLogger(__name__)

# Get all question banks router
@question_bank_router.get("", response={200: List[QuestionBankSchema], codes_4xx: dict}, auth=JWTAuth())
def get_all_question_banks(request, *args, **kwargs):
    try:
        # Getting all question banks
        question_banks = QuestionBank.objects.all()
        # Serializing the question banks
        serialized_question_banks = QuestionBankSerializer(question_banks, many=True).data
        # # Returning the Json data
        return JsonResponse(serialized_question_banks, status=200, safe=False) # It will return the empty list if DB doesn't contains any question bank
    except HttpError as err:
        logger.error(f"HttpError: {err}")
        raise err
    except Exception as err:
        logger.error(f"Unexpected error: {str(err)}")
        raise HttpError(500, "An unexpected error occurred. Please try again later.")


# Get question bank details router
@question_bank_router.get("/{question_bank_id}", response={200: QuestionBankDetailSchema, codes_4xx: dict}, auth=JWTAuth())
def get_question_bank_details(request, question_bank_id: UUID, *args, **kwargs):
    try:
        # Getting the question bank
        question_bank = get_object_or_404(QuestionBank, id=question_bank_id)
        # Serializing the question bank
        serialized_question_bank = QuestionBankSerializer(question_bank).data
        # Returning the Json data
        return JsonResponse(serialized_question_bank, status=200)
    except HttpError as err:
        logger.error(f"HttpError: {err}")
        raise err
    except Exception as err:
        logger.error(f"Unexpected error: {str(err)}")
        raise HttpError(500, "An unexpected error occurred. Please try again later.")