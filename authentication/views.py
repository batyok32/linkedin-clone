# Models
from main.filters import FreelancersFilter
from .permissions import IsOwner, IsOwnerOrReadOnly
from .models import Company, CompanyProfile, Freelancer, FreelancerProfile, User
# from rest_framework.permissions import IsAuthenticated
from django.shortcuts import get_object_or_404

# Serializers
from .serializers import CompanyCreateSerializer, \
    CompanySerializer, \
    FreelancerCreateSerializer, FreelancerRetrieveSerializer, \
    FreelancerSerializer, FreelancerUpdateSerializer, \
    SearchCompanySerializer, SearchFreelancerSerializer

# RESTFRAMEWORK stuff
from rest_framework import generics
from rest_framework.views import APIView
from rest_framework.filters import SearchFilter
from django_filters import rest_framework as filters

from rest_framework.response import Response
from rest_framework import status
from rest_framework.parsers import MultiPartParser, JSONParser
from rest_framework.permissions import IsAuthenticated

from rest_framework.pagination import LimitOffsetPagination


class MyOffsetPagination(LimitOffsetPagination):
    """
    Custom Pagination Class
    """
    default_limit = 10
    max_limit = 1000


class CompanyListCreateView(generics.ListCreateAPIView):
    """
    List And Create Companies
    """
    serializer_class = CompanySerializer
    filter_backends = [SearchFilter]
    search_fields = ['$full_name']
    pagination_class = MyOffsetPagination
    queryset = CompanyProfile.objects.all()
    parser_classes = [JSONParser, MultiPartParser]

    def get_create_serializer(self, *args, **kwargs):
        """
        Return the serializer instance that should be used for validating and
        deserializing input, and for serializing output.
        """
        serializer_class = CompanyCreateSerializer
        kwargs.setdefault('context', self.get_serializer_context())
        return serializer_class(*args, **kwargs)

    def create(self, request, *args, **kwargs):
        """
        Creating company usign username, password
        Creating company profile usign request.data and CompanyCreateSerializer
        """
        # print("Creating company")
        serializer = self.get_create_serializer(data=request.data)
        if serializer.is_valid():
            try:
                # print("Trying create user for company")
                username = request.data['username']
                password = request.data['password']
                company = Company.objects.create_user(
                    username=username, password=password, type="COMPANY")
                company.save()
                # print("Created company")
            except:
                # print("Company already exists")
                return Response("User already exists", status=status.HTTP_400_BAD_REQUEST)
        else:
            # print("Not correct profile form", serializer.errors)
            return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
        serializer.save(user=company)
        headers = self.get_success_headers(serializer.data)
        return Response(serializer.data, status=status.HTTP_201_CREATED, headers=headers)


class FreelancerListCreateView(generics.ListCreateAPIView):
    """
    List and Create Freelancers
    """
    queryset = FreelancerProfile.objects.all()
    serializer_class = FreelancerSerializer
    filter_backends = [filters.DjangoFilterBackend]
    filterset_class = FreelancersFilter
    pagination_class = MyOffsetPagination

    def get_create_serializer(self, *args, **kwargs):
        """
        Return the serializer instance that should be used for validating and
        deserializing input, and for serializing output.
        """
        serializer_class = FreelancerCreateSerializer
        kwargs.setdefault('context', self.get_serializer_context())
        return serializer_class(*args, **kwargs)

    def create(self, request, *args, **kwargs):
        """
        Creating freelancer usign username, password
        Creating freelancer profile usign request.data and FreelancerCreateSerializer
        """
        # print("Creating freelancer")
        serializer = self.get_create_serializer(data=request.data)
        if serializer.is_valid():
            try:
                # print("Trying create user for freelancer")
                username = request.data['username']
                password = request.data['password']
                freelancer = Freelancer.objects.create_user(
                    username=username, password=password, type="FREELANCER")
                freelancer.save()
                # print("Created freelancer")
            except:
                # print("Freelancer already exists")
                return Response("User already exists", status=status.HTTP_400_BAD_REQUEST)
        else:
            # print("Not correct profile form", serializer.errors)
            return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
        serializer.save(user=freelancer)
        headers = self.get_success_headers(serializer.data)
        return Response(serializer.data, status=status.HTTP_201_CREATED, headers=headers)


