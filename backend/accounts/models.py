
from django.contrib.auth.models import AbstractUser
from django.db import models

def user_profile_pic_path(instance, filename):
    return f'profiles/{instance.username}/{filename}'

class User(AbstractUser):
    full_name = models.CharField(max_length=150, blank=True)
    dob = models.DateField(null=True, blank=True)
    profile_pic = models.ImageField(upload_to=user_profile_pic_path, null=True, blank=True)

    EMAIL_FIELD = 'email'
    REQUIRED_FIELDS = ['email']

    def __str__(self):
        return self.username
