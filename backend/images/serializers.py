from rest_framework import serializers
from .models import AccessPassword, PasswordUsageLog, PortfolioImage, Tag


class TagSerializer(serializers.ModelSerializer):
    class Meta:
        model = Tag
        fields = ['id', 'name', 'slug']


class PortfolioImageSerializer(serializers.ModelSerializer):
    tags = TagSerializer(many=True, read_only=True)
    
    class Meta:
        model = PortfolioImage
        fields = [
            'id', 'name', 'image', 'date_taken', 'coordinates', 
            'camera_used', 'description', 'category', 'tags', 'created_at'
        ]


class PasswordUsageLogSerializer(serializers.ModelSerializer):
    class Meta:
        model = PasswordUsageLog
        fields = ['id', 'used_at', 'ip_address']


class AccessPasswordSerializer(serializers.ModelSerializer):
    usage_logs = PasswordUsageLogSerializer(many=True, read_only=True)
    total_uses = serializers.SerializerMethodField()
    is_expired = serializers.SerializerMethodField()
    
    class Meta:
        model = AccessPassword
        fields = [
            'id', 'password', 'category', 'created_at', 'expires_at', 
            'is_active', 'usage_logs', 'total_uses', 'is_expired'
        ]
    
    def get_total_uses(self, obj):
        return obj.usage_logs.count()
    
    def get_is_expired(self, obj):
        return obj.is_expired()