class CompanyRetrieveView(generics.RetrieveUpdateDestroyAPIView):
    """
    Retrieve, Update, Delete View (If user is owner)
    """
    queryset = CompanyProfile.objects.all()
    serializer_class = CompanySerializer
    permission_classes = [IsAuthenticated]

    def get_object(self):
        queryset = self.filter_queryset(self.get_queryset())
        # print("Company retrieve")
        user = self.request.user
        # print("Company user", user)
        obj = get_object_or_404(queryset, user=user.id)
        # print("Found company", obj)
        # May raise a permission denied
        self.check_object_permissions(self.request, obj)
        return obj


class RetrieveStrangerCompanyView(generics.RetrieveAPIView):
    """
    Retrieve
    """
    queryset = CompanyProfile.objects.all()
    serializer_class = CompanySerializer

    def get_object(self):
        queryset = self.filter_queryset(self.get_queryset())
        company_pk = self.kwargs['pk']
        obj = get_object_or_404(queryset, user=company_pk)

        self.check_object_permissions(self.request, obj)
        return obj


class RetrieveStrangerFreelancerView(generics.RetrieveAPIView):
    """
    Retrieve
    """
    queryset = FreelancerProfile.objects.all()
    serializer_class = FreelancerRetrieveSerializer

    def get_object(self):
        queryset = self.filter_queryset(self.get_queryset())
        free_pk = self.kwargs['pk']
        obj = get_object_or_404(queryset, user=free_pk)

        self.check_object_permissions(self.request, obj)
        return obj


class FreelancerRetrieveView(generics.RetrieveUpdateDestroyAPIView):
    """
    Retrieve, Update, Delete View (If user is owner or has permissions on that)
    """
    queryset = FreelancerProfile.objects.all()
    serializer_class = FreelancerSerializer
    permission_classes = [IsOwnerOrReadOnly, ]

    def get_object(self):
        queryset = self.filter_queryset(self.get_queryset())
        user = self.request.user
        # print("user", user)
        obj = get_object_or_404(queryset, user=user)
        # May raise a permission denied
        self.check_object_permissions(self.request, obj)
        return obj

    def get_update_serializer(self, *args, **kwargs):
        """
        Return the serializer instance that should be used for validating and
        deserializing input, and for serializing output.
        """
        serializer_class = FreelancerUpdateSerializer
        kwargs.setdefault('context', self.get_serializer_context())
        return serializer_class(*args, **kwargs)

    def update(self, request, *args, **kwargs):
        partial = kwargs.pop('partial', False)
        instance = self.get_object()
        serializer = self.get_update_serializer(
            instance, data=request.data, partial=partial)
        serializer.is_valid(raise_exception=True)
        self.perform_update(serializer)
        if getattr(instance, '_prefetched_objects_cache', None):
            # If 'prefetch_related' has been applied to a queryset, we need to
            # forcibly invalidate the prefetch cache on the instance.
            instance._prefetched_objects_cache = {}
        return Response(serializer.data)


class UserExistView(APIView):
    """
    Checks if user Exists
    """

    def post(self, request, *args, **kwargs):
        username = request.data['username']
        if username:
            exist = User.objects.filter(username=username).exists()
            if exist:
                return Response(True, status=status.HTTP_200_OK)
            return Response(False, status=status.HTTP_200_OK)
        return Response(False, status=status.HTTP_400_BAD_REQUEST)


class CompanyExistView(APIView):
    """
    Checks if company profile Exists
    """

    def post(self, request, *args, **kwargs):
        # print("Checking company exist")
        exist = None
        full_name = request.data['full_name']
        if full_name:
            # print("In post of check user")
            if request.user.is_authenticated:
                # print("USER is authenticated")
                exist = CompanyProfile.objects.filter(
                    full_name=full_name).exclude(user=request.user).exists()
            else:
                # print("NO user")
                exist = CompanyProfile.objects.filter(
                    full_name=full_name).exists()
            if exist:
                # print("Company exist")
                return Response(True, status=status.HTTP_200_OK)
            # print("Company not exist")
            return Response(False, status=status.HTTP_200_OK)
        return Response(False, status=status.HTTP_400_BAD_REQUEST)


class SearchCompanyView(generics.ListAPIView):
    """
    Search Companies
    """
    serializer_class = SearchCompanySerializer
    filter_backends = [SearchFilter]
    search_fields = ['$full_name']
    pagination_class = MyOffsetPagination
    queryset = CompanyProfile.objects.all()


class SearchFreelancerView(generics.ListAPIView):
    """
    Search Freelancers
    """
    serializer_class = SearchFreelancerSerializer
    filter_backends = [SearchFilter]
    search_fields = ['$full_name']
    pagination_class = MyOffsetPagination
    queryset = FreelancerProfile.objects.all()
