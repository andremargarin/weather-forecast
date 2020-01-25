from django.urls import path
from forecast.views import ForecastView

urlpatterns = [
    path('forecast/', ForecastView.as_view()),
]
