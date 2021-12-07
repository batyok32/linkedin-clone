from django.contrib import admin

from .forms import UserCreationForm, UserChangeForm
from .models import Company, CompanyProfile, Freelancer, FreelancerProfile, User, Admin, Profession
from django.contrib.auth.admin import UserAdmin


class UseAdmin(UserAdmin):
    list_display = ['id', 'username']
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
    list_display = ['id', 'username']
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


@admin.register(Profession)
class ProfessionAdmin(admin.ModelAdmin):
    list_display = ('id', 'name', 'slug')
    prepopulated_fields = {'slug': ('name',)}


admin.site.register(User, UseAdmin)
admin.site.register(Admin, AdminAdmin)
admin.site.register(Company, CompanyAdmin)
admin.site.register(Freelancer, FreelancerAdmin)
