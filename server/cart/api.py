# Ninja imports
from ninja_extra import NinjaExtraAPI
# My Files
from .router import cart_router


# API Init
api = NinjaExtraAPI(version="1.0.0", urls_namespace="cart")

# Including the router from cart app
api.add_router("", cart_router)