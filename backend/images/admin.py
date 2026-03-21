from django.contrib import admin
from .models import AccessPassword, PasswordUsageLog, PortfolioImage, Tag


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