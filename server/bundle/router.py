# Python imports
import logging
from uuid import UUID
from typing import List
from asgiref.sync import sync_to_async
# Django imports
from django.http import JsonResponse
from django.shortcuts import get_object_or_404
from django.contrib.auth.decorators import login_required
# Ninja Imports
from ninja import Router
from ninja.errors import HttpError
from ninja.responses import codes_4xx
from ninja_extra.security import django_auth
# My Files
from .models import Bundle
from .schemas import BundleSchema
from .serializers import BundleSerializer
from customuser.models import User


# Router Init
bundle_router = Router()

# Set up logging
logger = logging.getLogger(__name__)

# Get all bundles router
@bundle_router.get("/", response={200: List[BundleSchema], codes_4xx: dict})
async def get_all_bundles(request, *args, **kwargs):
    try:
        # Getting all bundles
        bundles = await sync_to_async(
            lambda: list(Bundle.objects.all())
        )()
        
        # Serializing the bundles
        serialized_bundles = [BundleSchema.from_orm(b).dict() for b in bundles]
        
        # Returning the Json data
        return JsonResponse(serialized_bundles, status=200, safe=False) # It will return the empty list if DB doesn't contains any bundle
    except HttpError as err:
        logger.error(f"HttpError: {err}")
        raise err
    except Exception as err:
        logger.error(f"Unexpected error: {str(err)}")
        raise HttpError(500, "An unexpected error occurred. Please try again later.")


# Get bundle details router
@bundle_router.get("/{bundle_id}/", response={200: BundleSchema, codes_4xx: dict}, auth=django_auth)
@login_required
async def get_bundle_details(request, bundle_id: UUID, *args, **kwargs):
    try:
        # Getting the bundle
        bundle = await sync_to_async(get_object_or_404)(Bundle, id=bundle_id)
        
        # Serializing the bundle
        serialized_bundle = BundleSchema.from_orm(bundle).dict()
        
        # Returning the Json data
        return JsonResponse(serialized_bundle, status=200)
    except HttpError as err:
        logger.error(f"HttpError: {err}")
        raise err
    except Exception as err:
        logger.error(f"Unexpected error: {str(err)}")
        raise HttpError(500, "An unexpected error occurred. Please try again later.")


# Get user bundles router
@bundle_router.get("/{username}/my-bundles/", response={200: BundleSchema, codes_4xx: dict}, auth=django_auth)
@login_required
async def get_user_bundles(request, username: str, *args, **kwargs):
    try:
        # Reteriving the user using username
        user = await sync_to_async(get_object_or_404)(User, username=username)
        
        # Reteriving the bundle(s) associated with user
        bundles = await sync_to_async(lambda: list(user.taking_bundles.all()))()

        # Serializing the bundles
        serialized_bundles = [BundleSchema.from_orm(bundle).dict() for bundle in bundles]
        
        # Returning the json data
        return JsonResponse(serialized_bundles, status=200, safe=False)
    except HttpError as err:
        logger.error(f"HttpError: {err}")
        raise err
    except Exception as err:
        logger.error(f"Unexpected error: {str(err)}")
        raise HttpError(500, "An unexpected error occurred. Please try again later.")
