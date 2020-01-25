import json
import os
from django.core.management.base import BaseCommand

from locations.models import Location


class LoadLocations(BaseCommand):
    help = 'Load locations'

    def handle(self, *args, **options):
        cities_file = os.path.abspath('locations/data/city.list.json')
        with open(cities_file) as json_file:
            locations = json.load(json_file)
            for location in locations:
                obj, created = Location.objects.update_or_create(
                    code=location['id'],
                    name=location['name'],
                    country=location['country']
                )
