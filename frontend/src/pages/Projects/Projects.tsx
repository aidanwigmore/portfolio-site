import { useState } from 'react';

import {
  List,
  ListItem,
  ListItemText,
  Box,
  Modal, 
} from '@mui/material';
import { Card } from '@mui/material';
import { 
  ChevronLeft, 
  ChevronRight, 
  Close,
} from '@mui/icons-material';

import { lighten } from '@mui/material/styles';

import ProjectData from "@/pages/Projects/ProjectData";

import { useThumbsUp } from '@/hooks/useThumbsUp';
import Title from '@/components/Title';
import { CustomTypography } from "@/materials/Typography";

import CustomIconButton from '@/materials/IconButton';
import ThumbUp from '@/components/ThumbUp';
import LanguageTwoToneIcon from '@mui/icons-material/LanguageTwoTone';
import Theme from "@/Theme";

import { CustomDivider } from '@/materials/Divider';

// import { type TooltipProps } from '@mui/material/Tooltip';

interface ProjectProps {
  home?: boolean;
}

export default function Projects( { home } : ProjectProps ) {
  const { handleThumbsUp } = useThumbsUp('video');
    
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
        {items.map((item: any, index: number) => (
          <Box key={`project-${index}`}>
            <ListItem
              key={`list-item-${index}`}
              sx={{
                backgroundColor: index % 2 !== 0 ? Theme.palette.primary.light : lighten(Theme.palette.primary.light, 0.4),
                borderRadius: index === 0 ? '8px 8px 0px 0px' : index === items.length - 1 ? '0px 0px 8px 8px' : '0px',
                flexDirection: 'column',
                boxShadow: '0 8px 32px rgba(0, 0, 0, 0.1)',
              }}
            >
            <Box 
              key={`box-item-${index}`}
              sx={{
                display: 'flex', 
                flexDirection: 'column',
                alignItems: 'flex-start',
                padding: '2vw',
                borderRadius: '8px',
                gap: '1rem',
              }}
            >
              <ListItemText 
                key={`list-item-text-${index}`}
                primary={
                  <>
                    {
                      <Box display="flex" flexDirection="row" justifyContent="center" padding="1rem">
                        <CustomTypography variant="h4" >
                          {item.title}
                        </CustomTypography>
                      </Box>
                    }
                    <CustomDivider sx={{margin: '1rem'}}/>
                    {index > 0 && (
                      <Card>
                      <Box
                        component="iframe"
                        src={item.src}
                        sx={{
                          width: '50vw',
                          height: { xs: '50vh', sm: '50vh', md: '50vh' },
                          border: 'none',
                          borderRadius: '8px',
                        }}
                      />
                    </Card>
                    )}
                      
                    { index === 0 && (
                      <Box display="flex" flexDirection="row" justifyContent="center" padding="1rem">
                        <CustomIconButton
                          name={item.src}
                          actionText={"Navigate to"}
                          onAction={() => window.open(item.src)} 
                          icon={
                              <LanguageTwoToneIcon
                              sx={{
                                '& path': {
                                  fill: Theme.palette.primary.main,
                                  transition: 'fill 0.3s ease',
                                },
                                '& path:nth-of-type(2)': {
                                  fill: Theme.palette.secondary.main,
                                  transition: 'fill 0.3s ease',
                                },
                              }}
                            />
                          }
                          ratingCode={'all'}
                          placement={"left"}
                        >
                        </CustomIconButton>
                      </Box>
                      
                    )
                    }
                    <CustomDivider sx={{margin: '1rem'}}/>
                    {
                      <Box display="flex" flexDirection="row" justifyContent="center" padding="1rem">
                        <ThumbUp index={index} name={item.title} ratingCode={item.ratingCode} onThumbsUp={() => handleThumbsUp(item.ratingCode)}/>
                      </Box>
                    }
                    <CustomDivider sx={{margin: '1rem'}}/>
                  </>
                } 
                secondary={
                  item.description.map((desc: any, descIndex: any) => (
                    <span 
                      key={`${item.title}-desc-${descIndex}`}
                      style={{
                        display: 'block',
                        whiteSpace: 'wrap',
                        overflow: 'hidden',
                        textOverflow: 'ellipsis',
                        fontSize: 'clamp(0.75rem, 2vw, 1rem)'
                      }}
                    >
                      {home === undefined && `-${desc}`}
                    </span>
                  ))
                } 
              />
              {item.images && item.images.length > 0 && (
                <Box
                  key={`image-box-column-${index}`}
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
                    key={`image-box-row-${index}`}
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
                      <CustomIconButton
                        key={`image-iconbutton-prev-${index}`}
                        name={`Image`}
                        actionText={"Previous"}
                        onAction={() => handleCarouselPrev(index)}
                        icon={<ChevronLeft 
                          key={`image-chevron-left-${index}`}
                          sx={{
                            '& path': {
                                fill: Theme.palette.secondary.main,
                                transition: 'fill 0.3s ease',
                            },
                            '& path:nth-of-type(2)': {
                                fill: Theme.palette.secondary.main,
                                transition: 'fill 0.3s ease',
                            },  
                          }}
                        />}
                        size="small"
                        ratingCode="all"
                        placement="right"
                      >
                      </CustomIconButton>
                    )}

                    <Box
                      key={`image-box-${index}`}
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
                      <CustomIconButton
                        placement='right'
                        key={`image-iconbutton-next-${index}`}
                        onAction={() => handleCarouselNext(index)}
                        size="small"
                        name={"Image"}
                        actionText={"Next"}
                        ratingCode={"all"}
                        icon={<ChevronRight 
                          key={`image-chevron-left-${index}`}
                          sx={{
                            '& path': {
                                fill: Theme.palette.secondary.main,
                                transition: 'fill 0.3s ease',
                            },
                            '& path:nth-of-type(2)': {
                                fill: Theme.palette.secondary.main,
                                transition: 'fill 0.3s ease',
                            },  
                          }}
                        />}
                      >
                      </CustomIconButton>
                    )}
                  </Box>
                  
                  {item.images.length > 1 && (
                    <Box 
                      key={`image-index-${index}`}
                      sx={{ 
                        fontSize: '0.875rem', 
                        color: 'gray' }}
                      >
                      <CustomTypography>
                        {carouselIndices[index] + 1}/{item.images.length}
                      </CustomTypography>
                    </Box>
                  )}
                </Box>
              )}
            </Box>
          </ListItem>
          </Box>
          
        ))}
      </List>

      <Modal open={openImageModal} onClose={() => setOpenImageModal(false)}>
        <Box
          sx={{
            display: 'flex',
            flexDirection: 'row',
            width: '100%',
            height: '100vw',
            alignItems: 'center',
            justifyContent: 'center',
            backgroundColor: 'rgba(0, 0, 0, 0.9)',
          }}
        >
          {items[modalItemIndex]?.images && (() => {
            const currentItem = items[modalItemIndex];
            return (
              <>
                <Box
                  component="img"
                  src={currentItem?.images?.[modalImageIndex]}
                  sx={{
                    maxWidth: '90%',
                    maxHeight: '90%',
                    objectFit: 'contain',
                  }}
                />
                <CustomIconButton
                  placement="left"
                  onAction={() => setOpenImageModal(false)}
                  name={`-close-icon-button${currentItem}`} 
                  actionText={`Close ${currentItem.title}?`}
                  icon={<Close fontSize="large" />}
                  ratingCode={"all"}
                  sx={{ position: 'absolute', top: 20, right: 20, color: 'white' }}
                >
                </CustomIconButton>

                {currentItem?.images && currentItem.images.length > 1 && (
                  <CustomIconButton
                    placement={`right`}
                    name={`Previous`}
                    actionText={`Previous ${currentItem.title}?`}
                    onAction={handleModalPrevImage}
                    ratingCode={"all"}
                    icon={<ChevronLeft fontSize="large" />}
                    sx={{ position: 'absolute', left: 20, top: '50%', transform: 'translateY(-50%)', color: 'white' }}
                  >
                  </CustomIconButton>
                )}

                <CustomTypography variant="body2" sx={{ position: 'absolute', bottom: 20, color: 'white' }}>
                  {modalImageIndex + 1} / {currentItem?.images?.length}
                </CustomTypography>

                {/* Next Button */}
                {currentItem?.images && currentItem.images.length > 1 && (
                  <CustomIconButton
                    placement={"right"}
                    onAction={handleModalNextImage}
                    name={""}
                    actionText={`Next?`}
                    ratingCode={'all'}
                    icon={<ChevronRight fontSize="large" />}
                    sx={{ position: 'absolute', right: 20, top: '50%', transform: 'translateY(-50%)', color: 'white' }}
                  >
                  </CustomIconButton>
                )}
              </>
            );
          })()}
        </Box>
      </Modal>
    </>
  );
}