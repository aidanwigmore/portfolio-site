from django.contrib import admin
from django.urls import path, include
from django.conf import settings
from django.conf.urls.static import static
from rest_framework import routers
from comments.views import CommentViewSet
from images.views import AccessPasswordViewSet, PortfolioImageViewSet
from ratings.views import RatableItemViewSet, ThumbsUpViewSet

router = routers.DefaultRouter()
router.register(r'comments', CommentViewSet)
router.register(r'passwords', AccessPasswordViewSet)
router.register(r'images', PortfolioImageViewSet, basename='images')
router.register(r'ratable-items', RatableItemViewSet)
router.register(r'thumbs-up', ThumbsUpViewSet)

urlpatterns = [
    path('admin/', admin.site.urls),
    path('api/', include(router.urls)),
]

# Serve media files locally when DEFAULT_FILE_STORAGE is not Azure
# (i.e. in development, or when no Azure credentials are configured).
if not getattr(settings, 'DEFAULT_FILE_STORAGE', '').endswith('AzureStorage'):
    urlpatterns += static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)