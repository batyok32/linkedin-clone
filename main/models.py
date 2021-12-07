from django.core.exceptions import ValidationError
from django.db import models
from authentication.models import Company, Profession
from .utils import CITIES
from django.template.defaultfilters import slugify


class Job(models.Model):

    name = models.CharField("Name", max_length=255)
    slug = models.SlugField("Slug", max_length=255, blank=True)

    profession = models.ForeignKey(Profession, on_delete=models.CASCADE)
    company = models.ForeignKey(Company, on_delete=models.CASCADE)
    city = models.CharField("Where to work", choices=CITIES,
                            max_length=50, default="Ag")

    min_salary = models.PositiveIntegerField(default=0)
    max_salary = models.PositiveIntegerField(default=0)
    after_meeting = models.BooleanField(default=False)
    min_experience = models.PositiveIntegerField(default=0)
    max_experience = models.PositiveIntegerField(default=0)
    work_time = models.PositiveIntegerField("Work time in hours", default=1)

    skills = models.TextField("Skills that is required...")
    description = models.TextField("Something about this job")

    created = models.DateTimeField(auto_now_add=True)
    updated = models.DateTimeField(auto_now=True)
    active = models.BooleanField(default=True)

    def __str__(self):
        return self.name

    class Meta:
        verbose_name = 'Job'
        verbose_name_plural = 'Jobs'

    def clean(self, *args, **kwargs):
        # add custom validation here
        if self.after_meeting == False:
            if self.min_salary >= self.max_salary:
                raise ValidationError("Invalid salary", code="invalid")
        if self.min_experience > self.max_experience:
            raise ValidationError("Invalid experience time", code="invalid")
        if self.work_time > 24:
            raise ValidationError(
                "Work time cannot be more than 24 hours", code="invalid")
        super(Job, self).clean(*args, **kwargs)

    def save(self, *args, **kwargs):
        self.full_clean()
        if self.after_meeting:
            self.min_salary = 0
            self.max_salary = 0
        if not self.id:
            # Newly created object, so set slug
            self.slug = slugify(self.name)
        super(Job, self).save(*args, **kwargs)
