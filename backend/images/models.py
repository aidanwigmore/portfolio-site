from django.db import models
from django.utils import timezone
import uuid
import os
from PIL import Image
from django.core.validators import FileExtensionValidator

def portfolio_image_path(instance, filename):
    """Organize images by category and UUID"""
    ext = 'webp'
    return f'portfolio_images/{instance.category}/{uuid.uuid4()}.{ext}'

class Tag(models.Model):
    name = models.CharField(max_length=100, unique=True)
    slug = models.SlugField(unique=True)

    def __str__(self):
        return self.name

    class Meta:
        ordering = ['name']


class AccessPassword(models.Model):
    CATEGORY_CHOICES = [
        ('friends', 'Friends'),
        ('employers', 'Potential Employers'),
        ('visitors', 'Regular Visitors'),
    ]

    password = models.CharField(max_length=255, unique=True)
    category = models.CharField(max_length=20, choices=CATEGORY_CHOICES)
    created_at = models.DateTimeField(auto_now_add=True)
    expires_at = models.DateTimeField(null=True, blank=True)
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
    image = models.ImageField(
        upload_to=portfolio_image_path,
        validators=[FileExtensionValidator(
            allowed_extensions=['jpg', 'jpeg', 'png', 'webp', 'gif', 'tiff']
        )]
    )
    date_taken = models.DateField()
    coordinates = models.CharField(max_length=255, blank=True, null=True)
    camera_used = models.CharField(max_length=255, blank=True, null=True)
    description = models.TextField(blank=True, null=True)
    category = models.CharField(max_length=20, choices=CATEGORY_CHOICES, default='visitors')
    tags = models.ManyToManyField(Tag, related_name='portfolio_images', blank=True)
    order = models.PositiveIntegerField(default=0)

    is_lossless = models.BooleanField(default=True, help_text='Image stored in lossless format')
    file_size = models.PositiveIntegerField(null=True, blank=True, help_text='File size in bytes')
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    class Meta:
        ordering = ['order', '-date_taken']
        indexes = [
            models.Index(fields=['category']),
            models.Index(fields=['date_taken']),
        ]

    def __str__(self):
        return self.name

    def save(self, *args, **kwargs):
        """Auto-convert to WebP lossless on save"""
        super().save(*args, **kwargs)

        if self.image:
            img_path = self.image.path

            if img_path.lower().endswith('.webp'):
                self.file_size = os.path.getsize(img_path)
                super().save(update_fields=['file_size'])
                return

            try:
                img = Image.open(img_path)
                icc_profile = img.info.get('icc_profile')

                webp_params = {
                    'lossless': True,
                    'method': 6,
                }
                if icc_profile:
                    webp_params['icc_profile'] = icc_profile

                webp_path = img_path.rsplit('.', 1)[0] + '.webp'
                img.save(webp_path, 'WEBP', **webp_params)

                file_size = os.path.getsize(webp_path)

                if img_path != webp_path and os.path.exists(img_path):
                    os.remove(img_path)

                self.image.name = self.image.name.rsplit('.', 1)[0] + '.webp'
                self.file_size = file_size
                super().save(update_fields=['image', 'file_size'])

            except Exception as e:
                print(f"Error converting image to WebP: {e}")
                self.file_size = os.path.getsize(img_path) if os.path.exists(img_path) else None
                super().save(update_fields=['file_size'])

    def get_file_size_display(self):
        """Human-readable file size"""
        if not self.file_size:
            return 'Unknown'

        size = self.file_size
        for unit in ['B', 'KB', 'MB', 'GB']:
            if size < 1024:
                return f'{size:.1f} {unit}'
            size /= 1024

        return f'{size:.1f} TB'

    def delete(self, *args, **kwargs):
        """Clean up image file on delete"""
        if self.image and os.path.exists(self.image.path):
            os.remove(self.image.path)
        super().delete(*args, **kwargs)
