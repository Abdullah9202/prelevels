from rest_framework import serializers
from .models import Cart

class CartItemSerializer(serializers.ModelSerializer):
    product_id = serializers.UUIDField(source='content_object.id')
    product_name = serializers.CharField(source='content_object.name')
    category_name = serializers.CharField(source='content_object.category.name', default='No Category')
    price = serializers.DecimalField(source='content_object.price', max_digits=10, decimal_places=2)
    total_price = serializers.SerializerMethodField()

    class Meta:
        model = Cart
        fields = [
            'id', 'product_id', 'product_name', 'category_name', 'quantity', 'price', 'total_price', 'added_at'
        ]

    def get_total_price(self, obj):
        return obj.content_object.price * obj.quantity
