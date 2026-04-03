from django.core.management.base import BaseCommand
from ratings.models import RatableItem

class Command(BaseCommand):
    help = 'Populate initial ratable items'

    def handle(self, *args, **options):
        # Videos
        videos = [
            ('batched-support-1', 'Picking Up Catering Orders from Strathcona MRKT'),
            ('batched-support-2', 'Subscribing To MRKTBox'),
            ('batched-support-3', 'Signing Up To MRKTBox'),
            ('capstone-1', 'Capstone Report 3'),
            ('capstone-2', 'Capstone Report 4'),
            ('capstone-3', 'Capstone Final Report'),
            ('php-1', 'Assignment 5'),
            ('php-2', 'Assignment 6'),
            ('php-3', 'Assignment 7'),
            ('soft-skills-1', "Entrepreneurship in today's world - Video Pitch"),
            ('soft-skills-2', "Tech Writing Presentation - Product Evaluation and Recommendation"),
            ('soft-skills-3', "Tech Writing Presentation 3 (Job posting)"),
        ]
        
        for external_id, title in videos:
            RatableItem.objects.get_or_create(
                item_type='video',
                external_id=external_id,
                defaults={'title': title}
            )
        
        # Projects
        projects = [
            ('fxns', 'Fxns'),
            ('ideaburn', 'IdeaBurn'),
            ('teabank', 'TeaBank'),
        ]
        
        for external_id, title in projects:
            RatableItem.objects.get_or_create(
                item_type='project',
                external_id=external_id,
                defaults={'title': title}
            )
        
        self.stdout.write(self.style.SUCCESS('Successfully populated ratable items'))