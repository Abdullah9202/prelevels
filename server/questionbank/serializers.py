from rest_framework import serializers
# My Files
from .models import QuestionBank


# Serializer for question bank model
class QuestionBankSerializer(serializers.ModelSerializer):
    class Meta:
        model = QuestionBank
        fields = [
            'id', 'name', 'question_bank_image', 'description', 'additional_details', 'price', 'discount',
            'validity', 'created_at', 'updated_at', 'is_active',
        ]
