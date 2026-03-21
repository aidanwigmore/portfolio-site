import { useState } from 'react';

import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemAvatar from '@mui/material/ListItemAvatar';
import ListItemText from '@mui/material/ListItemText';
import Box from '@mui/material/Box';

import LanguageIcon from '@mui/icons-material/Language';
import { IconButton, Modal, Tooltip, Typography } from '@mui/material';
import { ChevronLeft, ChevronRight, Close } from '@mui/icons-material';
import { ThumbUp } from '@mui/icons-material';

import ProjectData from "./ProjectData";
import { useThumbsUp } from '../../hooks/useThumbsUp';

import { CustomTypography } from "../../materials/Typography";
import Title from '../../components/Title';
import { lighten, darken } from '@mui/material/styles';

import Theme from "../../Theme";

interface ProjectProps {
  home?: boolean;
}

export default function Projects( { home } : ProjectProps ) {
  const { thumbsUpCounts, handleThumbsUp } = useThumbsUp('video');
    
  const [openImageModal, setOpenImageModal] = useState(false);
    const [carouselIndices, setCarouselIndices] = useState<number[]>(
      ProjectData.map(() => 0)
    );
    const [modalItemIndex, setModalItemIndex] = useState(0);
    const [modalImageIndex, setModalImageIndex] = useState(0);
    const items = ProjectData;

    const handleImageClick = (itemIndex: number, imgIndex: number) => {
      setModalItemIndex(itemIndex);
      setModalImageIndex(imgIndex);
      setOpenImageModal(true);
    };

    const handleCarouselPrev = (itemIndex: number) => {
      setCarouselIndices((prev) => {
        const newIndices = [...prev];
        const imagesLength = items[itemIndex].images?.length || 0;
        newIndices[itemIndex] = newIndices[itemIndex] === 0 ? imagesLength - 1 : newIndices[itemIndex] - 1;
        return newIndices;
      });
    };

    const handleCarouselNext = (itemIndex: number) => {
      setCarouselIndices((prev) => {
        const newIndices = [...prev];
        const imagesLength = items[itemIndex].images?.length || 0;
        newIndices[itemIndex] = newIndices[itemIndex] === imagesLength - 1 ? 0 : newIndices[itemIndex] + 1;
        return newIndices;
      });
    };

    const handleModalPrevImage = () => {
      const currentItem = items[modalItemIndex];
      if (currentItem.images) {
        setModalImageIndex((prev) =>
          prev === 0 ? currentItem.images!.length - 1 : prev - 1
        );
      }
    };

    const handleModalNextImage = () => {
      const currentItem = items[modalItemIndex];
      if (currentItem.images) {
        setModalImageIndex((prev) =>
          prev === currentItem.images!.length - 1 ? 0 : prev + 1
        );
      }
    };

    return (
    <>
      <Title children={"Projects I've Worked On"} />
      <List dense={false}>
        {items.map((item, index) => (
          <>
            <ListItem
            key={index}
            sx={{
              backgroundColor: index % 2 !== 0 ? Theme.palette.primary.light : lighten(Theme.palette.primary.light, 0.4),
              borderRadius: index === 0 ? '8px 8px 0px 0px' : index === items.length - 1 ? '0px 0px 8px 8px' : '0px',
              flexDirection: 'column',
            }}
          >
            <Box 
              sx={{
                display: 'flex', flexDirection: 'row',
                padding: '2vw',
                borderRadius: '8px',
                backgroundColor: index % 2 !== 0 ? Theme.palette.primary.main : Theme.palette.primary.light,
              }}
            >
              <ListItemText 
                key={`${item.title}-${index}`}
                primary={
                  <>
                    {item.title}
                    {
                      <Tooltip title={item.src} arrow>
                        <a href={item.src} target="_blank" rel="noopener noreferrer">
                          {item.src}
                        </a>
                      </Tooltip>
                    }
                  </>
                } 
                secondary={
                  item.description.map((desc, descIndex) => (
                    <span 
                      key={`${item.title}-desc-${descIndex}`}
                      style={{
                        display: 'block',
                        whiteSpace: 'nowrap',
                        overflow: 'hidden',
                        textOverflow: 'ellipsis',
                        fontSize: 'clamp(0.75rem, 2vw, 1rem)'
                      }}
                    >
                      {home === undefined && `-${desc}<br />`}
                    </span>
                  ))
                } 
              />
              <Box sx={{ display: 'flex', alignItems: 'center', gap: '0.5rem', margin: '1rem' }}>
                <IconButton 
                  onClick={() => handleThumbsUp(item.ratingCode)}
                  size="large"
                  sx={{color: Theme.palette.primary.dark, backgroundColor: Theme.palette.primary.main}}
                >
                  <ThumbUp />
                </IconButton>
                <Typography variant="body2">
                  {thumbsUpCounts[item.ratingCode || ``]}
                </Typography>
              </Box>
            {/* Single Image Carousel Display */}
            {item.images && item.images.length > 0 && (
              <Box
                sx={{
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                  gap: 2,
                  mt: 2,
                  width: '100%',
                  justifyContent: 'center',
                }}
              >
                <Box
                  sx={{
                    display: 'flex',
                    flexDirection: 'row',
                    alignItems: 'center',
                    gap: 2,
                    width: '100%',
                    justifyContent: 'center',
                  }}
                >
                  {item.images.length > 1 && (
                    <IconButton
                      onClick={() => handleCarouselPrev(index)}
                      size="small"
                    >
                      <ChevronLeft />
                    </IconButton>
                  )}

                  <Box
                    component="img"
                    src={item.images[carouselIndices[index]]}
                    onClick={() => handleImageClick(index, carouselIndices[index])}
                    sx={{
                      width: '300px',
                      height: '200px',
                      objectFit: 'cover',
                      borderRadius: '8px',
                      cursor: 'pointer',
                      '&:hover': { opacity: 0.8 },
                    }}
                  />

                  {item.images.length > 1 && (
                    <IconButton
                      onClick={() => handleCarouselNext(index)}
                      size="small"
                    >
                      <ChevronRight />
                    </IconButton>
                  )}
                </Box>
                
                {item.images.length > 1 && (
                  <Box sx={{ fontSize: '0.875rem', color: 'gray' }}>
                    {carouselIndices[index] + 1}/{item.images.length}
                  </Box>
                )}
              </Box>
            )}
            </Box>
          </ListItem>
          </>
          
        ))}
      </List>

      <Modal open={openImageModal} onClose={() => setOpenImageModal(false)}>
        <Box
          sx={{
            position: 'relative',
            width: '100%',
            height: '100vw',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            backgroundColor: 'rgba(0, 0, 0, 0.9)',
          }}
        >
          {items[modalItemIndex]?.images && (
            <>
              <Box
                component="img"
                src={items[modalItemIndex].images[modalImageIndex]}
                sx={{
                  maxWidth: '90%',
                  maxHeight: '90%',
                  objectFit: 'contain',
                }}
              />

              {/* Close Button */}
              <IconButton
                onClick={() => setOpenImageModal(false)}
                sx={{ position: 'absolute', top: 20, right: 20, color: 'white' }}
              >
                <Close fontSize="large" />
              </IconButton>

              {/* Previous Button */}
              {items[modalItemIndex].images.length > 1 && (
                <IconButton
                  onClick={handleModalPrevImage}
                  sx={{ position: 'absolute', left: 20, top: '50%', transform: 'translateY(-50%)', color: 'white' }}
                >
                  <ChevronLeft fontSize="large" />
                </IconButton>
              )}

              <Typography variant="body2" sx={{ position: 'absolute', bottom: 20, color: 'white' }}>
                {modalImageIndex + 1} / {items[modalItemIndex].images.length}
              </Typography>

              {/* Next Button */}
              {items[modalItemIndex].images.length > 1 && (
                <IconButton
                  onClick={handleModalNextImage}
                  sx={{ position: 'absolute', right: 20, top: '50%', transform: 'translateY(-50%)', color: 'white' }}
                >
                  <ChevronRight fontSize="large" />
                </IconButton>
              )}
            </>
          )}
        </Box>
      </Modal>
    </>
  );
}