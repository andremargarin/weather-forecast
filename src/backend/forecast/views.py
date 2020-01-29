from datetime import datetime
from django.core.cache import cache
from rest_framework import generics
from rest_framework.response import Response

from openweatherclient.client import OpenWeatherClient
from forecast.models import Forecast
from forecast.serializers import ForecastSerializer
from locations.models import Location


class ForecastDetailView(generics.ListAPIView):
    queryset = Forecast.objects.all()
    serializer_class = ForecastSerializer

    def list(self, request, *args, **kwargs):
        location_code = self.kwargs.get('location')

        if not cache.get(f'forecast:{location_code}'):
            forecasts = OpenWeatherClient.find_by_city_id(location_code)
            location = Location.objects.get(code=location_code)

            Forecast.objects.filter(location=location.pk).delete()
            for forecast in forecasts:
                forecast['location_id'] = location.pk
                Forecast.objects.create(**forecast)
            cache.set(f'forecast:{location_code}', True, 60*60)

        serializer = self.get_serializer(self.get_queryset(), many=True)
        return Response(serializer.data)

    def get_queryset(self):
        queryset = super().get_queryset()
        location = self.kwargs.get('location')
        date = self.request.query_params.get('date', '2020-01-27')

        if date is None:
            date = datetime.now()
        else:
            date = datetime.strptime(date, '%Y-%m-%d')

        queryset = queryset.filter(
            location__code=location,
            date__date=datetime.strftime(date, '%Y-%m-%d')
        )
        return queryset
