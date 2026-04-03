from rest_framework import viewsets, status
from rest_framework.decorators import action
from rest_framework.response import Response
from .models import RatableItem, ThumbsUp
from .serializers import RatableItemSerializer, ThumbsUpSerializer

class RatableItemViewSet(viewsets.ModelViewSet):
    queryset = RatableItem.objects.all()
    serializer_class = RatableItemSerializer
    
    @action(detail=True, methods=['post'])
    def add_thumbs_up(self, request, pk=None):
        """Add a thumbs up to a ratable item"""
        ratable_item = self.get_object()
        thumbs_up = ThumbsUp.objects.create(ratable_item=ratable_item)
        serializer = ThumbsUpSerializer(thumbs_up)
        return Response(serializer.data, status=status.HTTP_201_CREATED)
    
    @action(detail=False, methods=['get'])
    def by_type(self, request):
        """Get all ratable items by type (video or project)"""
        item_type = request.query_params.get('type')
        if not item_type:
            return Response({'error': 'type parameter required'}, status=status.HTTP_400_BAD_REQUEST)
        
        items = RatableItem.objects.filter(item_type=item_type)
        serializer = self.get_serializer(items, many=True)
        return Response(serializer.data)


class ThumbsUpViewSet(viewsets.ModelViewSet):
    queryset = ThumbsUp.objects.all()
    serializer_class = ThumbsUpSerializer