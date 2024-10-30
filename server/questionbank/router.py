# Python imports
import json
import logging
from uuid import UUID
from typing import List
import asyncio
from asgiref.sync import sync_to_async
# Django imports
from django.db.models import Count
from django.http import JsonResponse
from django.shortcuts import get_object_or_404
# Ninja Imports
from ninja import Router
from ninja.errors import HttpError
from ninja.responses import codes_4xx
# My Files
from .models import (
    QuestionBank, Question
)
from .schemas import (
    QuestionBankSchema, QuestionBankDetailSchema, QuestionSchema, QuestionDetailSchema,
    OptionSchema, WhyCorrectOptionSchema, SaveQuestionSchema, ReportQuestionSchema,
)
from .serializers import (
    QuestionBankSerializer, ReportSerializer, SaveQuestionSerializer,
)


# Router Init
question_bank_router = Router()

# Set up logging
logger = logging.getLogger(__name__)


# Get all question banks
@question_bank_router.get("/", response={200: List[QuestionBankSchema], codes_4xx: dict}) # auth=django_auth
async def get_all_question_banks(request, *args, **kwargs):
    # Checking if the user is logged in or not
    if not request.user.is_authenticated:
        raise HttpError(401, "User is not authenticated")

    try:
        # Fetching all question banks with question count annotation
        question_banks = await sync_to_async(
            lambda: QuestionBank.objects.annotate(question_count=Count("questions")).all()
        )()
    
        # Serializing the question banks
        serialized_question_banks = await sync_to_async(
            lambda: QuestionBankSerializer(question_banks, many=True).data
        )()

        # Returning the Json data
        return JsonResponse(serialized_question_banks, status=200, safe=False)
    
    except Exception as e:
        logger.error(f"Unexpected error: {str(e)}")
        raise HttpError(500, f"An unexpected error occurred. Please try again later. {e}")


# Get the details of specific Question bank
@question_bank_router.get("/{question_bank_id}/", response={200: QuestionBankDetailSchema, codes_4xx: dict}) # auth=django_auth
async def get_question_bank_details(request, question_bank_id: UUID, *args, **kwargs):
    # Checking if the user is logged in or not
    if not request.user.is_authenticated:
        raise HttpError(401, "User is not authenticated")
    
    try:
        # Getting the question bank
        question_bank = await sync_to_async(
            lambda: get_object_or_404(
                QuestionBank.objects.annotate(question_count=Count("questions")),
                id=question_bank_id
            )
        )()
        
        # Serializing the question bank with question_count included
        serialized_question_bank = QuestionBankSerializer(question_bank).data
        
        # Returning the Json data
        return JsonResponse(serialized_question_bank, status=200)
    
    except Exception as e:
        logger.error(f"Unexpected error: {str(e)}")
        raise HttpError(500, "An unexpected error occurred. Please try again later.")


# Get all questions in a question bank
@question_bank_router.get("/{question_bank_id}/all-questions/", response={200: List[QuestionSchema], codes_4xx: dict})
async def get_questions_in_question_bank(request, question_bank_id: UUID, *args, **kwargs):
    # Checking if the user is logged in or not
    if not request.user.is_authenticated:
        raise HttpError(401, "User is not authenticated")
    
    # Getting the question bank using id
    question_bank = await sync_to_async(get_object_or_404)(QuestionBank, id=question_bank_id)

    # Getting the questions along with their options from the question bank
    questions = await sync_to_async(
        lambda: list(Question.objects.filter(
            question_bank=question_bank).select_related('why_correct_option').prefetch_related('options'))
    )()

    # Creating a list of questions with options and why correct option
    detailed_questions = []
    for question in questions:
        options = question.options.all()
        why_correct_option = question.why_correct_option

        detailed_question = {
            "id": str(question.id),
            "question_bank": str(question.question_bank.id),
            "subject": question.subject,
            "topic": question.topic,
            "question_number": question.question_number,
            "question_image": question.question_image.url if question.question_image else None,
            "question_text": question.question_text,
            "additional_details": question.additional_details,
            "unique_identifier": question.unique_identifier,
            "created_at": question.created_at,
            "updated_at": question.updated_at,
            "is_active": question.is_active,
            "options": [
                {
                    "id": str(option.id),
                    "option_text": option.option_text,
                    "option_image": option.option_image.url if option.option_image else None,
                    "is_correct": option.is_correct,
                    "created_at": option.created_at,
                    "updated_at": option.updated_at,
                    "is_active": option.is_active,
                    "question": str(option.question.id)
                } for option in options
            ],
            "why_correct_option": {
                "id": str(why_correct_option.id),
                "why_correct_option_text": why_correct_option.why_correct_option_text,
                "created_at": why_correct_option.created_at,
                "updated_at": why_correct_option.updated_at,
                "is_active": why_correct_option.is_active,
                "question": str(why_correct_option.question.id)
            } if why_correct_option else None
        }

        detailed_questions.append(detailed_question)

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
        "questions": detailed_questions
    }

    return JsonResponse(response_data, status=200)

# 7d097f77-9224-4f9e-9955-19a292341637
# bda9a2fd-13fe-4f42-b2a2-7caabde43245

# Get the details for specific question in a question bank
@question_bank_router.get("/{question_bank_id}/question/{question_id}/", response={200: QuestionDetailSchema,
                                                                                    codes_4xx: dict}) # auth=django_auth
