# Ninja imports
from ninja_extra import NinjaExtraAPI
# My Files
from .router import cart_router


# API Init
cart_api = NinjaExtraAPI(version="1.0.0", urls_namespace="cart")

# Including the router from cart app
cart_api.add_router("", cart_router)