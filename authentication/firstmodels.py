from .serializers import (
    CompanyCustomRegistrationSerializer, WorkerCustomRegistrationSerializer
)
from rest_auth.registration.views import RegisterView
from django.shortcuts import render
from .views import CompanyRegistrationView, WorkerRegistrationView
from django.urls import path
from .models import Company, Worker
from rest_framework.authtoken.models import Token
from rest_auth.registration.serializers import RegisterSerializer
from rest_framework import serializers
from django.db import models
from django.contrib.auth.models import AbstractUser
from django.conf import settings


class User(AbstractUser):
    # Boolean fields to select the type of account.
    is_company = models.BooleanField(default=False)
    is_worker = models.BooleanField(default=False)


class Company(models.Model):
    company = models.OneToOneField(
        settings.AUTH_USER_MODEL, on_delete=models.CASCADE, blank=True, null=True)
    area = models.CharField(max_length=100)
    address = models.CharField(max_length=100)
    description = models.TextField()

    def __str__(self):
        return self.company.username


class Worker(models.Model):
    worker = models.OneToOneField(
        settings.AUTH_USER_MODEL, on_delete=models.CASCADE)
    country = models.CharField(max_length=100)

    def __str__(self):
        return self.worker.username


# SERIALIZERS


class CompanyCustomRegistrationSerializer(RegisterSerializer):
    company = serializers.PrimaryKeyRelatedField(
        read_only=True,)  # by default allow_null = False
    area = serializers.CharField(required=True)
    address = serializers.CharField(required=True)
    description = serializers.CharField(required=True)

    def get_cleaned_data(self):
        data = super(CompanyCustomRegistrationSerializer,
                     self).get_cleaned_data()
        extra_data = {
            'area': self.validated_data.get('area', ''),
            'address': self.validated_data.get('address', ''),
            'description': self.validated_data.get('description', ''),
        }
        data.update(extra_data)
        return data

    def save(self, request):
        user = super(CompanyCustomRegistrationSerializer, self).save(request)
        user.is_company = True
        user.save()
        company = Company(company=user, area=self.cleaned_data.get('area'),
                          address=self.cleaned_data.get('address'),
                          description=self.cleaned_data.get('description'))
        company.save()
        return user


class WorkerCustomRegistrationSerializer(RegisterSerializer):
    worker = serializers.PrimaryKeyRelatedField(
        read_only=True,)  # by default allow_null = False
    country = serializers.CharField(required=True)

    def get_cleaned_data(self):
        data = super(WorkerCustomRegistrationSerializer,
                     self).get_cleaned_data()
        extra_data = {
            'country': self.validated_data.get('country', ''),
        }
        data.update(extra_data)
        return data

    def save(self, request):
        user = super(WorkerCustomRegistrationSerializer, self).save(request)
        user.is_worker = True
        user.save()
        worker = Worker(worker=user, country=self.cleaned_data.get('country'))
        worker.save()
        return user


# URLS


app_name = 'authentication'

urlpatterns = [
    path('registration/company/', CompanyRegistrationView.as_view(),
         name='register-company'),
    path('registration/worker/', WorkerRegistrationView.as_view(),
         name='register-worker'),

]


# VIEWS


class CompanyRegistrationView(RegisterView):
    serializer_class = CompanyCustomRegistrationSerializer


class WorkerRegistrationView(RegisterView):
    serializer_class = WorkerCustomRegistrationSerializer


# CONFIG URLS


urlpatterns = [
    path('admin/', admin.site.urls),
    path('api-auth/', include('rest_framework.urls')),
    path('rest-auth/', include('rest_auth.urls')),
    path('rest-auth/registration/', include('rest_auth.registration.urls')),
    path('api/', include('authentication.urls', namespace='api')),
] + static(settings.STATIC_URL, document_root=settings.STATIC_ROOT)

if settings.DEBUG:
    urlpatterns += static(settings.MEDIA_URL,
                          document_root=settings.MEDIA_ROOT)
