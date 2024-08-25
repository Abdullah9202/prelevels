from ninja import NinjaAPI
# My Files
from .schemas import BundleSchema


# API init
api = NinjaAPI(version="1.0.0", urls_namespace="bundle")