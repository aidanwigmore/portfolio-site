from rest_framework import viewsets, status
from rest_framework.decorators import action
from rest_framework.response import Response
from rest_framework.parsers import MultiPartParser, FormParser
from django.utils import timezone
from .models import AccessPassword, PasswordUsageLog, PortfolioImage, Tag
from .serializers import AccessPasswordSerializer, PasswordUsageLogSerializer, PortfolioImageSerializer, TagSerializer


class TagViewSet(viewsets.ModelViewSet):
    queryset = Tag.objects.all()
    serializer_class = TagSerializer


class PortfolioImageViewSet(viewsets.ModelViewSet):
    queryset = PortfolioImage.objects.all()
    serializer_class = PortfolioImageSerializer
    parser_classes = (MultiPartParser, FormParser)
    
    @action(detail=False, methods=['get'])
    def by_category(self, request):
        """Get images filtered by category"""
        category = request.query_params.get('category')
        
        if not category:
            return Response({'error': 'Category parameter required'}, status=status.HTTP_400_BAD_REQUEST)
        
        images = PortfolioImage.objects.filter(category=category)
        return Response(PortfolioImageSerializer(images, many=True).data)
    
    @action(detail=False, methods=['get'])
    def by_tag(self, request):
        """Get images filtered by tag"""
        tag_slug = request.query_params.get('tag')
        
        if not tag_slug:
            return Response({'error': 'Tag parameter required'}, status=status.HTTP_400_BAD_REQUEST)
        
        try:
            tag = Tag.objects.get(slug=tag_slug)
            images = PortfolioImage.objects.filter(tags=tag)
            return Response(PortfolioImageSerializer(images, many=True).data)
        except Tag.DoesNotExist:
            return Response({'error': 'Tag not found'}, status=status.HTTP_404_NOT_FOUND)
    
    @action(detail=False, methods=['post'])
    def bulk_upload(self, request):
        """Bulk upload multiple images
        
        Expected data:
        - images: List of image files
        - name: Image name (optional)
        - category: 'friends', 'employers', or 'visitors'
        - date_taken: YYYY-MM-DD format
        - coordinates: Location coordinates (optional)
        - camera_used: Camera model (optional)
        - description: Image description (optional)
        - tags: List of tag IDs (optional)
        """
        files = request.FILES.getlist('images')
        
        if not files:
            return Response(
                {'error': 'No files provided'}, 
                status=status.HTTP_400_BAD_REQUEST
            )
        
        created_images = []
        errors = []
        
        # Get common data from request
        category = request.data.get('category', 'visitors')
        date_taken = request.data.get('date_taken', timezone.now().date())
        coordinates = request.data.get('coordinates', '')
        camera_used = request.data.get('camera_used', '')
        description = request.data.get('description', '')
        tag_ids = request.data.getlist('tags', [])
        
        for file in files:
            try:
                # Create image instance
                name = request.data.get('name', file.name.split('.')[0])
                
                image = PortfolioImage.objects.create(
                    name=name,
                    image=file,
                    date_taken=date_taken,
                    coordinates=coordinates if coordinates else None,
                    camera_used=camera_used if camera_used else None,
                    description=description if description else None,
                    category=category
                )
                
                # Add tags if provided
                if tag_ids:
                    for tag_id in tag_ids:
                        try:
                            tag = Tag.objects.get(id=int(tag_id))
                            image.tags.add(tag)
                        except (Tag.DoesNotExist, ValueError):
                            pass
                
                created_images.append(PortfolioImageSerializer(image).data)
                
            except Exception as e:
                errors.append({
                    'file': file.name,
                    'error': str(e)
                })
        
        return Response({
            'success': True,
            'created': created_images,
            'errors': errors,
            'summary': {
                'total_created': len(created_images),
                'total_errors': len(errors),
                'total_files': len(files)
            }
        }, status=status.HTTP_201_CREATED if not errors else status.HTTP_207_MULTI_STATUS)


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
            
            if access_pwd.is_expired():
                access_pwd.is_active = False
                access_pwd.save()
                return Response({'error': 'Password expired'}, status=status.HTTP_401_UNAUTHORIZED)
            
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