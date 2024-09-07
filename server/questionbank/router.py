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
from .models import (
    QuestionBank, Question
)
from .schemas import (
    QuestionBankSchema, QuestionBankDetailSchema, QuestionSchema, QuestionDetailSchema,
    OptionSchema, WhyCorrectOptionSchema
)
from .serializers import QuestionBankSerializer


# Router Init
question_bank_router = Router()

# Set up logging
logger = logging.getLogger(__name__)

# Get all question banks
@question_bank_router.get("/", response={200: List[QuestionBankSchema], codes_4xx: dict}, auth=JWTAuth())
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


# Get the details of specific Question bank
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


# Get all questions in a question bank
@question_bank_router.get("/{question_bank_id}/all-questions/", response={200: QuestionSchema, codes_4xx: dict}, auth=JWTAuth())
def get_questions_in_question_bank(request, question_bank_id, *args, **kwargs):
    # Getting the question banks using id
    question_bank = get_object_or_404(QuestionBank, id=question_bank_id)

    # Getting the questions along with their options and why correct option from question bank
    questions = Question.objects.filter(question_bank=question_bank).prefetch_related('options', 'options__why_correct_option')

    # Creating a list of questions with option and why correct option
    detailed_question = []
    for question in questions:
        options = []
        for option in question.options.all():
            why_correct = None
            if option.why_correct_option:
                why_correct = WhyCorrectOptionSchema.from_orm(option.why_correct_option).dict()
            options.append(OptionSchema.from_orm(option).dict() | {"why_correct_option": why_correct})
        
        detailed_question.append(QuestionDetailSchema.from_orm(question).dict() | {"options": options})
    
    # Structuring the response data
    response_data = {
        "id": str(question_bank.id), 
        "name": question_bank.name, 
        "question_bank_image": question_bank.question_bank_image.url if question_bank.question_bank_image else None,
        "description": question_bank.description,
        "additional_details": question_bank.additional_details,
        "price": question_bank.price,
        "discount": question_bank.discount,
        "validity": question_bank.validity,
        "created_at": question_bank.created_at,
        "updated_at": question_bank.updated_at,
        "is_active": question_bank.is_active,
        "questions": detailed_question,
    }

    return JsonResponse(response_data)


# Get the detils for specific question in a question bank
@question_bank_router.get("/{question_bank_id}/question/{question_id}", response={200: QuestionDetailSchema, 
                                                                                codes_4xx: dict}, auth=JWTAuth())
def get_question_in_question_bank(request, question_bank_id, question_id, *args, **kwargs):
    # Getting the question bank using id
    question_bank = get_object_or_404(QuestionBank, id=question_bank_id)
    # Getting the specific question along with it's options and why correct option from question bank
    question = get_object_or_404(Question, id=question_id, question_bank=question_bank)

    # Question with option and it's why correct option
    options = []
    for option in question.options.all():
        why_correct = None
        if option.why_correct_option:
            why_correct = WhyCorrectOptionSchema.from_orm(option.why_correct_option).dict()
        options.append(OptionSchema.from_orm(option).dict() | {"why_correct_option": why_correct})

    
    # Structuring the response data
    response_data = {
        "id": str(question.id),
        "question_bank_id": str(question_bank.id),
        "year": question.year,
        "category": question.category,
        "subject": question.subject,
        "topic": question.topic,
        "question_number": question.question_number,
        "question_text": question.question_text,
        "question_image": question.question_image.url if question.question_image else None,
        "additional_details": question.additional_details,
        "unique_identifier": question.unique_identifier,
        "created_at": question.created_at,
        "updated_at": question.updated_at,
        "is_active": question.is_active,
        "options": options,
    }
    
    return JsonResponse(response_data)
