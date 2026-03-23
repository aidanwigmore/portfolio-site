import { CustomTypography } from '@/materials/Typography';
import Videos from '@/pages/Videos/Videos';
import Projects from '@/pages/Projects/Projects';
import { CustomDivider } from '@/materials/Divider';
import { motion } from 'framer-motion';

import Box from '@mui/material/Box';

import Theme from '@/Theme';

export default function Home() {
  const sectionVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: { duration: 0.8 }
    }
  };

  const contentVariants = {
    hidden: { opacity: 0, y: 100 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: { duration: 1, delay: 0.2 }
    }
  };

  return (
    <>
      {/* Hero Section */}
      <motion.div
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.3 }}
        variants={sectionVariants}
      >
        <Box sx={{ 
          display: 'flex',
          justifyContent: 'center',
          alignSelf: 'center',
          padding: '3vw',
          margin: '1vh',
          marginLeft: 0,
          marginRight: 0,
          backgroundColor: Theme.palette.primary.light, 
          borderRadius: '8px',
          boxShadow: '0 8px 32px rgba(0, 0, 0, 0.1)',
        }}>
          <Box sx={{ 
            padding: '3vw',
            backgroundColor: Theme.palette.primary.main,
            borderRadius: '8px',
            boxShadow: '0 8px 32px rgba(0, 0, 0, 0.1)',
          }}>
            <CustomTypography variant="h1" textAlign="center" gutterBottom>
              Aidan Wigmore
              <CustomTypography variant="body1" textAlign="center" gutterBottom>
                Full-stack developer specializing in React and Django.
              </CustomTypography>
            </CustomTypography>
          </Box>
        </Box>
      </motion.div>

      <CustomDivider />

      {/* Projects Section */}
      <motion.div
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.2 }}
        variants={contentVariants}
      >
        <Projects home={true}/>
      </motion.div>

      <CustomDivider />

      <motion.div
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.2 }}
        variants={contentVariants}
      >
        <Videos/>
      </motion.div>
    </>
  );
}