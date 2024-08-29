from ninja import Router
# My Files


# Router Init
router = Router()

@router.get("/cart")
def list_cart(request):
    return {"message": "List of Cart"}