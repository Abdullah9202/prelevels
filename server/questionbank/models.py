from django.db import models
from django.urls import reverse
from django.utils.translation import gettext as _
import uuid


# Question bank model
class QuestionBank(models.Model):
    id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
    name = models.CharField(_("Name"), max_length=50, null=False, default="Untitled Question Bank")
    description = models.TextField(_("Description"), null=True)
    additional_details = models.TextField(_("Additional Details"), null=True, blank=True)
    price = models.DecimalField(_("Price"), max_digits=10, decimal_places=3, null=True)
    discount = models.DecimalField(_("Discount"), max_digits=10, decimal_places=3, null=True)
    validity = models.IntegerField(_("Validity"), null=True)
    created_at = models.DateTimeField(_("Created At"), auto_now_add=True)
    updated_at = models.DateTimeField(_("Updated At"), auto_now=True)
    is_active = models.BooleanField(_("Is Active"), default=True)

    class Meta:
        verbose_name = _("QuestionBank")
        verbose_name_plural = _("QuestionBanks")

    def __str__(self):
        return self.name

    def get_absolute_url(self):
        return reverse("questionbank:QuestionBank-detail", kwargs={"id": self.id})


# Question Model
class Question(models.Model):
    id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
    # Foreign Key for question bank (One to Many)
    question_bank = models.ForeignKey(QuestionBank, verbose_name=_("Question Bank"), related_name="questions", on_delete=models.CASCADE)
    year = models.IntegerField(_("Year"), null=False)
    category = models.CharField(_("Category"), max_length=50, null=False)
    subject = models.CharField(_("Subject"), max_length=50, null=False)
    topic = models.CharField(_("Topic"), max_length=50, null=False)
    question_number = models.IntegerField(_("Question Number"), null=False)
    question_text = models.TextField(_("Question Text"), null=False)
    additional_details = models.TextField(_("Additional Details"), null=True, blank=True)
    unique_identifier = models.CharField(_("Unique Identifier"), max_length=100, unique=True, blank=True)
    created_at = models.DateTimeField(_("Created At"), auto_now_add=True)
    updated_at = models.DateTimeField(_("Updated At"), auto_now=True)
    is_active = models.BooleanField(_("Is Active"), default=True)

    class Meta:
        verbose_name = _("Question")
        verbose_name_plural = _("Questions")
    
    # Fuction to save unique identifier
    def save(self, *args, **kwargs) -> None:
        if not self.unique_identifier:
            self.unique_identifier = f"{(self.question_bank.name).replace(" ", "")}_{self.year}_{self.category}_{self.subject}_{self.topic}_{self.question_number}"
        super().save(*args, **kwargs)

    def __str__(self):
        return f"{self.question_number} - {self.question_text} - {self.question_bank.name}"

    def get_absolute_url(self):
        return reverse("questionbank:Question-detail", kwargs={"id": self.id})


# Options Model
class Option(models.Model):
    id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
    # Foreign key for question (Each option can occur in only one question)
    question = models.ForeignKey("questionbank.Question", verbose_name=_("Question"), related_name="options" ,on_delete=models.CASCADE)
    option_text = models.TextField(_("Option Text"), null=False)
    is_correct = models.BooleanField(_("Is Correct"), default=False)
    created_at = models.DateTimeField(_("Created At"), auto_now_add=True)
    updated_at = models.DateTimeField(_("Updated At"), auto_now=True)
    is_active = models.BooleanField(_("Is Active"), default=True)
    # One-to-one relationship with WhyCorrectOption (Each why correct statement will be unique to each option)
    why_correct_option = models.OneToOneField("questionbank.WhyCorrectOption", verbose_name=_("Why Correct Option"), on_delete=models.CASCADE, null=True)
    

    class Meta:
        verbose_name = _("Option")
        verbose_name_plural = _("Options")

    def __str__(self):
        return f"{self.option_text} - {self.question.question_text}"

    def get_absolute_url(self):
        return reverse("questionbank:Option_detail", kwargs={"id": self.id})


# Why Correct Option Model
class WhyCorrectOption(models.Model):
    id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
    why_correct_option_text = models.TextField(_("Why Correct Option Text"), null=True)
    created_at = models.DateTimeField(_("Created At"), auto_now_add=True)
    updated_at = models.DateTimeField(_("Updated At"), auto_now=True)
    is_active = models.BooleanField(_("Is Active"), default=True)

    class Meta:
        verbose_name = _("WhyCorrectOption")
        verbose_name_plural = _("WhyCorrectOptions")

    def __str__(self):
        return self.why_correct_option_text

    def get_absolute_url(self):
        return reverse("questionbank:WhyCorrectOption_detail", kwargs={"id": self.id})
