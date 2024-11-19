# Ninja imports
from ninja_extra import NinjaExtraAPI
# My Files
from .router import bundle_router


# API init
bundle_api = NinjaExtraAPI(version="1.0.0", urls_namespace="bundle")

# Including the router from bundle
bundle_api.add_router("", bundle_router)