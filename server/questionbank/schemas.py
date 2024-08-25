from uuid import UUID
from datetime import datetime
from ninja import Schema
from typing import List, Optional

# Schema for QuestionBank model
class QuestionBankSchema(Schema):
    id: UUID
    name: str
    description: Optional[str]
    additional_details: Optional[str]
    price: Optional[float]
    validity: Optional[int]
    created_at: datetime
    updated_at: datetime
    is_active: bool

# Schema for Question model
class QuestionSchema(Schema):
    id: UUID
    question_bank_id: UUID
    year: int
    category: str
    subject: str
    topic: str
    question_number: int
    question_text: str
    additional_details: Optional[str]
    unique_identifier: str
    created_at: datetime
    updated_at: datetime
    is_active: bool

# Schema for Option model
class OptionSchema(Schema):
    id: UUID
    question_id: UUID
    option_text: str
    is_correct: bool
    created_at: datetime
    updated_at: datetime
    is_active: bool
    why_correct_option_id: Optional[UUID]

# Schema for WhyCorrectOption model
class WhyCorrectOptionSchema(Schema):
    id: UUID
    why_correct_option_text: Optional[str]
    created_at: datetime
    updated_at: datetime
    is_active: bool

# Composite Schema for detailed Question including options
class DetailedQuestionSchema(QuestionSchema):
    options: List[OptionSchema] = []

# Composite Schema for detailed QuestionBank including questions
class DetailedQuestionBankSchema(QuestionBankSchema):
    questions: List[DetailedQuestionSchema] = []
