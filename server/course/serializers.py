from rest_framework import serializers
# My Files
from .models import Course


class CourseSerializer(serializers.ModelSerializer):
    # Serializer for course model
    class Meta:
        model = Course
        fields = [
            'id', 'name', 'description', 'additional_details', 'course_image', 'whatsapp_link', 'resource_link',
            'price', 'discount', 'validity', 'created_at', 'updated_at', 'is_active',
        ]