from ninja_extra import NinjaExtraAPI


# API Init
api = NinjaExtraAPI()

# Including the router from cart app
api.add_router("", "cart.router.cart_router")