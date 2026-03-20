from rest_framework import viewsets, status
from rest_framework.decorators import action
from rest_framework.response import Response
from django.utils import timezone
from .models import AccessPassword, PasswordUsageLog, PortfolioImage
from .serializers import AccessPasswordSerializer, PasswordUsageLogSerializer, PortfolioImageSerializer


class AccessPasswordViewSet(viewsets.ModelViewSet):
    queryset = AccessPassword.objects.all()
    serializer_class = AccessPasswordSerializer
    
    @action(detail=False, methods=['post'])
    def verify_password(self, request):
        """Verify a password and log usage"""
        password = request.data.get('password')
        
        if not password:
            return Response({'error': 'Password required'}, status=status.HTTP_400_BAD_REQUEST)
        
        try:
            access_pwd = AccessPassword.objects.get(password=password, is_active=True)
            
            # Check if expired
            if access_pwd.is_expired():
                access_pwd.is_active = False
                access_pwd.save()
                return Response({'error': 'Password expired'}, status=status.HTTP_401_UNAUTHORIZED)
            
            # Log the usage
            ip = request.META.get('REMOTE_ADDR')
            PasswordUsageLog.objects.create(
                password=access_pwd,
                ip_address=ip
            )
            
            return Response({
                'valid': True,
                'category': access_pwd.category
            })
        except AccessPassword.DoesNotExist:
            return Response({'error': 'Invalid password'}, status=status.HTTP_401_UNAUTHORIZED)
    
    @action(detail=False, methods=['get'])
    def usage_stats(self, request):
        """Get usage stats for all passwords"""
        passwords = AccessPassword.objects.all()
        stats = []
        for pwd in passwords:
            stats.append({
                'id': pwd.id,
                'category': pwd.category,
                'total_uses': pwd.usage_logs.count(),
                'last_used': pwd.usage_logs.first().used_at if pwd.usage_logs.exists() else None,
                'created_at': pwd.created_at,
                'expires_at': pwd.expires_at,
                'is_active': pwd.is_active
            })
        return Response(stats)


class PortfolioImageViewSet(viewsets.ModelViewSet):
    queryset = PortfolioImage.objects.all()
    serializer_class = PortfolioImageSerializer
    
    @action(detail=False, methods=['get'])
    def by_category(self, request):
        """Get images filtered by category"""
        category = request.query_params.get('category')
        
        if not category:
            return Response({'error': 'Category parameter required'}, status=status.HTTP_400_BAD_REQUEST)
        
        images = PortfolioImage.objects.filter(category=category)
        return Response(PortfolioImageSerializer(images, many=True).data)