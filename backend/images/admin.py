from django.contrib import admin
from .models import AccessPassword, PasswordUsageLog, PortfolioImage


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


@admin.register(PortfolioImage)
class PortfolioImageAdmin(admin.ModelAdmin):
    list_display = ['name', 'category', 'date_taken', 'created_at']
    list_filter = ['category', 'date_taken']
    search_fields = ['name']
    readonly_fields = ['created_at']