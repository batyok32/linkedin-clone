# RESTFRAMEWORK stuff
from rest_framework import generics
from authentication.views import MyOffsetPagination
from .models import Job
from .serializers import JobCreateSerializer, JobRetrieveSerializer, JobSerializer
from .filters import JobFilter
from authentication.models import Profession
from authentication.serializers import ProfessionsSerialiezer
from django_filters import rest_framework as filters
from rest_framework.filters import SearchFilter
from rest_framework import status
from rest_framework.response import Response


class JobListCreateView(generics.ListCreateAPIView):
    """
    List And Create Jobs
    """
    serializer_class = JobSerializer
    filter_backends = [filters.DjangoFilterBackend]
    filterset_class = JobFilter
    pagination_class = MyOffsetPagination
    queryset = Job.objects.all()

    def get_create_serializer(self, *args, **kwargs):
        """
        Return the serializer instance that should be used for validating and
        deserializing input, and for serializing output.
        """
        serializer_class = JobCreateSerializer
        kwargs.setdefault('context', self.get_serializer_context())
        return serializer_class(*args, **kwargs)

    def create(self, request, *args, **kwargs):
        if request.user.is_authenticated and request.user.is_company:
            print("In create job")
            serializer = self.get_create_serializer(
                data={**request.data, "company": request.user.id})
            print("Data", request.data)
            if serializer.is_valid():
                self.perform_create(serializer)
                headers = self.get_success_headers(serializer.data)
                print("Created", serializer.data)
                return Response(serializer.data, status=status.HTTP_201_CREATED, headers=headers)
            else:
                return Response(serializer.errors)
        else:
            return Response("Not Authenticated", status=status.HTTP_400_BAD_REQUEST)


class JobRetrieveView(generics.RetrieveAPIView):
    """
    List And Create Jobs
    """
    serializer_class = JobRetrieveSerializer
    queryset = Job.objects.all()


class ProfessionsListView(generics.ListAPIView):
    """
    List Professions
    """
    serializer_class = ProfessionsSerialiezer
    filter_backends = [SearchFilter]
    search_fields = ['$name']
    pagination_class = MyOffsetPagination
    queryset = Profession.objects.filter(active=True)


class ProfessionsRetrieveView(generics.RetrieveAPIView):
    """
    Retrieve View
    """
    queryset = Profession.objects.all()
    serializer_class = ProfessionsSerialiezer
