from django.urls import path
from . import views


urlpatterns = [
    path('jobs/<int:pk>/', views.JobRetrieveView.as_view()),
    path('jobs/', views.JobListCreateView.as_view()),
    path('professions/<int:pk>/', views.ProfessionsRetrieveView.as_view()),
    path('professions/', views.ProfessionsListView.as_view()),
]
