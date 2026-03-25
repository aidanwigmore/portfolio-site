import Videos from '@/pages/Videos/Videos';
import Projects from '@/pages/Projects/Projects';
import { CustomDivider } from '@/materials/Divider';
import { motion } from 'framer-motion';

// import InstagramGallery from '@/pages/Gallery/InstagramGallery';
import InstagramGalleries from '@/pages/Gallery/InstagramGalleries';
// import Title from '@/components/Title';

// import MRKTRoutes from '@/data/MrktRoutes';
// import FilmRoutes from '@/data/FilmRoutes';
// import DigitalRoutes from '@/data/DigitalRoutes';

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
      <motion.div
        initial="visible"
        whileInView="visible"
        viewport={{ once: true, amount: 0.2 }}
        variants={sectionVariants}
      >
        <Projects home={true}/>
      </motion.div>

      <motion.div
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.2 }}
        variants={contentVariants}
      >
        <Videos home={true}/>
      </motion.div>

      <CustomDivider />

      <motion.div
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.2 }}
        variants={contentVariants}
      >
        <InstagramGalleries/>
      </motion.div>
    </>
  );
}