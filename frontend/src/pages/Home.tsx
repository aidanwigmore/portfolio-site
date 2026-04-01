import { useState, useEffect } from 'react';

import Box from '@mui/material/Box';
import Chip from '@mui/material/Chip';
import IconButton from '@mui/material/IconButton';
import FilterListIcon from '@mui/icons-material/FilterList';

import FilterModal from '@/components/FilterModal';
import Title from '@/components/Title';

import { getImagesByCategory, getImageUrl } from '@/api/galleryService';

import Videos from '@/pages/Videos/VideosIndex';
import Projects from '@/pages/Projects/ProjectsIndex';
import InstagramGalleries from '@/pages/Gallery/InstagramGalleryIndex';

import { PortfolioImage } from '@/types/Gallery';

import { CustomTypography } from '@/materials/Typography';

import MotionBox from '@/materials/MotionBox';

import { useTheme } from '@mui/material/styles';

export default function Home() {
  const theme = useTheme();

  const [homeImages, setHomeImages] = useState<PortfolioImage[]>([]);
  const [filteredImages, setFilteredImages] = useState<PortfolioImage[]>([]);
  const [currentImageIndex, setCurrentImageIndex] = useState<number>(0);
  const [selectedTags, setSelectedTags] = useState<Set<string>>(new Set());
  const [availableTags, setAvailableTags] = useState<string[]>([]);
  const [transitionSpeed, setTransitionSpeed] = useState<number>(5); // seconds
  const [sortOrder, setSortOrder] = useState<'newest' | 'oldest'>('newest');
  const [filterModalOpen, setFilterModalOpen] = useState<boolean>(false);

  // Fetch images
  useEffect(() => {
    const fetchVisitorImages = async () => {
      try {
        const response = await getImagesByCategory('visitors');
        setHomeImages(response.data);

        // Extract all unique tags
        const tags = new Set<string>();
        response.data.forEach((image: PortfolioImage) => {
          image.tags?.forEach((tag) => {
            tags.add(tag.name);
          });
        });
        setAvailableTags(Array.from(tags).sort());
      } catch {
        setHomeImages([]);
        setAvailableTags([]);
      }
    };

    fetchVisitorImages();
  }, []);

  // Filter and sort images based on selected tags and sort order
  useEffect(() => {
    let filtered = homeImages;

    if (selectedTags.size > 0) {
      filtered = homeImages.filter((image) =>
        image.tags?.some((tag) => selectedTags.has(tag.name))
      );
    }

    // Sort by date
    const sorted = [...filtered].sort((a, b) => {
      const dateA = new Date(a.date_taken || 0).getTime();
      const dateB = new Date(b.date_taken || 0).getTime();
      return sortOrder === 'newest' ? dateB - dateA : dateA - dateB;
    });

    setFilteredImages(sorted);
    setCurrentImageIndex(0);
  }, [selectedTags, homeImages, sortOrder]);

  // Slideshow interval with dynamic speed
  useEffect(() => {
    if (filteredImages.length <= 1) {
      return;
    }

    const interval = setInterval(() => {
      setCurrentImageIndex((prevIndex) => (prevIndex + 1) % filteredImages.length);
    }, transitionSpeed * 1000);

    return () => clearInterval(interval);
  }, [filteredImages.length, transitionSpeed]);

  // Validate current index
  useEffect(() => {
    if (currentImageIndex >= filteredImages.length) {
      setCurrentImageIndex(0);
    }
  }, [currentImageIndex, filteredImages.length]);

  const currentImage = filteredImages[currentImageIndex];
  const hasImages = filteredImages.length > 0;

  const handleTagClick = (tagName: string) => {
    const newSelectedTags = new Set(selectedTags);
    if (newSelectedTags.has(tagName)) {
      newSelectedTags.delete(tagName);
    } else {
      newSelectedTags.add(tagName);
    }
    setSelectedTags(newSelectedTags);
  };

  const handleClearFilters = () => {
    setSelectedTags(new Set());
  };

  const handleTransitionSpeedChange = (_event: Event, newValue: number | number[]) => {
    setTransitionSpeed(newValue as number);
  };

  const handleFilterModalOpen = () => {
    setFilterModalOpen(true);
  };

  const handleFilterModalClose = () => {
    setFilterModalOpen(false);
  };

  return (
    <>
      <MotionBox>
        <Projects home={true} />
      </MotionBox>

      <MotionBox>
        <Videos home={true} />
      </MotionBox>

      {/* Image Display Section */}
      <MotionBox
        sx={{
          display: 'flex',
          padding: '3rem',
          flexDirection: 'column',
          justifyContent: 'center',
          alignItems: 'center',
          borderRadius: '8px',
          position: 'relative',
        }}
      >
        {hasImages && currentImage ? (
          <>
            {/* Filter Button */}
            <Box
              sx={{
                position: 'absolute',
                top: '1rem',
                right: '1rem',
                zIndex: 10,
              }}
            >
              <IconButton
                onClick={handleFilterModalOpen}
                sx={{
                  backgroundColor: theme.palette.primary.contrastText,
                  color: theme.palette.primary.main,
                  '&:hover': {
                    backgroundColor: theme.palette.primary.main,
                    color: theme.palette.primary.contrastText,
                  },
                }}
              >
                <FilterListIcon />
              </IconButton>
            </Box>

            <img
              src={getImageUrl(currentImage.image)}
              alt={currentImage.name || 'Homepage Slideshow'}
              style={{
                width: '50vw',
                borderRadius: '8px',
                boxShadow: `0 4px 16px ${theme.palette.secondary.light}`,
                backgroundColor: theme.palette.primary.main,
                display: 'block',
              }}
            />
            <Box
              sx={{
                position: 'absolute',
                top: '1rem',
                left: '1rem',
                right: '1rem',
                display: 'flex',
                gap: '0.5rem',
                flexWrap: 'wrap',
                justifyContent: 'space-between',
                alignItems: 'center',
              }}
            >
              {currentImage.date_taken && (
                <>
                  <Chip
                    key={`${currentImage.date_taken}`}
                    label={
                      <CustomTypography
                        variant="button"
                        color={theme.palette.primary.main}
                      >
                        {currentImage.date_taken}
                      </CustomTypography>
                    }
                    size="small"
                    sx={{
                      backgroundColor: theme.palette.primary.contrastText,
                      color: theme.palette.primary.main,
                    }}
                  />
                  <Title
                    color={theme.palette.primary.contrastText}
                    variant="h6"
                    children={'My favourite photos'}
                    sx={{
                      flex: 1,
                      display: 'flex',
                      right: '1rem',
                      justifyContent: 'center',
                    }}
                  />
                </>
              )}
            </Box>
            <Box
              sx={{
                position: 'absolute',
                bottom: '1rem',
                left: '1rem',
                right: '1rem',
                display: 'flex',
                gap: '0.5rem',
                flexWrap: 'wrap',
              }}
            >
              {currentImage.tags &&
                currentImage.tags.length > 0 &&
                currentImage.tags
                  .sort((a, b) => a.name.length - b.name.length)
                  .map((tag, index) => (
                    <Chip
                      key={`${tag.name}-${index}`}
                      label={
                        <CustomTypography
                          variant="button"
                          color={theme.palette.primary.main}
                        >
                          {tag.name}
                        </CustomTypography>
                      }
                      size="small"
                      sx={{
                        backgroundColor: theme.palette.primary.contrastText,
                        color: theme.palette.primary.main,
                      }}
                    />
                  ))}
            </Box>
          </>
        ) : (
          <img
            src="/home_images/first_image.png"
            alt="Homepage Slideshow"
            style={{
              width: '50vw',
              borderRadius: '8px',
              boxShadow: `0 4px 16px ${theme.palette.secondary.light}`,
              backgroundColor: theme.palette.secondary.main,
            }}
          />
        )}
      </MotionBox>

      {/* Filter Modal */}
      <FilterModal
        filterModalOpen={filterModalOpen}
        handleFilterModalClose={handleFilterModalClose}
        availableTags={availableTags}
        selectedTags={selectedTags}
        handleClearFilters={handleClearFilters}
        transitionSpeed={transitionSpeed}
        handleTagClick={handleTagClick}
        handleTransitionSpeedChange={handleTransitionSpeedChange}
        setSortOrder={setSortOrder}
        sortOrder={sortOrder}
      ></FilterModal>

      <MotionBox>
        <InstagramGalleries home={true} />
      </MotionBox>
    </>
  );
}