async def get_question_in_question_bank(request, question_bank_id, question_id, *args, **kwargs):
    # Checking if the user is logged in or not
    if not request.user.is_authenticated:
        raise HttpError(401, "User is not authenticated")
    
    # Getting the question bank using id
    question_bank = await sync_to_async(get_object_or_404)(QuestionBank, id=question_bank_id)
    # Getting the specific question along with it's options and why correct option from question bank
    question = await sync_to_async(get_object_or_404)(Question, id=question_id, question_bank=question_bank)

    # Question with option and it's why correct option
    why_correct_option = question.why_correct_option
    options = []
    for option in question.options.all():
        options.append(
            {
                "id": str(option.id),
                "option_text": option.option_text,
                "option_image": option.option_image.url if option.option_image else None,
                "is_correct": option.is_correct,
                "created_at": option.created_at,
                "updated_at": option.updated_at,
                "is_active": option.is_active,
                "question": str(option.question.id)
            }
        )

    # Structuring the response data
    response_data = {
        "id": UUID(str(question.id)),
        "question_bank_id": UUID(str(question_bank.id)),
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
        "why_correct_option": {
            "id": str(why_correct_option.id),
            "why_correct_option_text": why_correct_option.why_correct_option_text,
            "created_at": why_correct_option.created_at,
            "updated_at": why_correct_option.updated_at,
            "is_active": why_correct_option.is_active,
            "question": str(why_correct_option.question.id)
        } if why_correct_option else None
    }

    return JsonResponse(response_data)


# Save question
@question_bank_router.post("/{question_bank_id}/question/{question_id}/save/", 
                        response={200: SaveQuestionSchema, codes_4xx: dict}) # auth=django_auth
def save_question(request, question_bank_id, question_id, *args, **kwargs):
    # Checking if the user is logged in or not
    if not request.user.is_authenticated:
        raise HttpError(401, "User is not authenticated")
    
    # Verifying the UUIDs
    try:
        question_bank_id = UUID(str(question_bank_id))
        question_id = UUID(str(question_id))
    except ValueError:
        return JsonResponse({"error": "Invalid UUID format"}, status=400)

    # Getting the question bank using uuid
    try:
        question_bank = get_object_or_404(QuestionBank, id=question_bank_id)
    except QuestionBank.DoesNotExist:
        return JsonResponse({"error": "Question bank not found"}, status=404)
    except Exception as e:
        return JsonResponse({"error": f"An error occurred: {str(e)}"})

    # Getting the question using uuid
    try:
        question = get_object_or_404(Question, id=question_id)
    except Question.DoesNotExist:
        return JsonResponse({"error": "Question not found"}, status=404)
    except Exception as e:
        return JsonResponse({"error": f"An error occurred: {str(e)}"})
    
    # Creating a new save question object
    try:
        data = {
            "user": request.user.id,
            "question_bank": question_bank.id,
            "question": question.id,
        }
        # Serializing the data
        serializer = SaveQuestionSerializer(data=data)
        # Validation for serializer
        if serializer.is_valid():
            serializer.save()
            return JsonResponse(serializer.data, status=200)
        else:
            return JsonResponse(serializer.errors, status=400)
        
    except Exception as e:
        return JsonResponse({"error": f"An error occurred: {str(e)}"})


# Report a question in a question bank
@question_bank_router.post("/{question_bank_id}/question/{question_id}/report/",
                            response={200: ReportQuestionSchema, codes_4xx: dict}) # auth=django_auth
def report_question_in_question_bank(request, question_bank_id, question_id, *args, **kwargs):
    # Checking if the user is logged in or not
    if not request.user.is_authenticated:
        raise HttpError(401, "User is not authenticated")
    
    # Verifying the UUIDs
    try:
        question_bank_id = UUID(str(question_bank_id))
        question_id = UUID(str(question_id))
    except ValueError:
        return JsonResponse({"error": "Invalid UUID format"}, status=400)

    # Getting the question bank using uuid
    try:
        question_bank = get_object_or_404(QuestionBank, id=question_bank_id)
    except QuestionBank.DoesNotExist:
        return JsonResponse({"error": "Question bank not found"}, status=404)
    except Exception as e:
        return JsonResponse({"error": f"An error occurred: {str(e)}"})

    # Getting the question using uuid
    try:
        question = get_object_or_404(Question, id=question_id)
    except Question.DoesNotExist:
        return JsonResponse({"error": "Question not found"}, status=404)
    except Exception as e:
        return JsonResponse({"error": f"An error occurred: {str(e)}"})

    # Getting the request body
    try:
        request_data = json.loads(request.body)
    except json.JSONDecodeError:
        return JsonResponse({"error": "Invalid JSON"}, status=400)
    except Exception as e:
        return JsonResponse({"error": f"An error occured: {str(e)}"})

    # Creating a new report object
    try:
        data = {
            "question_bank_id": question_bank.id,
            "question_id": question.id,
            "question_text": question.question_text,
            "comment": request_data.get('comment', '')
        }
        # Serializing the data
        serializer = ReportSerializer(data=data)
        # Validation for serializer
        if serializer.is_valid():
            serializer.save()
            return JsonResponse(serializer.data, status=200)
        else:
            return JsonResponse(serializer.errors, status=400)
    except Exception as e:
        return JsonResponse({"error": f"An error occurred: {str(e)}"})
