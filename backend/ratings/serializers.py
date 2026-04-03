from rest_framework import serializers
from .models import RatableItem, ThumbsUp

class RatableItemSerializer(serializers.ModelSerializer):
    thumbs_up_count = serializers.SerializerMethodField()
    
    class Meta:
        model = RatableItem
        fields = ['id', 'item_type', 'external_id', 'title', 'thumbs_up_count', 'created_at']
        read_only_fields = ['created_at']
    
    def get_thumbs_up_count(self, obj):
        return obj.thumbs_ups.count()

class ThumbsUpSerializer(serializers.ModelSerializer):
    class Meta:
        model = ThumbsUp
        fields = ['id', 'ratable_item', 'created_at']
        read_only_fields = ['created_at']