# Python imports
import os
# Django imports
from django.db.models.signals import post_save
from django.dispatch import receiver
from django.core.exceptions import ValidationError
# Pandas imports
import pandas as pd
# My Files
from .models import QuestionBank, Question, Option, WhyCorrectOption


@receiver(post_save, sender=QuestionBank)
def process_question_file(sender, instance, created, **kwargs):
    if created and instance.question_file:
        # Checking file extension
        file_extension = os.path.splitext(instance.question_file.name)[1]
        if file_extension != '.xlsx':
            raise ValidationError('Invalid file. Only .xlsx files are allowed.')
        
        # Reading the Excel file
        question_file = pd.ExcelFile(instance.question_file.path)
        sheets_in_file = question_file.sheet_names

        # Iterating over each sheet
        for sheet in sheets_in_file:
            df = pd.read_excel(instance.question_file.path, sheet_name=sheet)

            # Iterating over the rows and creating the question objects
            for _, row in df.iterrows():
                # Creating the question
                question = Question.objects.create(
                    question_bank=instance,
                    subject=row['Subject'],
                    topic=row['Topic'],
                    question_number=row['Question Number'],
                    question_text=row['Question'],
                )
                
                # Iterating over the options
                for option in ['A', 'B', 'C', 'D', 'E']:
                    # Validation for option
                    if option in df.columns:
                        # Creating the options
                        Option.objects.create(
                            question=question,
                            option_text=row[option],
                            is_correct=True if row['Correct Option'] == option else False,
                            is_active=True,
                        )
                    else:
                        raise ValidationError('Invalid format for options.')
                
                # Creating why correct option
                WhyCorrectOption.objects.create(
                    question=question,
                    why_correct_option_text=row['Why Correct Option'],
                    is_active=True,
                )