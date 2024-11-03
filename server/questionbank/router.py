# Python imports
import json
import logging
from uuid import UUID
from typing import List
from asgiref.sync import sync_to_async
# Django imports
from django.db.models import Count
from django.http import JsonResponse
from django.shortcuts import get_object_or_404
from django.contrib.auth.decorators import login_required
# Ninja Imports
from ninja import Router, Form
from ninja.errors import HttpError
from ninja_extra.security import django_auth
from ninja.responses import codes_4xx
# My Files
from .models import (
    QuestionBank, Question, SaveQuestion
)
from .schemas import (
    QuestionBankSchema, QuestionBankDetailSchema, QuestionSchema, QuestionDetailSchema,
    OptionSchema, WhyCorrectOptionSchema, SaveQuestionSchema, ReportQuestionSchema,
)
from .serializers import (
    QuestionBankSerializer, QuestionSerializer, ReportSerializer, SaveQuestionSerializer,
    GetSavedQuestionSerializer
)


# Router Init
question_bank_router = Router()

# Set up logging
logger = logging.getLogger(__name__)


# Get all question banks
@question_bank_router.get("/all/", response={200: List[QuestionBankSchema]})
async def get_all_question_banks(request):
    try:
        # Fetching all question banks with question count annotation
        question_banks = await sync_to_async(
            lambda: list(QuestionBank.objects.annotate(question_count=Count("questions")))
        )()
    
        # Serialize the question banks using Pydantic schema
        serialized_question_banks = [QuestionBankSchema.from_orm(qb).dict() for qb in question_banks]

        # Returning the Json data
        return JsonResponse(serialized_question_banks, status=200, safe=False)
    
    except Exception as e:
        logger.error(f"Unexpected error: {str(e)}")
        raise HttpError(500, f"An unexpected error occurred. Please try again later.")


# Get Saved Questions
@question_bank_router.get("/saved-questions/", response={200: List[SaveQuestionSchema], 
                                                        codes_4xx: dict}, auth=django_auth)
@login_required
async def get_saved_questions(request, *args, **kwargs):
    # Getting the user from request
    user = request.user
    
    # Getting the saved question(s)
    saved_questions = await sync_to_async(list)(
        SaveQuestion.objects.filter(user=user).select_related('question')
    )
    
    # Serializing
    serialized_saved_questions = GetSavedQuestionSerializer(saved_questions, many=True).data
    
    # Returning
    return JsonResponse(serialized_saved_questions, status=200, safe=False)


# Get the details of specific Question bank
@question_bank_router.get("/{question_bank_id}/", response={200: QuestionBankDetailSchema, 
                                                            codes_4xx: dict}, auth=django_auth)
@login_required
async def get_question_bank_details(request, question_bank_id: UUID, *args, **kwargs):
    try:
        # Getting the question bank
        question_bank = await sync_to_async(
            lambda: get_object_or_404(
                QuestionBank.objects.annotate(question_count=Count("questions")),
                id=question_bank_id
            )
        )()
        
        # Serializing the question bank using pydantic serializer and question_count included
        serialized_question_bank = QuestionBankSchema.from_orm(question_bank).dict()
        
        # Returning the Json data
        return JsonResponse(serialized_question_bank, status=200)
    
    except Exception as e:
        logger.error(f"Unexpected error: {str(e)}")
        raise HttpError(500, "An unexpected error occurred. Please try again later.")


# Get all questions in a question bank
@question_bank_router.get("/{question_bank_id}/all-questions/", response={200: List[QuestionSchema], 
                                                                    codes_4xx: dict}, auth=django_auth)
@login_required
async def get_questions_in_question_bank(request, question_bank_id: UUID, *args, **kwargs):
    try:
        # Getting the question bank using id
        question_bank = await sync_to_async(get_object_or_404)(QuestionBank, id=question_bank_id)

        # Getting the questions along with their options from the question bank
        questions = await sync_to_async(
            lambda: list(Question.objects.filter(
                question_bank=question_bank).select_related('why_correct_option').prefetch_related('options'))
        )()

        # Serializing the questions
        serialized_questions = QuestionSerializer(questions, many=True).data
        
        # Returning the Json data
        return serialized_questions
    
    except Exception as e:
        logger.error(f"Unexpected error: {str(e)}")
        raise HttpError(500, "An unexpected error occurred. Please try again later.")


# Get the details for specific question in a question bank
@question_bank_router.get("/{question_bank_id}/question/{question_id}/", response={200: QuestionDetailSchema,
                                                                        codes_4xx: dict}, auth=django_auth)
@login_required
async def get_question_in_question_bank(request, question_bank_id: UUID, question_id: UUID, *args, **kwargs):
    try:
        # Getting the question bank using id
        question_bank = await sync_to_async(get_object_or_404)(QuestionBank, id=question_bank_id)
        # Getting the specific question along with its options and why correct option from question bank
        question = await sync_to_async(get_object_or_404)(Question, id=question_id, question_bank=question_bank)

        # Serializing the question
        serialized_question = QuestionSerializer(question).data
        
        # Returning the Json data
        return JsonResponse(serialized_question, status=200)
    
    except Exception as e:
        logger.error(f"Unexpected error: {str(e)}")
        raise HttpError(500, "An unexpected error occurred. Please try again later.")


# Save question
@question_bank_router.post("/{question_bank_id}/question/{question_id}/save/", 
                        response={200: SaveQuestionSchema, codes_4xx: dict}, auth=django_auth)
@login_required
async def save_question(request, question_bank_id: UUID, question_id: UUID, *args, **kwargs):
    # Verifying the UUIDs
    try:
        question_bank_id = UUID(str(question_bank_id))
        question_id = UUID(str(question_id))
    except ValueError:
        return JsonResponse({"error": "Invalid UUID format"}, status=400)

    # Getting the question bank using uuid
    question_bank = await sync_to_async(get_object_or_404)(QuestionBank, id=question_bank_id)

    # Getting the question using uuid
    question = await sync_to_async(get_object_or_404)(Question, id=question_id)
    
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
                            response={200: ReportQuestionSchema, codes_4xx: dict}, auth=django_auth)
@login_required
async def report_question_in_question_bank(request, question_bank_id: UUID, question_id: UUID, comment: str = Form(...)):
    try:
        # Getting the question bank using uuid
        question_bank = await sync_to_async(get_object_or_404)(QuestionBank, id=question_bank_id)

        # Getting the question using uuid
        question = await sync_to_async(get_object_or_404)(Question, id=question_id)

        # Creating a new report object
        data = {
            "question_bank": question_bank.id,
            "question": question.id,
            "comment": comment,
        }

        # Serializing the data
        serializer = ReportSerializer(data=data)

        # Validation for serializer
        if serializer.is_valid():
            report = serializer.save()
            response_data = {
                "id": str(report.id),
                "question_bank": str(report.question_bank.id),
                "question": str(report.question.id),
                "comment": str(report.comment),
            }
            return JsonResponse(response_data, status=200)
        else:
            return JsonResponse(serializer.errors, status=400)
    except Exception as e:
        return JsonResponse({"error": f"An error occurred: {str(e)}"}, status=500)
