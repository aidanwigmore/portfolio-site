from django.db import models

class RatableItem(models.Model):
    ITEM_TYPES = [
        ('video', 'Video'),
        ('project', 'Project'),
    ]
    
    item_type = models.CharField(max_length=10, choices=ITEM_TYPES)
    external_id = models.CharField(max_length=255)  # Reference to hardcoded item
    title = models.CharField(max_length=255)
    created_at = models.DateTimeField(auto_now_add=True)
    
    def __str__(self):
        return f"{self.get_item_type_display()} - {self.title}"
    
    class Meta:
        unique_together = ('item_type', 'external_id')
        ordering = ['created_at']

class ThumbsUp(models.Model):
    ratable_item = models.ForeignKey(RatableItem, on_delete=models.CASCADE, related_name='thumbs_ups')
    created_at = models.DateTimeField(auto_now_add=True)
    
    def __str__(self):
        return f"Thumbs up for {self.ratable_item.title}"
    
    class Meta:
        ordering = ['-created_at']