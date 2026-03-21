import { useState, useEffect, useCallback } from 'react';
import {
  Box,
  Grid,
  Card,
  CardMedia,
  CardContent,
  Typography,
  Dialog,
  DialogTitle,
  DialogContent,
  Alert,
  CircularProgress,
} from '@mui/material';
import { CustomButton } from '../../materials/Button';
import PasswordPrompt from './PasswordPrompt';
import { getImagesByCategory, getImageUrl } from '../../api/galleryService';
import { PortfolioImage } from '../../types/Gallery';

import Theme from "../../Theme";

export default function ImageGallery() {
  const [category, setCategory] = useState<'friends' | 'employers' | 'visitors' | null>(null);
  const [images, setImages] = useState<PortfolioImage[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [selectedImage, setSelectedImage] = useState<PortfolioImage | null>(null);

  const fetchImages = useCallback(async (cat: string) => {
    setLoading(true);
    setError(null);
    try {
      const response = await getImagesByCategory(cat);
      setImages(response.data);
    } catch {
      setError('Failed to load images. Please try again.');
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    if (category) {
      fetchImages(category);
    }
  }, [category, fetchImages]);

  const handlePasswordSuccess = (cat: 'friends' | 'employers' | 'visitors') => {
    setCategory(cat);
  };

  const handleLogout = () => {
    setCategory(null);
    setImages([]);
    setError(null);
  };

  if (!category) {
    return <PasswordPrompt onSuccess={handlePasswordSuccess} />;
  }

  return (
    <Box sx={{ p: 3, backgroundColor: Theme.palette.primary.main, borderRadius: '8px' }}>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', }}>
        <Typography variant="h4">
          Gallery
        </Typography>
        
        <Typography variant="h4">
          Welcome, { category }
        </Typography>

        <CustomButton onClick={handleLogout}>
          Go Back
        </CustomButton>
      </Box>

      {loading && (
        <Box sx={{ display: 'flex', justifyContent: 'center', mt: 4 }}>
          <CircularProgress />
        </Box>
      )}

      {error && (
        <Alert severity="error" sx={{ mb: 2 }}>
          {error}
        </Alert>
      )}

      {!loading && !error && images.length === 0 && (
        <Typography color="text.secondary">No images available for this category.</Typography>
      )}

      <Grid container spacing={2}>
        {images.map((img) => (
          <Grid size={{ xs: 12, sm: 6, md: 4 }} key={img.id}>
            <Card
              onClick={() => setSelectedImage(img)}
              sx={{
                cursor: 'pointer',
                height: '100%', 
                animation: 'none',
                '&:hover': {
                  animation: 'pulse 2s infinite',
                    '@keyframes pulse': {
                    '100%': { opacity: 1 },
                    '50%': { opacity: 0.6 },
                    '0%': { opacity: 1 },
                  }
              },    
              }}
            >
              <CardMedia
                component="img"
                height="200"
                image={getImageUrl(img.image)}
                alt={img.name}
                sx={{
                  animation: 'none',
                  '&:hover': {
                    animation: 'pulse 2s infinite',
                    '@keyframes pulse': {
                    '100%': { opacity: 1 },
                    '50%': { opacity: 0.8 },
                    '0%': { opacity: 1 },
                  }
                },                
              }}
              />
              <CardContent>
                <Typography variant="subtitle1" noWrap>{img.name}</Typography>
                {img.date_taken && (
                  <Typography variant="body2" color="text.secondary">
                    {new Date(img.date_taken).toLocaleDateString()}
                  </Typography>
                )}
                {img.camera_used && (
                  <Typography variant="body2" color="text.secondary">
                    {img.camera_used}
                  </Typography>
                )}
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>

      <Dialog
        open={!!selectedImage}
        onClose={() => setSelectedImage(null)}
        maxWidth="md"
        fullWidth
        sx={{backgroundColour: Theme.palette.primary.dark}}
      >
        {selectedImage && (
          <Box sx={{backgroundColor: Theme.palette.primary.dark,}}>
            <DialogTitle>{selectedImage.name}</DialogTitle>
            <DialogContent>
              <Box
                component="img"
                src={getImageUrl(selectedImage.image)}
                alt={selectedImage.name}
                sx={{ width: '100%', borderRadius: 1, mb: 2 }}
              />
              {selectedImage.description && (
                <Typography variant="body1" sx={{ mb: 1 }}>
                  {selectedImage.description}
                </Typography>
              )}
              {selectedImage.date_taken && (
                <Typography variant="body2" color="text.secondary">
                  <strong>Date Taken:</strong> {new Date(selectedImage.date_taken).toLocaleDateString()}
                </Typography>
              )}
              {selectedImage.camera_used && (
                <Typography variant="body2" color="text.secondary">
                  <strong>Camera:</strong> {selectedImage.camera_used}
                </Typography>
              )}
              {selectedImage.coordinates && (
                <Typography variant="body2" color="text.secondary">
                  <strong>Coordinates:</strong> {selectedImage.coordinates}
                </Typography>
              )}
            </DialogContent>
          </Box>
        )}
      </Dialog>
    </Box>
  );
}
