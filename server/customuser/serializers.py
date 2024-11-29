# Django imports
from django.contrib.auth.password_validation import validate_password
# REST imports
from rest_framework import serializers
# My Files
from .models import User, TopicalProgress, YearlyProgress
from questionbank.serializers import QuestionBankSerializer_Short
from course.serializers import CourseSerializer_Short
from bundle.serializers import BundleSerializer_Short


class UserSerializer(serializers.ModelSerializer):
    full_name = serializers.SerializerMethodField()
    taking_questionBanks = QuestionBankSerializer_Short(read_only=True, many=True)
    taking_courses = CourseSerializer_Short(read_only=True, many=True)
    taking_bundles = BundleSerializer_Short(read_only=True, many=True)
    
    class Meta:
        model = User
        fields = [
            'id', 'first_name', 'last_name', 'full_name', 'email', 'username', 
            'phone_number', 'taking_questionBanks', 'taking_courses', 'taking_bundles', 'daysStreak',
            'questionSolved', 'questionRemained', 'createdAt', 'updatedAt', 'last_login',
        ]
    
    def get_full_name(self, obj):
        return f"{obj.first_name} {obj.last_name}"


class RegisterSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ['first_name', 'last_name', 'username', 'email', 'phone_number', 'password']
        
    def create(self, validated_data):
        user = User.objects.create(
            first_name=validated_data['first_name'],
            last_name=validated_data['last_name'],
            username=validated_data['username'],
            email=validated_data['email'],
            phone_number=validated_data['phone_number'],
        )
        user.set_password(validated_data['password'])
        user.save()
        return user


class TopicalProgressSerializer(serializers.ModelSerializer):
    user = serializers.StringRelatedField()

    class Meta:
        model = TopicalProgress
        fields = ['id', 'user', 'progress']


class YearlyProgressSerializer(serializers.ModelSerializer):
    user = serializers.StringRelatedField()

    class Meta:
        model = YearlyProgress
        fields = ['id', 'user', 'progress']
