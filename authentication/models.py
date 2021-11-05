from django.core.exceptions import ValidationError
from django.db import models
from django.contrib.auth.models import AbstractBaseUser, PermissionsMixin, BaseUserManager
from django.utils import timezone
from main.models import Profession
from imagekit.models import ProcessedImageField
from pilkit.processors import ResizeToFill
from django.core.files.storage import default_storage
from django.conf import settings
from django.core.validators import MinValueValidator, MaxValueValidator


def select_storage():
    return default_storage if settings.DEBUG else "Fine"


class UserManager(BaseUserManager):
    def _create_user(self, username, password, **extra_fields):
        """
        Create and save a user with the given username, email, and password.
        """
        if not username:
            raise ValueError("Users must haven a name")

        username = self.model.normalize_username(username)

        user = self.model(username=username, **extra_fields)
        user.set_password(password)
        user.save()

        return user

    def create_user(self, username, password=None, **extra_fields):
        extra_fields.setdefault('is_staff', False)
        extra_fields.setdefault('is_superuser', False)
        return self._create_user(username, password, **extra_fields)

    def create_superuser(self, username, password=None, **extra_fields):
        extra_fields.setdefault('is_staff', True)
        extra_fields.setdefault('is_superuser', True)
        extra_fields.setdefault('is_active', True)
        extra_fields.setdefault('type', "ADMIN")

        if extra_fields.get('is_staff') is not True:
            raise ValueError('Superuser must have is_staff=True.')
        if extra_fields.get('is_superuser') is not True:
            raise ValueError('Superuser must have is_superuser=True.')

        return self._create_user(username, password, **extra_fields)


class User(AbstractBaseUser, PermissionsMixin):
    class Types(models.TextChoices):
        FREELANCER = "FREELANCER", "Freelancer"
        COMPANY = "COMPANY", "Company"
        ADMIN = "ADMIN", 'Admin'

    type = models.CharField("Type", max_length=50,
                            choices=Types.choices, default=Types.FREELANCER)

    username = models.CharField(
        "Username for Login",
        max_length=255, unique=True)

    is_active = models.BooleanField(default=True)
    is_staff = models.BooleanField(default=False)

    objects = UserManager()
    date_joined = models.DateTimeField('Joined date', default=timezone.now)

    USERNAME_FIELD = "username"
    REQUIRED_FIELDS = ['type']

    def __str__(self):
        return self.username

    def save(self, *args, **kwargs):
        self.full_clean()
        super(User, self).save(*args, **kwargs)

# Freelancer MODEL


class FreelancerManager(UserManager):
    """
    Used for returning only freelancers
    """

    def get_queryset(self, *args, **kwargs):
        return super().get_queryset(*args, **kwargs).filter(type=User.Types.FREELANCER)


class FreelancerProfile(models.Model):
    """
    Profile Model for Freelancer
    """
    CITIES = (
        ('Ag', 'Ashgabat'),
        ('Ah', 'Ahal'),
        ('Bl', 'Balkan'),
        ('Mr', 'Mary'),
        ('Dz', 'Dasoguz'),
        ('Lb', 'Lebap'),
    )
    user = models.OneToOneField(
        User, related_name="freelancer_profile", on_delete=models.CASCADE)
    full_name = models.CharField("Full Name", max_length=255)
    profession = models.ForeignKey(
        Profession, related_name="freelancer", on_delete=models.CASCADE)
    experience = models.TextField("Work experience")
    knowledge = models.TextField("Degree / University / What do you know")
    city = models.CharField("Living City", choices=CITIES,
                            max_length=50, default="Ag")
    projects = models.TextField("Which projects you did")
    phone_number = models.BigIntegerField('Contact phone number')
    birth_date = models.DateField()
    min_price = models.PositiveIntegerField("Minimum cost of project")
    max_price = models.PositiveIntegerField("Maximum cost of project")
    logo = ProcessedImageField(
        processors=[ResizeToFill(150, 100)],
        format="WebP",
        options={"quality": 100},
        upload_to='freelancers/', storage=select_storage,
        default="default.jpg"
    )

    def clean(self, *args, **kwargs):
        if self.phone_number >= 99361000000 and self.phone_number <= 99365999999:
            # It is phone number
            pass
        elif self.phone_number >= 99312000000 and self.phone_number <= 99312999999:
            # It is work number
            pass
        else:
            raise ValidationError("Invalid phone number", code="invalid")
        super(FreelancerProfile, self).clean(*args, **kwargs)

    def save(self, *args, **kwargs):
        self.full_clean()
        super(FreelancerProfile, self).save(*args, **kwargs)


class Freelancer(User):
    """
    It is layer of User model for Freelancer 
    """

    objects = FreelancerManager()

    class Meta:
        proxy = True

    @property
    def profile(self):
        return self.freelancer_profile

    def save(self, *args, **kwargs):
        # if not self.pk:
        self.type = User.Types.FREELANCER
        return super().save(*args, **kwargs)

# Admins


class AdminManager(UserManager):
    """
    Used for returning only admins
    """

    def get_queryset(self, *args, **kwargs):
        return super().get_queryset(*args, **kwargs).filter(type=User.Types.ADMIN)


class Admin(User):
    """
    It is layer of User model for Admin 
    """
    objects = AdminManager()

    class Meta:
        proxy = True
        verbose_name = "Admin"
        verbose_name_plural = "Admins"

    def save(self, *args, **kwargs):
        # if not self.pk:
        self.type = User.Types.ADMIN
        self.is_staff = True
        return super().save(*args, **kwargs)


# COMPANY MODEL

class CompanyManager(UserManager):
    """
    Used for returning only companies
    """

    def get_queryset(self, *args, **kwargs):
        return super().get_queryset(*args, **kwargs).filter(type=User.Types.COMPANY)


class CompanyProfile(models.Model):
    """
    Profile for company
    """
    class Types(models.TextChoices):
        HJ = "OHH", "Hojalyk Jemgyýeti"
        IP = "IP", "Telekeçi"
    user = models.OneToOneField(
        User, related_name="company_profile", on_delete=models.CASCADE)
    logo = ProcessedImageField(
        processors=[ResizeToFill(150, 100)],
        format="WebP",
        options={"quality": 100},
        upload_to='companies/',
        storage=select_storage,
        default="default.jpg"
    )
    full_name = models.CharField("Full Name", max_length=255, unique=True)
    description = models.TextField("Comapany Information")
    address = models.CharField("Address of Company", max_length=255)
    found_date = models.DateField("Date of Foundation of Company")
    company_type = models.CharField(
        "Type Of Company", max_length=50, choices=Types.choices)
    phone_number = models.BigIntegerField('Contact phone number')

    def clean(self, *args, **kwargs):
        # add custom validation here
        if self.phone_number >= 99361000000 and self.phone_number <= 99365999999:
            # It is phone number
            pass
        elif self.phone_number >= 99312000000 and self.phone_number <= 99312999999:
            # It is work number
            pass
        else:
            raise ValidationError("Invalid phone number", code="invalid")
        super(CompanyProfile, self).clean(*args, **kwargs)

    def save(self, *args, **kwargs):
        self.full_clean()
        super(CompanyProfile, self).save(*args, **kwargs)


class Company(User):
    """
    It is layer of User model for Company 
    """

    objects = CompanyManager()

    class Meta:
        proxy = True
        verbose_name = 'Company'
        verbose_name_plural = 'Companies'

    @property
    def profile(self):
        return self.company_profile

    def save(self, *args, **kwargs):
        self.type = User.Types.COMPANY
        return super().save(*args, **kwargs)
