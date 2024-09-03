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
course_router.post("/addnew", response={200: CourseSchema, codes_4xx: dict}, auth=JWTAuth())
def add_new_course(request, payload: CourseSchema):
    logging.info(f"Registering course with data: {payload.dict()}")
    
    try:
        # Using the serializer to validate the input data
        serializer = CourseSerializer(data=payload.dict())
        if not serializer.is_valid():
            logger.error(f"Validation error: {serializer.errors}")
            raise HttpError(400, "Invalid input data.")
    
        # Checking for existing course
        if Course.objects.filter(name=payload.name).exists():
            logger.warning("This course already exists")
            raise HttpError(400, "This course already exists")
        
        # Registering the new course
        new_course = Course(
            name=payload.name,
            description=payload.description,
            additional_details=payload.additional_details,
            course_image=payload.course_image,
            whatsapp_link=payload.whatsapp_link,
            resource_link=payload.resource_link,
            price=payload.price,
            discount=payload.discount,
            validity=payload.validity,
            is_active=payload.is_active,
        )
        new_course.save()
        
        # Serializing the newely created course
        serialized_course = CourseSerializer(new_course)
        return JsonResponse(serialized_course.data)
        
    except IntegrityError as err:
        logger.error(f"IntegrityError: {str(err)}")
        raise HttpError(400, "Database error. Please ensure your data is unique.")
    except ValidationError as err:
        logger.error(f"ValidationError: {str(err)}")
        raise HttpError(400, "Validation error.")
    except HttpError as err:
        logger.error(f"HttpError: {err}")
        raise err
    except Exception as err:
        logger.error(f"Unexpected error: {str(err)}")
        raise HttpError(500, "An unexpected error occurred. Please try again later.")