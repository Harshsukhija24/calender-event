from django.contrib.auth.models import AbstractUser
from django.db import models
from django.conf import settings
from django.utils import timezone

class CustomUser(AbstractUser):
    email = models.EmailField(unique=True)

class Event(models.Model):
    title = models.CharField(max_length=300)
    description = models.TextField(blank=False)
    date = models.DateField(blank=False, default=timezone.now)  
    start_time = models.DateTimeField()
    end_time = models.DateTimeField()
    user = models.ForeignKey(settings.AUTH_USER_MODEL, on_delete=models.CASCADE)

    def __str__(self):
        return self.title
