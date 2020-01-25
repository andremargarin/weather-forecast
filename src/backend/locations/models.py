from django.db import models


class Location(models.Model):
    code = models.PositiveIntegerField(unique=True)
    name = models.CharField(max_length=200)
    country = models.CharField(max_length=2)
