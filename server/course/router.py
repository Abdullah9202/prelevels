# Python imports
import logging
from uuid import UUID
from typing import List
from asgiref.sync import sync_to_async
# Django imports
from django.http import JsonResponse
from django.shortcuts import get_object_or_404
# Ninja Imports
from ninja_extra import Router
from ninja.errors import HttpError
from ninja.responses import codes_4xx
# Ninja Jwt imports
from ninja_jwt.authentication import JWTAuth
# My Files
from .models import Course
from .serializers import CourseSerializer
from .schemas import GetCourseDetailSchema
from customuser.models import User


# Router Init
course_router = Router()

# Set up logging
logger = logging.getLogger(__name__)

# Get all courses router
@course_router.get("/all/", response={200: List[GetCourseDetailSchema], codes_4xx: dict})
async def get_all_courses(request, *args, **kwargs):
    try:
        # Getting all courses
        courses = await sync_to_async(
            lambda: list(Course.objects.all())
        )()
        
        # Serializing the courses
        serialized_courses = CourseSerializer(courses, many=True).data
        
        # Returning the Json data
        return JsonResponse(serialized_courses, status=200, safe=False) # It will return the empty list if DB doesn't contains any course
    except HttpError as err:
        logger.error(f"HttpError: {err}")
        raise err
    except Exception as err:
        logger.error(f"Unexpected error: {str(err)}")
        raise HttpError(500, "An unexpected error occurred. Please try again later.")


# Get User Courses router
@course_router.get("/my-courses/", response={200: dict, codes_4xx: dict}, auth=JWTAuth())
async def get_user_courses(request, *args, **kwargs):
    try:
        # Getting the authenticated user
        user = request.user
        
        # Getting the courses concerned with the user
        courses = await sync_to_async(
            lambda: list(user.taking_courses.all())
        )()
        
        # Serializing the courses
        serialized_courses = CourseSerializer(courses, many=True).data
        
        # Returning the Json response
        return JsonResponse(serialized_courses, status=200, safe=False)
    except HttpError as err:
        logger.error(f"HttpError: {err}")
        raise err
    except Exception as err:
        logger.error(f"Unexpected error: {str(err)}")
        raise HttpError(500, "An unexpected error occurred. Please try again later.")


# Get course details router
@course_router.get("/{course_id}/", response={200: GetCourseDetailSchema, codes_4xx: dict}, auth=JWTAuth())
async def get_course(request, course_id: UUID, *args, **kwargs):
    try:
        # Getting the course
        course = await sync_to_async(get_object_or_404)(Course, id=course_id)
        
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
