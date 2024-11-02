from rest_framework import serializers
# My Files
from .models import Bundle
from course.serializers import CourseSerializer
from questionbank.serializers import QuestionBankSerializer


# Serializer for Bundle model
class BundleSerializer(serializers.ModelSerializer):
    course = CourseSerializer(many=True, read_only=True)
    question_bank = QuestionBankSerializer(many=True, read_only=True)
    
    class Meta:
        model = Bundle
        fields = [
            'id', 'name', 'bundle_image', 'description', 'additional_details', 'price', 'discount',
            'validity', 'created_at', 'updated_at', 'is_active', 'course', 'question_bank'
        ]