# Ninja imports
from ninja_extra import NinjaExtraAPI
# My Files
from .schemas import BundleSchema
from .router import bundle_router


# API init
api = NinjaExtraAPI(version="1.0.0", urls_namespace="bundle")

# Including the router from bundle
api.add_router("", bundle_router)