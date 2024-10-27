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
    user = serializers.StringRelatedField()  # To represent the user as a string

    class Meta:
        model = TopicalProgress
        fields = ['id', 'user', 'progress']

class YearlyProgressSerializer(serializers.ModelSerializer):
    # Serializer for YearlyProgress model
    user = serializers.StringRelatedField()  # To represent the user as a string

    class Meta:
        model = YearlyProgress
        fields = ['id', 'user', 'progress']
