from ninja_extra import NinjaExtraAPI


# API Init
api = NinjaExtraAPI(version="1.0.0", urls_namespace="cart", csrf=True)

# Including the router from cart app
api.add_router("", "cart.router.cart_router")