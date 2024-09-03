from rest_framework import serializers
# My Files
from .models import Student, TopicalProgress, YearlyProgress

class StudentSerializer(serializers.ModelSerializer):
    # Serializer for Student model
    class Meta:
        model = Student
        fields = [
            'id', 'first_name', 'last_name', 'student_image', 'email', 'username', 
            'phone_number', 'is_authenticated', 'taking_questionBanks', 'taking_courses', 
            'taking_bundles', 'daysStreak', 'questionSolved', 
            'questionRemained', 'timestamp', 'updated_at', 'last_login',
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
