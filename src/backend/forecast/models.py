from django.db import models
from forecast.constants import WEATHER_CONDITIONS_CHOICES


class Forecast(models.Model):
    location = models.ForeignKey('locations.Location', on_delete=models.CASCADE)
    date = models.DateTimeField()
    temp = models.CharField(max_length=100, null=True)
    feels_like = models.CharField(max_length=100, null=True)
    temp_min = models.CharField(max_length=100, null=True)
    temp_max = models.CharField(max_length=100, null=True)
    pressure = models.CharField(max_length=100, null=True)
    sea_level = models.CharField(max_length=100, null=True)
    grnd_level = models.CharField(max_length=100, null=True)
    humidity = models.CharField(max_length=100, null=True)
    temp_kf = models.CharField(max_length=100, null=True)
    weather = models.PositiveIntegerField(choices=WEATHER_CONDITIONS_CHOICES, null=True)
    wind_speed = models.CharField(max_length=100, null=True)
    wind_deg = models.CharField(max_length=100, null=True)
    rain = models.CharField(max_length=100, null=True)
