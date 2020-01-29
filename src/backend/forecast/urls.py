from django.urls import path
from forecast.views import ForecastDetailView

urlpatterns = [
    path('forecast/<int:location>/', ForecastDetailView.as_view(), name='forecast')
]
