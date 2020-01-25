from rest_framework.views import APIView
from rest_framework.response import Response

from openweatherclient.client import OpenWeatherClient
from forecast.models import Forecast
from locations.models import Location


class ForecastView(APIView):

    def get(self, request):
        city_id = self.request.query_params.get('city_id')
        forecasts = OpenWeatherClient.find_by_city_id(city_id)

        for forecast in forecasts:
            location = Location.objects.get(code=forecast['location_id'])
            forecast['location_id'] = location.pk
            obj, created = Forecast.objects.update_or_create(**forecast)

        return Response(forecasts)
