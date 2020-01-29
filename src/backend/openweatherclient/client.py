from datetime import datetime
import requests
from django.conf import settings


class OpenWeatherClient:

    OPEN_WEATHER_API_URL = 'http://api.openweathermap.org/data/2.5'

    main_keys = ['temp', 'feels_like', 'temp_min', 'temp_max', 'pressure',
        'sea_level', 'grnd_level', 'humidity', 'temp_kf'
    ]

    @classmethod
    def find_by_city_id(cls, id):
        url = f'{cls.OPEN_WEATHER_API_URL}/forecast?APPID={settings.OPEN_WEATHER_APPID}&units=metric&id={id}'
        response = requests.get(url)
        response_json = response.json()

        location_id = response_json['city']['id']

        forecasts = []
        for item in response_json.get('list'):
            forecast = {key: item.get('main', {}).get(key) for key in cls.main_keys}
            forecast['wind_speed'] = item.get('wind', {}).get('speed')
            forecast['wind_deg'] = item.get('wind', {}).get('deg')
            forecast['rain'] = item.get('rain', {}).get('3h')
            forecast['date'] = datetime.strptime(item.get('dt_txt'), '%Y-%m-%d %H:%M:%S')
            forecast['location_id'] = location_id
            forecast['weather'] = item.get('weather')[0]['id']
            forecasts.append(forecast)
        return forecasts
