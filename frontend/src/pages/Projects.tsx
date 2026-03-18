import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemAvatar from '@mui/material/ListItemAvatar';
import ListItemText from '@mui/material/ListItemText';

import Box from '@mui/material/Box';

import LanguageIcon from '@mui/icons-material/Language';
import { IconButton, Link, Modal, Tooltip } from '@mui/material';
import { useState } from 'react';
import { ChevronLeft, ChevronRight, Close } from '@mui/icons-material';

export default function Contact() {
    const [openImageModal, setOpenImageModal] = useState(false);
    const [currentImageIndex, setCurrentImageIndex] = useState(0);
    const [currentItemIndex, setCurrentItemIndex] = useState(0);
    const items= [
        {
        title: "Fxns - Contributor - ",
        description: [
          "Identified and resolved workflow bugs while improving frontend readability and maintainability.",
          "Participated in bi-weekly scrum meetings with progress reporting and task tracking."
        ],
        src: "https://www.fxns.ca/",
        },
        {
        title: "IdeaBurn - Personal Project - ",
        description: [
          "Designed and deployed a full stack idea-sharing platform using Django, React, and SQLite.",
          "Implemented JWT authentication, role-based access control, pagination, and search functionality.",
          "Designed REST APIs and integrated frontend state management with secure token handling.",
          "Structured project architecture, database models, and environment configuration."
        ],
        src: "https://ideaburn.xyz",
        },
        {
        title: "TeaBank - Capstone Project - ",
        description: [
          "Tea Purchasing Platform",
          "Developed a full stack web application using Django and PostgreSQL/SQLite.",
          "Integrated PayPal API for secure payment processing.",
          "Implemented Google Maps API for address validation.",
          "Designed relational database schemas and REST endpoints."
        ],
        images: [
          "/teabank/teabank_home.png",
          "/teabank/teabank_customer_home.png",
          "/teabank/teabank_product_card.png",
          "/teabank/teabank_product_page.png",
          "/teabank/teabank_wishlist.png",
          "/teabank/teabank_cart.png",
          ], 
        src: "https://teabankclient-d9c62f61e84a.herokuapp.com/",
        },
    ];

    const handleImageClick = (itemIndex: number, imgIndex: number) => {
        setCurrentItemIndex(itemIndex);
        setCurrentImageIndex(imgIndex);
        setOpenImageModal(true);
    };

    const handlePrevImage = () => {
        const currentItem = items[currentItemIndex];
        if (currentItem.images) {
            setCurrentImageIndex((prev) =>
                prev === 0 ? currentItem.images.length - 1 : prev - 1
            );
        }
    };

    const handleNextImage = () => {
        const currentItem = items[currentItemIndex];
        if (currentItem.images) {
            setCurrentImageIndex((prev) =>
                prev === currentItem.images.length - 1 ? 0 : prev + 1
            );
        }
    };

    return (
        <>
        <List dense={false}>
            {items.map((item, index) => (
        <ListItem
          key={index}
          sx={{
            backgroundColor: index % 2 === 0 ? "#f9f9f9" : "#eaeaea", // Alternate background colors
            borderRadius: "8px",
            marginBottom: "16px",
          }}
        >
          <ListItemAvatar>
            <Tooltip title={item.src} arrow>
              <IconButton 
                component="a" // Make the IconButton behave like a link
                href={item.src} // Navigate to the URL specified in the `src` property
                target="_blank" // Open the link in a new tab
                rel="noopener noreferrer"
              >
                <LanguageIcon />
              </IconButton>
            </Tooltip>
          </ListItemAvatar>
          <ListItemText key={`${item.title}-${index}`} 
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
              </>} 
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
                  -{desc}
                  <br />
                </span>
              ))
            } />
            {/* Single Image Carousel Display */}
                        {item.images && item.images.length > 0 && (
                            <Box
                                sx={{
                                    display: 'flex',
                                    alignItems: 'center',
                                    gap: 2,
                                    mt: 2,
                                    width: '100%',
                                    justifyContent: 'center',
                                }}
                            >
                                {item.images.length > 1 && (
                                    <IconButton
                                        onClick={() => {
                                            const newIndex = currentImageIndex === 0 ? item.images.length - 1 : currentImageIndex - 1;
                                            setCurrentImageIndex(newIndex);
                                        }}
                                        size="small"
                                    >
                                        <ChevronLeft />
                                    </IconButton>
                                )}

                                <Box
                                    component="img"
                                    src={item.images[currentImageIndex]}
                                    onClick={() => handleImageClick(index, currentImageIndex)}
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
                                        onClick={() => {
                                            const newIndex = currentImageIndex === item.images.length - 1 ? 0 : currentImageIndex + 1;
                                            setCurrentImageIndex(newIndex);
                                        }}
                                        size="small"
                                    >
                                        <ChevronRight />
                                    </IconButton>
                                )}
                            </Box>
                        )}

                        {/* Image Counter */}
                        {item.images && item.images.length > 1 && (
                            <Box sx={{ mt: 1, fontSize: '0.875rem', color: 'gray' }}>
                                {currentImageIndex + 1} / {item.images.length}
                            </Box>
                        )}
        </ListItem>
        ))}
        </List>
        <Modal open={openImageModal} onClose={() => setOpenImageModal(false)}>
                <Box
                    sx={{
                        position: 'relative',
                        width: '100%',
                        height: '100vh',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        backgroundColor: 'rgba(0, 0, 0, 0.9)',
                    }}
                >
                    {items[currentItemIndex]?.images && (
                        <>
                            <Box
                                component="img"
                                src={items[currentItemIndex].images[currentImageIndex]}
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
                            {items[currentItemIndex].images.length > 1 && (
                                <IconButton
                                    onClick={handlePrevImage}
                                    sx={{ position: 'absolute', left: 20, top: '50%', transform: 'translateY(-50%)', color: 'white' }}
                                >
                                    <ChevronLeft fontSize="large" />
                                </IconButton>
                            )}

                            {/* Next Button */}
                            {items[currentItemIndex].images.length > 1 && (
                                <IconButton
                                    onClick={handleNextImage}
                                    sx={{ position: 'absolute', right: 20, top: '50%', transform: 'translateY(-50%)', color: 'white' }}
                                >
                                    <ChevronRight fontSize="large" />
                                </IconButton>
                            )}

                            {/* Image Counter */}
                            <Box
                                sx={{
                                    position: 'absolute',
                                    bottom: 20,
                                    left: '50%',
                                    transform: 'translateX(-50%)',
                                    color: 'white',
                                    fontSize: '1.2rem',
                                }}
                            >
                                {currentImageIndex + 1} / {items[currentItemIndex].images.length}
                            </Box>
                        </>
                    )}
                </Box>
            </Modal>
        </>
    )
}