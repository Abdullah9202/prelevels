from rest_framework import serializers
# My Files
from .models import Bundle


# Serializer for Bundle model
class BundleSerializer(serializers.ModelSerializer):
    class Meta:
        model = Bundle
        fields = [
            'id', 'name', 'bundle_image', 'description', 'additional_details', 'price', 'discount',
            'validity', 'created_at', 'updated_at', 'is_active', 'course', 'question_bank'
        ]