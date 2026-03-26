import { Box, Pagination, MenuItem, Select, FormControl } from '@mui/material';
import { motion } from 'framer-motion';
import { useEffect, useState } from 'react';

import { CustomTypography } from '@/materials/Typography';
import Theme from '@/Theme';

import Title from '@/components/Title';

interface InstagramGalleryProps {
    title: string;
    variant?: boolean;
    routes: Array<{ [key: string]: { link: string; coord: string; developed: string; rating?: number, order?: number } }>;
}

type SortOrder = 'asc' | 'desc' | 'order';

export default function InstagramGallery({ routes, title, variant }: InstagramGalleryProps) {
  const [currentPage, setCurrentPage] = useState(1);
  const [sortOrder, setSortOrder] = useState<SortOrder>('order');
  const [itemsPerPage, setItemsPerPage] = useState(6);

  const allPosts = Object.entries(routes[0]).map(([name, { link, coord, developed, rating, order }]) => ({
    name: name.replace(/_/g, ' '),
    link,
    coord,
    developed,
    rating: rating || 0,
    order: order || 999,
  }));

  const handleItemsPerPageChange = (event: any) => {
    const value = event.target.value;
    if (value === 'all') {
      setItemsPerPage(allPosts.length);
    } else {
      setItemsPerPage(value as number);
    }
    setCurrentPage(1);
  };

  const handleSortChange = (event: any) => {
    setSortOrder(event.target.value as SortOrder);
    setCurrentPage(1);
  };

  useEffect(() => {
    if (window.instgrm) {
      window.instgrm.Embed.process();
    }
  }, [currentPage, routes, sortOrder]);

  const parseDate = (dateStr: string): Date => {
    return new Date(dateStr);
  };

  const sortedPosts = [...allPosts].sort((a, b) => {
    if (sortOrder === 'order') {
      return a.order - b.order;
    }
    const dateA = parseDate(a.developed);
    const dateB = parseDate(b.developed);
    return sortOrder === 'desc' ? dateB.getTime() - dateA.getTime() : dateA.getTime() - dateB.getTime();
  });

  const totalPages = Math.ceil(sortedPosts.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const posts = sortedPosts.slice(startIndex, endIndex);

  const containerVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: { duration: 0.8 }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: (i: number) => ({
      opacity: 1,
      y: 0,
      transition: { duration: 0.6, delay: i * 0.1 }
    })
  };

  const handlePageChange = (__: React.ChangeEvent<unknown>, page: number) => {
    setCurrentPage(page);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
  <>
    <Title variant={variant} children={title} />
    <motion.div
      initial="visible"
      whileInView="visible"
      viewport={{ once: true, amount: 0.2 }}
      variants={containerVariants}
    >
      <Box display="flex" flexDirection="row" gap={2}>
        <FormControl sx={{ mb: 3, minWidth: 200 }}>
          <Select
            value={itemsPerPage}
            onChange={handleItemsPerPageChange}
            sx={{
              backgroundColor: Theme.palette.primary.main,
              color: Theme.palette.secondary.dark,
              '& .MuiOutlinedInput-notchedOutline': {
                borderColor: Theme.palette.secondary.main,
              },
              '&:hover .MuiOutlinedInput-notchedOutline': {
                borderColor: Theme.palette.secondary.main,
              },
              '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
                borderColor: Theme.palette.secondary.main,
              },
              '& .MuiSvgIcon-root': {
                color: Theme.palette.secondary.dark,
              }
            }}
          >
            <MenuItem value={3}>3 per page</MenuItem>
            <MenuItem value={6}>6 per page</MenuItem>
            <MenuItem value={12}>12 per page</MenuItem>
            <MenuItem value={sortedPosts.length}>All ({sortedPosts.length})</MenuItem>
          </Select>
        </FormControl>
        <FormControl sx={{ mb: 3, minWidth: 200 }}>
          <Select
            value={sortOrder}
            onChange={handleSortChange}
            sx={{
              backgroundColor: Theme.palette.primary.main,
              color: Theme.palette.secondary.dark,
              '& .MuiOutlinedInput-notchedOutline': {
                borderColor: Theme.palette.secondary.main,
              },
              '&:hover .MuiOutlinedInput-notchedOutline': {
                borderColor: Theme.palette.secondary.main,
              },
              '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
                borderColor: Theme.palette.secondary.main,
              },
              '& .MuiSvgIcon-root': {
                color: Theme.palette.secondary.dark,
              }
            }}
          >
            <MenuItem value="order">Original Order</MenuItem>
            <MenuItem value="desc">Date: New to Old</MenuItem>
            <MenuItem value="asc">Date: Old to New</MenuItem>
          </Select>
        </FormControl>
      </Box>
      <Box sx={{ 
        p: 3, 
        backgroundColor: Theme.palette.primary.light, 
        borderRadius: '8px',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
      }}>
        {totalPages > 1 && (
          <Box sx={{
            display: 'flex',
            justifyContent: 'center',
            mb: 2
          }}>
            <Pagination 
              count={totalPages}
              page={currentPage}
              onChange={handlePageChange}
              color="primary"
              size="large"
              sx={{
                '& .MuiPaginationItem-root': {
                  color: Theme.palette.primary.contrastText,
                  '&:hover': {
                    backgroundColor: Theme.palette.secondary.light,
                  }
                },
                '& .Mui-selected': {
                  backgroundColor: Theme.palette.secondary.main + ' !important',
                  color: Theme.palette.primary.main,
                }
              }}
            />
          </Box>
        )}
        <Box sx={{
          display: "grid",
          gridTemplateColumns: { xs: '1fr', sm: '1fr 1fr', lg: '1fr 1fr 1fr' },
          gap: "2rem",
          maxWidth: '1200px',
        }}>
          {posts.map((post, index) => (
            <motion.div
              key={`${title}-${currentPage}-${index}`}
              custom={index}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.2 }}
              variants={itemVariants}
            >
              <Box sx={{ textAlign: 'center' }}>
                {post.name && (
                  <CustomTypography variant="h6" sx={{ color: Theme.palette.secondary.dark, display: 'block',textDecoration: 'underline'}}>
                    {post.name}
                  </CustomTypography>
                )}
                {post.developed && (
                  <CustomTypography variant="h5" sx={{ color: Theme.palette.secondary.dark, display: 'block', fontSize: '0.75rem' }}>
                    {post.developed}
                  </CustomTypography>
                )}
                {post.coord && (
                  <CustomTypography 
                    variant="caption" 
                    sx={{ 
                      display: 'block', 
                      color: 'gray', 
                      fontSize: '0.75rem', 
                      mb: 1,
                      '&::first-letter': {
                        fontSize: '2em',
                      }
                    }}
                  >
                    {post.coord}
                  </CustomTypography>
                )}
                
                <Box
                  sx={{
                    display: 'inline-block',
                    borderRadius: '8px',
                    overflow: 'hidden',
                    boxShadow: '0 8px 32px rgba(0, 0, 0, 0.1)',
                  }}
                >
                  <iframe 
                    src={`https://www.instagram.com${post.link}/embed`}
                    width="100%"
                    height="500"
                    scrolling="no"
                    style={{
                      border: 'none',
                    }}
                    title={post.name}
                  />
                </Box>
              </Box>
            </motion.div>
          ))}
        </Box>
        {totalPages > 1 && (
          <Box sx={{
            display: 'flex',
            justifyContent: 'center',
            mb: 2
          }}>
            <Pagination 
              count={totalPages}
              page={currentPage}
              onChange={handlePageChange}
              color="primary"
              size="large"
              sx={{
                '& .MuiPaginationItem-root': {
                  color: Theme.palette.primary.contrastText,
                  '&:hover': {
                    backgroundColor: Theme.palette.secondary.light,
                  }
                },
                '& .Mui-selected': {
                  backgroundColor: Theme.palette.secondary.main + ' !important',
                  color: Theme.palette.primary.main,
                }
              }}
            />
          </Box>
        )}
      </Box>
    </motion.div>
  </>
  );
}