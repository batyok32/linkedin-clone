from django.db import models

# Create your models here.


class Profession(models.Model):
    name = models.CharField("Name of Profession", max_length=255, unique=True)
    slug = models.SlugField("Slug", max_length=255, unique=True)
    created = models.DateTimeField(auto_now_add=True)
    updated = models.DateTimeField(auto_now=True)
    active = models.BooleanField(default=True)

    def __str__(self):
        return self.name

    class Meta:
        verbose_name = 'Profession'
        verbose_name_plural = 'Professions'
