# from django.db.models import fields
from djoser.serializers import UserCreateSerializer
from django.contrib.auth import get_user_model
from rest_framework import serializers
from .models import FreelancerProfile, CompanyProfile, Company, Profession


User = get_user_model()


# For Sign up and list
class UserCreateeSerializer(UserCreateSerializer):

    class Meta(UserCreateSerializer.Meta):
        model = User
        fields = ('id', 'username', 'type', 'password')


# Detail User
class UserDetailSerializer(serializers.ModelSerializer):

    class Meta:
        model = User
        fields = ("id", "username", "is_active",
                  'type', "is_staff", "date_joined")
        read_only_fields = ['id', 'is_active', "is_staff", "date_joined"]


class CustomUserCreateSerializer(serializers.ModelSerializer):

    class Meta:
        model = User
        fields = ("id", "username", 'password', "is_active",
                  'type', "is_staff", "date_joined")
        read_only_fields = ['id', 'is_active', "is_staff", "date_joined"]


class ProfessionsSerialiezer(serializers.ModelSerializer):

    class Meta:
        model = Profession
        fields = ('id',  'name', 'slug',)


class FreelancerSerializer(serializers.ModelSerializer):
    logo = serializers.SerializerMethodField()
    city_display = serializers.CharField(source='get_city_display')
    profession = ProfessionsSerialiezer()

    class Meta:
        model = FreelancerProfile
        fields = ('id',  'user', 'full_name',
                  'profession', 'knowledge', 'city', 'city_display',
                  'experience', 'projects', 'phone_number',
                  'birth_date',
                  'logo', 'created')

    def get_logo(self, obj):
        return self.context['request'].build_absolute_uri(obj.logo.url)


class FreelancerUpdateSerializer(serializers.ModelSerializer):

    class Meta:
        model = FreelancerProfile
        fields = ('id',  'user', 'full_name',
                  'profession', 'knowledge', 'city',
                  'experience', 'projects', 'phone_number',
                  'birth_date',
                  'logo', 'created')


class FreelancerRetrieveSerializer(serializers.ModelSerializer):
    logo = serializers.SerializerMethodField()
    city = serializers.CharField(source='get_city_display')
    profession = ProfessionsSerialiezer()

    class Meta:
        model = FreelancerProfile
        fields = ('id', 'user', 'full_name',
                  'profession', 'knowledge', 'city',
                  'experience', 'projects', 'phone_number',
                  'birth_date',
                  'logo', 'created')

    def get_logo(self, obj):
        return self.context['request'].build_absolute_uri(obj.logo.url)


class CompanySerializer(serializers.ModelSerializer):
    logo = serializers.SerializerMethodField()
    company_type_full = serializers.CharField(
        source='get_company_type_display')

    class Meta:
        model = CompanyProfile
        fields = ('id', 'user',  'full_name', 'slug',
                  'description', 'address', 'found_date',
                  'company_type', 'company_type_full', 'phone_number', 'logo')
        read_only_fields = ['id', 'user']

    def get_logo(self, obj):
        return self.context['request'].build_absolute_uri(obj.logo.url)


class CompanyCreateSerializer(serializers.ModelSerializer):

    class Meta:
        model = CompanyProfile
        fields = ('id', 'user',  'full_name',
                  'description', 'address', 'found_date',
                  'company_type', 'phone_number', 'logo')
        read_only_fields = ['id', 'user']

    def create(self, validated_data):
        instance = CompanyProfile.objects.create(**validated_data)
        return instance


class FreelancerCreateSerializer(serializers.ModelSerializer):

    class Meta:
        model = FreelancerProfile
        fields = ('id', 'user', 'full_name',
                  'profession', 'experience', 'knowledge',
                  'city', 'projects',
                  'phone_number', 'birth_date',
                  'logo')
        read_only_fields = ['id', 'user']


class SearchCompanySerializer(serializers.ModelSerializer):

    class Meta:
        model = CompanyProfile
        fields = ('id', 'full_name', 'user')


class SearchFreelancerSerializer(serializers.ModelSerializer):

    class Meta:
        model = FreelancerProfile
        fields = ('id', 'full_name', 'user')


class SmallCompanySerializer(serializers.ModelSerializer):
    logo = serializers.SerializerMethodField()
    full_name = serializers.SerializerMethodField()
    slug = serializers.SerializerMethodField()

    class Meta:
        model = Company
        fields = ('id', 'username', 'logo', 'full_name', 'slug')

    def get_logo(self, obj):
        return self.context['request'].build_absolute_uri(obj.profile.logo.url)

    def get_full_name(self, obj):
        return obj.profile.full_name

    def get_slug(self, obj):
        return obj.profile.slug
