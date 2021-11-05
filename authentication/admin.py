# from django.contrib import admin
# from .models import User, Company, Worker
# # Register your models here.


# class WorkerAdmin(admin.ModelAdmin):
#     list_display = ['username', 'email',
#                     'is_staff', 'is_active', 'date_joined']
#     list_filter = ['username', 'date_joined']
#     readonly_fields = ['date_joined']
#     model = Worker


# class CompanyAdmin(admin.ModelAdmin):
#     list_display = ['username', 'email',
#                     'is_staff', 'is_active', 'date_joined']
#     list_filter = ['username', 'date_joined']
#     readonly_fields = ['date_joined']
#     model = Company


# class UserAdmin(admin.ModelAdmin):
#     list_display = ['username', 'email', 'type',
#                     'is_staff', 'is_active', 'date_joined']
#     list_filter = ['username', 'date_joined']
#     readonly_fields = ['date_joined']
#     model = User


# admin.site.register(Worker, WorkerAdmin)
# admin.site.register(Company, CompanyAdmin)
# admin.site.register(User, UserAdmin)


from django.contrib import admin

from .forms import UserCreationForm, UserChangeForm
from .models import Company, CompanyProfile, Freelancer, FreelancerProfile, User, Admin
from django.contrib.auth.admin import UserAdmin


class UseAdmin(UserAdmin):
    list_display = ['username']
    add_form = UserCreationForm
    fieldsets = (
        (None, {'fields': ('username', 'password', 'type', )}),
        ("Permissions", {'fields':  ('is_superuser',
         'is_active', 'is_staff', 'user_permissions', 'groups',)}),
        ("Dates", {'fields':  ('last_login', 'date_joined',)}),
    )


class AdminAdmin(UserAdmin):
    list_display = ['username']
    add_form = UserCreationForm
    form = UserChangeForm
    fieldsets = (
        (None, {'fields': ('username', 'password',  'type', )}),
        ("Permissions", {'fields':  ('is_superuser',
         'is_active', 'is_staff', 'user_permissions', 'groups',)}),
        ("Dates", {'fields':  ('last_login', 'date_joined',)}),
    )


class CompanyProfileInline(admin.StackedInline):
    model = CompanyProfile


class CompanyAdmin(UserAdmin):
    list_display = ['username']
    inlines = [CompanyProfileInline, ]
    add_form = UserCreationForm
    fieldsets = (
        (None, {'fields': ('username', 'password', 'type', )}),
        ("Permissions", {'fields':  ('is_superuser',
         'is_active', 'is_staff', 'user_permissions', 'groups',)}),
        ("Dates", {'fields':  ('last_login', 'date_joined',)}),
    )


class FreelancerProfileInline(admin.StackedInline):
    model = FreelancerProfile


class FreelancerAdmin(UserAdmin):
    list_display = ['username']
    inlines = [FreelancerProfileInline, ]
    add_form = UserCreationForm
    fieldsets = (
        (None, {'fields': ('username', 'password', 'type', )}),
        ("Permissions", {'fields':  ('is_superuser',
         'is_active', 'is_staff', 'user_permissions', 'groups',)}),
        ("Dates", {'fields':  ('last_login', 'date_joined',)}),
    )


admin.site.register(User, UseAdmin)
admin.site.register(Admin, AdminAdmin)
admin.site.register(Company, CompanyAdmin)
admin.site.register(Freelancer, FreelancerAdmin)
