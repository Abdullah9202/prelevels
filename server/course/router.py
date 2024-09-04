from django.http import JsonResponse
from django.db import IntegrityError
from django.core.exceptions import ValidationError
import logging
# Ninja Imports
from ninja import Router
from ninja.errors import HttpError
from ninja_jwt.authentication import JWTAuth
from ninja.responses import codes_4xx
# My Files
from .models import Course
from .serializers import CourseSerializer
from .schemas import CourseSchema


# Router Init
course_router = Router()


# Set up logging
logger = logging.getLogger(__name__)

# Add new course router
