from rest_framework import generics
from rest_framework.response import Response
from locations.serializers import LocationSerializer
from locations.models import Location


class LocationView(generics.ListAPIView):
    queryset = Location.objects.all()
    serializer_class = LocationSerializer

    def get_queryset(self):
        queryset = Location.objects.filter()

        code = self.request.query_params.get('code', None)
        if code is not None:
            return queryset.filter(code=code)

        name = self.request.query_params.get('name', None)
        if name is not None:
            queryset = queryset.filter(name__icontains=name)
        return queryset
