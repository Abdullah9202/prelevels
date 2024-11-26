from rest_framework import serializers
# My Files
from .models import CourseCategory, Course


# Serializer for Category model
class CategorySerializer(serializers.ModelSerializer):
    class Meta:
        model = CourseCategory
        fields = [
            'id', 'name', 'created_at', 'updated_at', 'is_active',
        ]


# Serializer for Course model
class CourseSerializer(serializers.ModelSerializer):
    category = CategorySerializer(read_only=True)

    class Meta:
        model = Course
        fields = [
            'category', 'id', 'name', 'description', 'additional_details', 'image', 
            'whatsapp_link', 'resource_link','price', 'discount', 'validity', 'created_at', 
            'updated_at', 'is_active',
        ]


# Serializer for Course model (Short)
class CourseSerializer_Short(serializers.ModelSerializer):
    
    class Meta:
        model = Course
        fields = [
            'id', 'name', 'description', 'additional_details', 'image',
            'validity', 'created_at', 'updated_at', 'is_active'
        ]