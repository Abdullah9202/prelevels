from rest_framework import serializers
from .models import (
    QuestionBank, Question, Option, WhyCorrectOption,
    SaveQuestion, Report
)


class QuestionBankSerializer(serializers.ModelSerializer):
    class Meta:
        model = QuestionBank
        fields = [
            'id', 'name', 'question_bank_image', 'description', 'additional_details', 'price', 'discount',
            'validity', 'created_at', 'updated_at', 'is_active',
        ]


class QuestionSerializer(serializers.ModelSerializer):
    class Meta:
        model = Question
        fields = [
            'id', 'question_bank_id', 'year', 'category', 'subject', 'topic', 'question_number',
            'question_text', 'question_image', 'additional_details', 'unique_identifier', 'created_at',
            'updated_at', 'is_active',
        ]


class OptionSerializer(serializers.ModelSerializer):
    class Meta:
        model = Option
        fields = [
            'id', 'question_id', 'option_text', 'is_correct', 'created_at', 'updated_at', 'is_active',
            'why_correct_option_id',
        ]


class WhyCorrectOptionSerializer(serializers.ModelSerializer):
    class Meta:
        model = WhyCorrectOption
        fields = [
            'id', 'why_correct_option_text', 'created_at', 'updated_at', 'is_active',
        ]


class SaveQuestionSerializer(serializers.ModelSerializer):
    class Meta:
        model = SaveQuestion
        fields = [
            'id', 'user_id', 'question_bank_id', 'question_id', 'saved_at',
        ]


class ReportSerializer(serializers.ModelSerializer):
    class Meta:
        model = Report
        fields = [
            'id', 'question_bank_id', 'question_id', 'question_text', 'comment', 'created_at',
        ]
