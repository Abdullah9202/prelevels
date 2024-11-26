from rest_framework import serializers
# My Files
from .models import (
    QuestionBankCategory, QuestionBank, Question, Option, WhyCorrectOption,
    SaveQuestion, Report
)


# Category Serializer
class CategorySerializer(serializers.ModelSerializer):
    model = QuestionBankCategory
    fields = [
        'id', 'name', 'created_at', 'updated_at', 'is_active',
    ]


# Question Bank Serializer (Full)
class QuestionBankSerializer(serializers.ModelSerializer):
    question_count = serializers.IntegerField(read_only=True) # Custom field to get question count (Not in DB)
    category = CategorySerializer(read_only=True)
    
    class Meta:
        model = QuestionBank
        fields = [
            'id', 'category', 'name', 'image', 'description', 'additional_details', 
            'question_file', 'question_count', 'price', 'discount', 'validity', 'created_at', 
            'updated_at', 'is_active',
        ]

# Question Bank Serializer (Short)
class QuestionBankSerializer_Short(serializers.ModelSerializer):
    class Meta:
        model = QuestionBank
        fields = [
            'id', 'name', 'image', 'description', 'additional_details',
            'is_active',
        ]


# Option Serializer
class OptionSerializer(serializers.ModelSerializer):
    class Meta:
        model = Option
        fields = [
            'id', 'option_text', 'image', 'is_correct', 'created_at', 'updated_at', 
            'is_active', 'question'
        ]


# Why Correct Option Serializer
class WhyCorrectOptionSerializer(serializers.ModelSerializer):
    class Meta:
        model = WhyCorrectOption
        fields = [
            'id', 'why_correct_option_text', 'created_at', 'updated_at', 'is_active',
            'question'
        ]


# Question Serializer (Full)
class QuestionSerializer(serializers.ModelSerializer):
    question_bank = QuestionBankSerializer_Short(read_only=True) # Using Short Question Bank Serializer
    options = OptionSerializer(read_only=True, many=True)
    why_correct_option = WhyCorrectOptionSerializer(read_only=True)

    class Meta:
        model = Question
        fields = [
            'question_bank', 'id', 'subject', 'topic', 'question_number',
            'image', 'question_text', 'additional_details', 'unique_identifier', 
            'created_at', 'updated_at', 'is_active', 'options', 'why_correct_option',
        ]


# Save Question Serializer
class SaveQuestionSerializer(serializers.ModelSerializer):
    class Meta:
        model = SaveQuestion
        fields = [
            'id', 'saved_at', 'user', 'question_bank', 'question'
        ]


# Get Saved Question Serializer
class GetSavedQuestionSerializer(serializers.ModelSerializer):
    question_bank = QuestionBankSerializer_Short(read_only=True) # Using Short Question Bank Serializer
    question = QuestionSerializer(read_only=True)

    class Meta:
        model = SaveQuestion
        fields = [
            'id', 'saved_at', 'user', 'question_bank', 'question'
        ]


# Report Question Serializer
class ReportSerializer(serializers.ModelSerializer):
    class Meta:
        model = Report
        fields = [
            'id', 'created_at', 'question_bank', 'question', 'comment'
        ]
