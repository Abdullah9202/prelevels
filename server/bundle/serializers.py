from rest_framework import serializers
# My Files
from .models import BundleCategory, Bundle
from course.serializers import CourseSerializer
from questionbank.serializers import QuestionBankSerializer


# Serializer for Category model
class CategorySerializer(serializers.ModelSerializer):
    class Meta:
        model = BundleCategory
        fields = [
            'id', 'name', 'created_at', 'updated_at', 'is_active',
        ]


# Serializer for Bundle model
class BundleSerializer(serializers.ModelSerializer):
    course = CourseSerializer(many=True, read_only=True)
    question_bank = QuestionBankSerializer(many=True, read_only=True)
    category = CategorySerializer(read_only=True)
    
    class Meta:
        model = Bundle
        fields = [
            'category', 'id', 'name', 'bundle_image', 'description', 'additional_details', 
            'price', 'discount', 'validity', 'created_at', 'updated_at', 'is_active', 
            'course', 'question_bank'
        ]