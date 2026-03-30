import { Box, Pagination, MenuItem, Select, FormControl } from '@mui/material';
import { motion } from 'framer-motion';
import { useEffect, useState } from 'react';

import { CustomTypography } from '@/materials/Typography';
import { useTheme } from '@mui/material/styles';

import Title from '@/components/Title';

interface InstagramGalleryProps {
    title: string;
    home?: boolean;
    color?: string;
    variant?: 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6' | 'subtitle1' | 'subtitle2' | 'body1' | 'body2' | 'button' | 'caption' | 'overline';
    routes: Array<{ [key: string]: { link: string; coord: string; developed: string; rating?: number, order?: number } }>;
}

type SortOrder = 'asc' | 'desc' | 'order';

export default function InstagramGallery({ routes, title, variant, color, home }: InstagramGalleryProps) {
  const theme = useTheme();
  
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
  };

  return (
  <>
    <motion.div
      initial="visible"
      whileInView="visible"
      viewport={{ once: true, amount: 0.2 }}
      variants={containerVariants}
      style={{ 
        backgroundColor: home ? theme.palette.primary.contrastText : theme.palette.secondary.main,  
        boxShadow: home ? `0 8px 32px ${theme.palette.primary.contrastText}` : undefined,
        display: 'flex', 
        flexDirection: 'column', 
        alignItems: 'center',
        borderRadius: '8px',
      }}
    >
      <Title color={home ? theme.palette.primary.main : theme.palette.primary.contrastText} variant={home ? variant : 'h5'}>
        {title} 
      </Title>
        <Box display="flex" flexDirection="row" gap={2}>
        <FormControl sx={{ mb: 3, minWidth: 200 }}>
          <Select
            value={itemsPerPage}
            onChange={handleItemsPerPageChange}
            sx={{
              backgroundColor: theme.palette.primary.contrastText,
              color: color ||theme.palette.primary.main,
              '&:hover .MuiOutlinedInput-notchedOutline': {
                borderColor: color || theme.palette.primary.main,
              },
              '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
                borderColor: color || theme.palette.primary.main,
              },
              '& .MuiSvgIcon-root': {
                color: color ||theme.palette.primary.main,
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
              backgroundColor: theme.palette.primary.contrastText,
              color: theme.palette.primary.main,
              '&:hover .MuiOutlinedInput-notchedOutline': {
                borderColor: theme.palette.primary.main,
              },
              '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
                borderColor: theme.palette.primary.main,
              },
              '& .MuiSvgIcon-root': {
                color: theme.palette.primary.main,
              }
            }}
          >
            <MenuItem value="order">Original Order</MenuItem>
            <MenuItem value="desc">Date: New to Old</MenuItem>
            <MenuItem value="asc">Date: Old to New</MenuItem>
          </Select>
        </FormControl>
        {totalPages > 1 && (
          <Box sx={{
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            flexGrow: 1,
          }}>
            <Pagination 
              count={totalPages}
              page={currentPage}
              onChange={handlePageChange}
              color="primary"
              size="large"
              sx={{
                '& .MuiPaginationItem-root': {
                  color: theme.palette.primary.contrastText,
                  '&:hover': {
                    backgroundColor: theme.palette.secondary.dark,
                  }
                },
                '& .Mui-selected': {
                  backgroundColor: theme.palette.primary.contrastText,
                  color: theme.palette.primary.main,
                }
              }}
            />
          </Box>
        )}
      </Box>
      <Box sx={{ 
        p: 3, 
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
      }}>
        <Box sx={{
          display: "grid",
          gridTemplateColumns: { xs: '1fr', sm: '1fr 1fr', lg: '1fr 1fr 1fr' },
          gap: "2rem",
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
                  <CustomTypography variant="h6" sx={{ color: home? theme.palette.primary.main : theme.palette.primary.contrastText, display: 'block',textDecoration: 'underline'}}>
                    {post.name}
                  </CustomTypography>
                )}
                {post.developed && (
                  <CustomTypography variant="h5" sx={{ color: home? theme.palette.primary.main : theme.palette.primary.contrastText, display: 'block', fontSize: '0.75rem' }}>
                    {post.developed}
                  </CustomTypography>
                )}
                {post.coord && (
                  <CustomTypography 
                    variant="caption" 
                    sx={{ 
                      display: 'block', 
                      color: home? theme.palette.primary.main : theme.palette.primary.contrastText,
                      fontSize: '0.75rem', 
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
                    height: '100%',
                    width: '100%',
                    boxShadow: `0 8px 32px ${theme.palette.primary.main}`,
                  }}
                >
                  <iframe 
                    src={`https://www.instagram.com${post.link}/embed`}
                    data-instgrm-ignore="true"
                    scrolling="yes"
                    style={{
                      height: '15rem',
                      width: '100%',
                      border: 'none',
                      borderRadius: '8px',
                    }}
                    title={post.name}
                  />
                </Box>
              </Box>
            </motion.div>
          ))}
        </Box>
      </Box>
    </motion.div>
  </>
  );
}