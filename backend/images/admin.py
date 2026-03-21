from django.contrib import admin
from django.urls import path, reverse
from django.http import HttpResponseRedirect
from django.contrib import messages
from django.utils.html import format_html
from .models import AccessPassword, PasswordUsageLog, PortfolioImage, Tag
from datetime import datetime


@admin.register(Tag)
class TagAdmin(admin.ModelAdmin):
    list_display = ['name', 'slug']
    prepopulated_fields = {'slug': ('name',)}
    search_fields = ['name']


@admin.register(PortfolioImage)
class PortfolioImageAdmin(admin.ModelAdmin):
    list_display = ['name', 'category', 'date_taken', 'created_at', 'get_tags']
    list_filter = ['category', 'date_taken', 'tags']
    search_fields = ['name', 'description']
    readonly_fields = ['created_at']
    filter_horizontal = ['tags']
    
    fieldsets = (
        ('Image Info', {
            'fields': ('name', 'image', 'date_taken')
        }),
        ('Metadata', {
            'fields': ('coordinates', 'camera_used', 'description'),
            'classes': ('collapse',)
        }),
        ('Organization', {
            'fields': ('category', 'tags')
        }),
        ('Timestamps', {
            'fields': ('created_at',),
            'classes': ('collapse',)
        }),
    )
    
    def get_tags(self, obj):
        return ", ".join([tag.name for tag in obj.tags.all()])
    get_tags.short_description = 'Tags'
    
    # Add custom URL for bulk upload
    def get_urls(self):
        urls = super().get_urls()
        custom_urls = [
            path('bulk-upload/', self.admin_site.admin_view(self.bulk_upload_view), name='images_portfolioimage_bulk_upload'),
        ]
        return custom_urls + urls
    
    def bulk_upload_view(self, request):
        """Handle bulk upload of images"""
        if request.method == 'POST':
            uploaded_count = 0
            error_count = 0
            errors = []
            
            # Get form data
            category = request.POST.get('category', 'visitors')
            date_taken_str = request.POST.get('date_taken', '')
            coordinates = request.POST.get('coordinates', '')
            camera_used = request.POST.get('camera_used', '')
            description = request.POST.get('description', '')
            tag_ids = request.POST.getlist('tags')
            
            # Parse date
            if date_taken_str:
                try:
                    date_taken = datetime.strptime(date_taken_str, '%Y-%m-%d').date()
                except ValueError:
                    date_taken = datetime.now().date()
            else:
                date_taken = datetime.now().date()
            
            # Get uploaded files
            files = request.FILES.getlist('images')
            
            if not files:
                messages.error(request, '❌ No images selected for upload.')
            else:
                for file in files:
                    try:
                        # Create image
                        image = PortfolioImage.objects.create(
                            name=file.name.split('.')[0],
                            image=file,
                            date_taken=date_taken,
                            coordinates=coordinates if coordinates else None,
                            camera_used=camera_used if camera_used else None,
                            description=description if description else None,
                            category=category
                        )
                        
                        # Add tags
                        if tag_ids:
                            for tag_id in tag_ids:
                                try:
                                    tag = Tag.objects.get(id=int(tag_id))
                                    image.tags.add(tag)
                                except (Tag.DoesNotExist, ValueError):
                                    pass
                        
                        uploaded_count += 1
                    except Exception as e:
                        error_count += 1
                        errors.append(f"{file.name}: {str(e)}")
                
                # Display results
                if uploaded_count > 0:
                    messages.success(request, f'✅ Successfully uploaded {uploaded_count} image(s)!')
                if error_count > 0:
                    error_msg = f'❌ Failed to upload {error_count} image(s).'
                    if errors:
                        error_msg += f' {", ".join(errors[:3])}'
                    messages.error(request, error_msg)
            
            return HttpResponseRedirect(reverse('admin:images_portfolioimage_changelist'))
        
        # GET request - show form inline
        tags = Tag.objects.all()
        csrf_token = request.META.get('CSRF_COOKIE', '')
        
        context = {
            'title': 'Bulk Upload Images',
            'has_view_permission': self.has_view_permission(request),
            'site_header': self.admin_site.site_header,
            'site_title': self.admin_site.site_title,
            'opts': self.model._meta,
            'tags': tags,
            'csrf_token': csrf_token,
        }
        
        # Return response with inline HTML
        from django.shortcuts import render
        return render(request, 'admin/base_site.html', context)
    
    def changelist_view(self, request, extra_context=None):
        extra_context = extra_context or {}
        extra_context['bulk_upload_url'] = reverse('admin:images_portfolioimage_bulk_upload')
        return super().changelist_view(request, extra_context=extra_context)


@admin.register(AccessPassword)
class AccessPasswordAdmin(admin.ModelAdmin):
    list_display = ['category', 'password', 'created_at', 'expires_at', 'is_active']
    list_filter = ['category', 'is_active']
    search_fields = ['password']
    readonly_fields = ['created_at']


@admin.register(PasswordUsageLog)
class PasswordUsageLogAdmin(admin.ModelAdmin):
    list_display = ['password', 'used_at', 'ip_address']
    list_filter = ['used_at']
    search_fields = ['ip_address']
    readonly_fields = ['used_at', 'ip_address']