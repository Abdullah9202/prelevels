from django.contrib import admin
# My Files
from .models import (
    QuestionBankCategory, QuestionBank, Question, Option, WhyCorrectOption,
    SaveQuestion, Report
)


# Category with Admin
class CategoryAdmin(admin.ModelAdmin):
    # Display Fields and Filters
    list_display = ('name', 'created_at', 'updated_at', 'is_active')
    search_fields = ('name',)
    list_filter = ('is_active',)

admin.site.register(QuestionBankCategory, CategoryAdmin)

# Question Bank with Admin
class QuestionBankAdmin(admin.ModelAdmin):
    # Display Fields and Filters
    list_display = ('name', 'description', 'price', 'discount', 'validity', 'is_active')
    search_fields = ('name', 'description')
    list_filter = ('is_active', 'price', 'validity')

admin.site.register(QuestionBank, QuestionBankAdmin)


# Inlines
class WhyCorrectOptionInline(admin.StackedInline):
    model = WhyCorrectOption
    extra = 1


class OptionInline(admin.StackedInline):
    model = Option
    extra = 4
    inlines = [WhyCorrectOptionInline]


# Question with Admin
class QuestionAdmin(admin.ModelAdmin):
    inlines = [OptionInline]

    # Display Fields and Filters
    list_display = ('question_text', 'question_bank', 'subject', 'topic', 'is_active')
    search_fields = ('question_text', 'question_bank__name', 'subject')
    list_filter = ('question_bank', 'subject', 'topic')

admin.site.register(Question, QuestionAdmin)


# Option with Admin
class OptionAdmin(admin.ModelAdmin):
    # Display Fields and Filters
    list_display = ('option_text', 'is_correct', 'question', 'is_active')
    search_fields = ('option_text',)
    list_filter = ('is_correct', 'is_active')

admin.site.register(Option, OptionAdmin)


# WhyCorrectOption with Admin
class WhyCorrectOptionAdmin(admin.ModelAdmin):
    list_display = ('why_correct_option_text', 'is_active')
    search_fields = ('why_correct_option_text',)
    list_filter = ('is_active',)

admin.site.register(WhyCorrectOption)


# SaveQuestion with admin
admin.site.register(SaveQuestion)


# Report with Admin
admin.site.register(Report)
