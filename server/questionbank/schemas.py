from uuid import UUID
from datetime import datetime
from ninja import Schema
from typing import List, Optional


# Schema for Category model
class CategorySchema(Schema):
    id: UUID
    name: str
    created_at: Optional[datetime] = None
    updated_at: Optional[datetime] = None
    is_active: bool = True


# Schema for QuestionBank model (Full)
class QuestionBankSchema(Schema):
    category: CategorySchema
    id: UUID
    name: str
    question_bank_image: Optional[str] = None
    description: Optional[str] = None
    additional_details: Optional[str] = None
    question_file: Optional[str] = None
    question_count: int
    price: int = None
    discount: Optional[int] = None
    validity: Optional[int] = None
    created_at: Optional[datetime] = None
    updated_at: Optional[datetime] = None
    is_active: bool = True

    class Config:
        orm_mode = True

# Schema for QuestionBank model (Short)
class QuestionBankSchema_Short(Schema):
    id: UUID
    name: str
    question_bank_image: Optional[str] = None
    description: Optional[str] = None
    additional_details: Optional[str] = None
    is_active: bool = True

    class Config:
        orm_mode = True


# Schema for Option model
class OptionSchema(Schema):
    question: UUID
    id: UUID
    option_text: Optional[str] = None
    option_image: Optional[str] = None
    is_correct: bool
    created_at: Optional[datetime] = None
    updated_at: Optional[datetime] = None
    is_active: bool = True
    
    class Config:
        orm_mode = True


# Schema for WhyCorrectOption model
class WhyCorrectOptionSchema(Schema):
    question: UUID
    id: UUID
    why_correct_option_text: Optional[str] = None
    created_at: Optional[datetime] = None
    updated_at: Optional[datetime] = None
    is_active: bool = True
    
    class Config:
        orm_mode = True


# Schema for Question model (Full)
class QuestionSchema(Schema):
    question_bank: QuestionBankSchema_Short # Using Short Question Bank Schema
    id: UUID
    subject: str
    topic: str
    question_number: int
    question_image: Optional[str] = None
    question_text: Optional[str] = None
    additional_details: Optional[str] = None
    unique_identifier: Optional[str]
    created_at: Optional[datetime] = None
    updated_at: Optional[datetime] = None
    is_active: bool = True
    options: List[OptionSchema] = []
    why_correct_option: Optional[WhyCorrectOptionSchema] = None
    
    class Config:
        orm_mode = True

# Schema for Question model (Short)
class QuestionSchema_Short(Schema):
    id: UUID
    subject: str
    topic: str
    question_number: int
    question_image: Optional[str] = None
    question_text: Optional[str] = None
    additional_details: Optional[str] = None
    is_active: bool = True
    options: List[OptionSchema] = []
    why_correct_option: Optional[WhyCorrectOptionSchema] = None
    
    class Config:
        orm_mode = True


# Save question Schema
class SaveQuestionSchema(Schema):
    id: UUID
    saved_at: datetime
    user: UUID
    question_bank: UUID
    question: UUID


# Schema for Report Question
class ReportQuestionSchema(Schema):
    id: UUID
    created_at: datetime
    question_bank: UUID
    question: UUID
    comment: Optional[str] = None
