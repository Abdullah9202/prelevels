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
from .models import Bundle
from .schemas import BundleSchema, BundleDetailSchema
from .serializers import BundleSerializer


# Router Init
bundle_router = Router()

# Set up logging
logger = logging.getLogger(__name__)

# Get all bundles router
@bundle_router.get("/", response={200: List[BundleSchema], codes_4xx: dict}, auth=JWTAuth())
def get_all_bundles(request, *args, **kwargs):
    try:
        # Getting all bundles
        bundles = Bundle.objects.all()
        # Serializing the bundles
        serialized_bundles = BundleSerializer(bundles, many=True).data
        # Returning the Json data
        return JsonResponse(serialized_bundles, status=200, safe=False) # It will return the empty list if DB doesn't contains any bundle
    except HttpError as err:
        logger.error(f"HttpError: {err}")
        raise err
    except Exception as err:
        logger.error(f"Unexpected error: {str(err)}")
        raise HttpError(500, "An unexpected error occurred. Please try again later.")


# Get bundle details router
@bundle_router.get("/{bundle_id}/", response={200: BundleDetailSchema, codes_4xx: dict}, auth=JWTAuth())
def get_bundle_details(request, bundle_id: UUID, *args, **kwargs):
    try:
        # Getting the bundle
        bundle = get_object_or_404(Bundle, id=bundle_id)
        # Serializing the bundle
        serialized_bundle = BundleSerializer(bundle).data
        # Returning the Json data
        return JsonResponse(serialized_bundle, status=200)
    except HttpError as err:
        logger.error(f"HttpError: {err}")
        raise err
    except Exception as err:
        logger.error(f"Unexpected error: {str(err)}")
        raise HttpError(500, "An unexpected error occurred. Please try again later.")