from django.db import models
from django.utils import timezone

class AccessPassword(models.Model):
    CATEGORY_CHOICES = [
        ('friends', 'Friends'),
        ('employers', 'Potential Employers'),
        ('visitors', 'Regular Visitors'),
    ]
    
    password = models.CharField(max_length=255, unique=True)
    category = models.CharField(max_length=20, choices=CATEGORY_CHOICES)
    created_at = models.DateTimeField(auto_now_add=True)
    expires_at = models.DateTimeField(null=True, blank=True)  # None = infinite
    is_active = models.BooleanField(default=True)
    
    class Meta:
        ordering = ['-created_at']
    
    def __str__(self):
        return f"{self.category.upper()} - {self.password[:10]}..."
    
    def is_expired(self):
        if self.expires_at is None:
            return False
        return timezone.now() > self.expires_at


class PasswordUsageLog(models.Model):
    password = models.ForeignKey(AccessPassword, on_delete=models.CASCADE, related_name='usage_logs')
    used_at = models.DateTimeField(auto_now_add=True)
    ip_address = models.GenericIPAddressField(null=True, blank=True)
    
    class Meta:
        ordering = ['-used_at']
    
    def __str__(self):
        return f"{self.password.category} - {self.used_at}"


class PortfolioImage(models.Model):
    CATEGORY_CHOICES = [
        ('friends', 'Friends'),
        ('employers', 'Potential Employers'),
        ('visitors', 'Regular Visitors'),
    ]
    
    name = models.CharField(max_length=255)
    image = models.ImageField(upload_to='portfolio_images/')
    date_taken = models.DateField()
    coordinates = models.CharField(max_length=255, blank=True, null=True)
    camera_used = models.CharField(max_length=255, blank=True, null=True)
    description = models.TextField(blank=True, null=True)
    category = models.CharField(max_length=20, choices=CATEGORY_CHOICES, default='visitors')
    created_at = models.DateTimeField(auto_now_add=True)
    
    class Meta:
        ordering = ['-date_taken']
    
    def __str__(self):
        return self.name