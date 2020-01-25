from django.urls import path
from locations.views import LocationView


urlpatterns = [
    path('location/', LocationView.as_view()),
]
