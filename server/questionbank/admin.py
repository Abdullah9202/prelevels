from django.contrib import admin
# My Files
from .models import (
    QuestionBank, Question, Option, WhyCorrectOption
)

# Registering the Bundle model
admin.site.register(
    [QuestionBank, Question, Option, WhyCorrectOption]
)