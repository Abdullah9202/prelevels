from django.contrib import admin
# My Files
from .models import (
    QuestionBank, Question, Option, WhyCorrectOption
)


# In line settings for the admin panel
class WhyCorrectOptionInline(admin.StackedInline):
    model = WhyCorrectOption
    extra = 1


class OptionInline(admin.StackedInline):
    model = Option
    extra = 4
    inlines = [WhyCorrectOptionInline]


class QuestionAdmin(admin.ModelAdmin):
    inlines = [OptionInline]

    list_display = ('question_text', 'question_bank', 'year', 'category', 'subject', 'topic', 'is_active')
    search_fields = ('question_text', 'question_bank__name', 'category', 'subject')
    list_filter = ('question_bank', 'year', 'category', 'subject')


# Registering the Bundle model
admin.site.register(
    [QuestionBank, Question, Option, WhyCorrectOption]
)
