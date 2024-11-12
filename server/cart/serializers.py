from rest_framework import serializers
from .models import Cart

class CartItemSerializer(serializers.ModelSerializer):
    product_id = serializers.UUIDField(source='content_object.id')
    product_name = serializers.CharField(source='content_object.name')
    category = serializers.CharField(source='content_object.category')
    price = serializers.DecimalField(source='content_object.price', max_digits=10, decimal_places=2)
    total_price = serializers.SerializerMethodField()

    class Meta:
        model = Cart
        fields = [
            'id', 'category', 'product_id', 'product_name', 'quantity', 'price', 'total_price', 'added_at'
        ]

    def get_total_price(self, obj):
        return obj.content_object.price * obj.quantity
