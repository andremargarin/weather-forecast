from rest_framework import serializers
from forecast.models import Forecast


class ForecastSerializer(serializers.ModelSerializer):

    weather_description = serializers.SerializerMethodField()

    class Meta:
        model = Forecast
        fields = [
            'location', 'date', 'temp', 'feels_like', 'temp_min',
            'temp_max', 'pressure', 'sea_level', 'grnd_level', 'humidity',
            'temp_kf', 'weather', 'weather_description', 'wind_speed', 'wind_deg', 'rain'
        ]

    def get_weather_description(self, obj):
        return obj.get_weather_display()
