from django.contrib import admin
from .models import RatableItem, ThumbsUp

@admin.register(RatableItem)
class RatableItemAdmin(admin.ModelAdmin):
    list_display = ('title', 'item_type', 'external_id', 'created_at', 'thumbs_up_count')
    list_filter = ('item_type', 'created_at')
    search_fields = ('title', 'external_id')
    
    def thumbs_up_count(self, obj):
        return obj.thumbs_ups.count()
    thumbs_up_count.short_description = 'Thumbs Up Count'


@admin.register(ThumbsUp)
class ThumbsUpAdmin(admin.ModelAdmin):
    list_display = ('ratable_item', 'created_at')
    list_filter = ('created_at',)
    search_fields = ('ratable_item__title',)