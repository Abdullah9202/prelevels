# Python imports
import logging
from uuid import UUID
from typing import List
# Django imports
from django.http import JsonResponse
from django.shortcuts import get_list_or_404, get_object_or_404
# Ninja Imports
from ninja import Router
from ninja.errors import HttpError
from ninja_jwt.authentication import JWTAuth
from ninja.responses import codes_4xx
# My Files
from .models import Course
from .serializers import CourseSerializer
from .schemas import GetCourseDetailSchema, GetCourseListSchema


# Router Init
course_router = Router()

# Set up logging
logger = logging.getLogger(__name__)

# Get all courses router
@course_router.get("", response={200: List[GetCourseListSchema], codes_4xx: dict}, auth=JWTAuth())
def get_all_courses(request, *args, **kwargs):
    try:
        # Getting all courses
        courses = get_list_or_404(Course)
        # Serializing the courses
        serialized_courses = CourseSerializer(courses, many=True).data
        # Returning the Json data
        return JsonResponse(serialized_courses, status=200, safe=False)
    except HttpError as err:
        logger.error(f"HttpError: {err}")
        raise err
    except Exception as err:
        logger.error(f"Unexpected error: {str(err)}")
        raise HttpError(500, "An unexpected error occurred. Please try again later.")


# Get course router
@course_router.get("/{course_id}", response={200: GetCourseDetailSchema, codes_4xx: dict}, auth=JWTAuth())
def get_course(request, course_id: UUID, *args, **kwargs):
    try:
        # Getting the course
        course = get_object_or_404(Course, id=course_id)
        # Serializing the course
        serialized_course = CourseSerializer(course).data
        # Returning the Json data
        return JsonResponse(serialized_course, status=200)
    except HttpError as err:
        logger.error(f"HttpError: {err}")
        raise err
    except Exception as err:
        logger.error(f"Unexpected error: {str(err)}")
        raise HttpError(500, "An unexpected error occurred. Please try again later.")


