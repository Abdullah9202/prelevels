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


def convert_to_serializable(obj):
    if isinstance(obj, pd.Timestamp):
        return obj.isoformat()
    elif isinstance(obj, pd.Timedelta):
        return str(obj)
    elif isinstance(obj, pd.Timestamp):
        return obj.isoformat()
    return str(obj)


@receiver(post_save, sender=QuestionBank)
def process_question_file(sender, instance, created, **kwargs):
    if created and instance.question_file:
        # Checking file extension
        file_extension = os.path.splitext(instance.question_file.name)[1]
        if file_extension != '.xlsx':
            raise ValidationError('Invalid file. Only .xlsx files are allowed.')
        
        # Reading the Excel file
        question_file = pd.ExcelFile(instance.question_file.path)
        
        # Getting the specified sheets from the instance
        specified_sheets = instance.sheet_names.split(',')

        # Check if the user entered "all"
        if 'all' in specified_sheets:
            specified_sheets = question_file.sheet_names

        # Iterating over each sheet
        for sheet in specified_sheets:
            # Validation for sheet_names
            if sheet not in question_file.sheet_names:
                raise ValidationError(f'Sheet "{sheet}" not found in the Excel file.')
            
            df = pd.read_excel(instance.question_file.path, sheet_name=sheet)

            # Iterating over the rows and creating the question objects
            for _, row in df.iterrows():
                # Creating the question
                question = Question.objects.create(
                    question_bank=instance,
                    question_number=convert_to_serializable(row['Question Number']),
                    question_text=convert_to_serializable(row['Question']),
                    question_image=convert_to_serializable(row['Question Image']),
                    subject=convert_to_serializable(row['Subject']),
                    topic=convert_to_serializable(row['Topic']),
                )
                
                # Iterating over the options
                for option, option_image in zip(['A', 'B', 'C', 'D', 'E'], ['A Image', 'B Image', 'C Image', 'D Image', 'E Image']):
                    # Validation for options and options images
                    if option in df.columns and option_image in df.columns:
                        # Creating the options with option images
                        Option.objects.create(
                            question=question,
                            option_text=convert_to_serializable(row[option]),
                            option_image=convert_to_serializable(row[option_image]),
                            is_correct=True if row['Answer'] == option else False,
                            is_active=True,
                        )
                    else:
                        raise ValidationError('Invalid format for options.')
                
                # Creating why correct option
                WhyCorrectOption.objects.create(
                    question=question,
                    why_correct_option_text=convert_to_serializable(row['Answer Explanation']),
                    why_correct_option_image=convert_to_serializable(row['Answer Explanation Image']),
                    is_active=True,
                )
    else:
        raise ValidationError("Unknown error occured while processing the question file.")