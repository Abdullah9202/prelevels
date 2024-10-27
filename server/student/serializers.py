from rest_framework import serializers
# My Files
from .models import User, TopicalProgress, YearlyProgress

class UserSerializer(serializers.ModelSerializer):
    # Serializer for User model
    class Meta:
        model = User
        fields = [
            'id', 'clerk_id', 'first_name', 'last_name', 'avatar_url', 
            'email', 'username', 'phone_number', 'taking_questionBanks', 
            'taking_courses', 'taking_bundles', 'daysStreak', 'questionSolved', 
            'questionRemained', 'createdAt', 'updatedAt', 'last_login',
        ]

class TopicalProgressSerializer(serializers.ModelSerializer):
    # Serializer for TopicalProgress model
    student = serializers.StringRelatedField()  # To represent the student as a string

    class Meta:
        model = TopicalProgress
        fields = ['id', 'student', 'progress']

class YearlyProgressSerializer(serializers.ModelSerializer):
    # Serializer for YearlyProgress model
    student = serializers.StringRelatedField()  # To represent the student as a string

    class Meta:
        model = YearlyProgress
        fields = ['id', 'student', 'progress']
