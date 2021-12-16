from .models import Job
from rest_framework import serializers
from authentication.serializers import ProfessionsSerialiezer, SearchCompanySerializer, SmallCompanySerializer


class JobSerializer(serializers.ModelSerializer):
    city = serializers.CharField(source='get_city_display')
    profession = ProfessionsSerialiezer()
    company = SmallCompanySerializer()

    class Meta:
        model = Job
        fields = ('id', 'company',  'name', 'slug',
                  'profession', 'min_salary', 'max_salary', 'after_meeting',
                  'city', 'created', 'updated', )


class JobCreateSerializer(serializers.ModelSerializer):
    class Meta:
        model = Job
        fields = ('id', 'company',  'name', 'slug', 'description', 'skills',
                  'profession', 'min_salary', 'max_salary', 'after_meeting',
                  'min_experience', 'max_experience', 'work_time',
                  'city', 'created', 'updated', 'active')
        read_only_fields = ['id', 'slug']


class JobRetrieveSerializer(serializers.ModelSerializer):
    city = serializers.CharField(source='get_city_display')
    profession = ProfessionsSerialiezer()
    # company = SmallCompanySerializer()

    class Meta:
        model = Job
        fields = ('id', 'company',  'name', 'slug',
                  'min_salary', 'max_salary', 'after_meeting',
                  'min_experience', 'max_experience', 'work_time',
                  'description', 'profession',
                  'skills', 'city', 'created', 'updated')
