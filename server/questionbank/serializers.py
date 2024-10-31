from rest_framework import serializers
from .models import (
    QuestionBankCategory, QuestionBank, Question, Option, WhyCorrectOption,
    SaveQuestion, Report
)


class CategorySerializer(serializers.ModelSerializer):
    model = QuestionBankCategory
    fields = [
        'id', 'name', 'created_at', 'updated_at', 'is_active',
    ]


class QuestionBankSerializer(serializers.ModelSerializer):
    question_count = serializers.IntegerField(read_only=True) # Custom field to get question count (Not in DB)
    
    class Meta:
        model = QuestionBank
        fields = [
            'id', 'category', 'name', 'question_bank_image', 'description', 'additional_details', 
            'question_file', 'question_count', 'price', 'discount', 'validity', 'created_at', 
            'updated_at', 'is_active',
        ]


class QuestionSerializer(serializers.ModelSerializer):
    class Meta:
        model = Question
        fields = [
            'id', 'question_bank', 'subject', 'topic', 'question_number',
            'question_image', 'question_text', 'additional_details', 'unique_identifier', 
            'created_at', 'updated_at', 'is_active'
        ]


class OptionSerializer(serializers.ModelSerializer):
    class Meta:
        model = Option
        fields = [
            'id', 'option_text', 'option_image', 'is_correct', 'created_at', 'updated_at', 
            'is_active', 'question'
        ]


class WhyCorrectOptionSerializer(serializers.ModelSerializer):
    class Meta:
        model = WhyCorrectOption
        fields = [
            'id', 'why_correct_option_text', 'created_at', 'updated_at', 'is_active',
            'question'
        ]


class SaveQuestionSerializer(serializers.ModelSerializer):
    class Meta:
        model = SaveQuestion
        fields = [
            'id', 'saved_at', 'user', 'question_bank', 'question'
        ]


class ReportSerializer(serializers.ModelSerializer):
    class Meta:
        model = Report
        fields = [
            'id', 'created_at', 'question_bank', 'question'
        ]
