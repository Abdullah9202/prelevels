from ninja_extra import NinjaExtraAPI
from ninja_jwt.controller import NinjaJWTDefaultController


# API Init
api = NinjaExtraAPI()
# Auth Token
api.register_controllers(NinjaJWTDefaultController)


# Including the router from cart app
api.add_router("", "cart.router.cart_router")