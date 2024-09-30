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
def process_question_file(sender, instance, created, *args, **kwargs):
    if created and instance.question_file:
        # Checking file extensions
        file_extension = os.path.splitext(instance.question_file.name)[1]
        if file_extension not in ['.xlsx', '.csv']:
            raise ValidationError('Invalid file. Only excel and csv files are allowed.')
        process_question_file(instance)


def process_excel_file(question_bank, file_extension):
    # Reading the excel file based on extension
    question_file = pd.ExcelFile(question_bank.question_file.path)
    # Specifying the sheet names
    sheets_in_file = question_file.sheet_names
    
    # Validating the extensions
    if file_extension == '.xlsx':
        df = pd.read_excel(question_bank.question_file.path)
    elif file_extension == '.csv':
        df = pd.read_csv(question_bank.question_file.path)
    
    # Iterating over the rows and creating the question objects
    for sheet in sheets_in_file:
        for _, row in df.iterrows():
            # Creating the question
            Question.objects.create(
                question_bank=question_bank,
                year=sheet,
                category="Yearly" if sheet.startswith('20') else "Topical",
                subject=row['Subject'],
                topic=row['Topic'],
                question_number=row['Question Number'],
                question_text=row['Question'],
            )
            
            # Iterating over the options
            for option in df.columns[range(5)]:
                # Validation for option
                if option in ['A', 'B', 'C', 'D', 'E']:
                    # Creating the options
                    Option.objects.create(
                        question="Current Question",
                        option_text=row[option],
                        is_correct=True if row['Correct Option'] == option else False,
                        why_correct_option=row['Why Correct Option']
                    )
                else:
                    raise ValidationError('Invalid format for options.')