import Videos from '@/pages/Videos/Videos';
import Projects from '@/pages/Projects/Projects';
import { CustomDivider } from '@/materials/Divider';
import { motion } from 'framer-motion';

import InstagramGallery from '@/pages/Gallery/InstagramGallery';

import Title from '@/components/Title';

import MRKTRoutes from '@/data/MrktRoutes';
import FilmRoutes from '@/data/FilmRoutes';
import DigitalRoutes from '@/data/DigitalRoutes';

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
        <Title children={"Aidan Wigmore"} />
      </motion.div>

      <CustomDivider />

      <motion.div
        initial="visible"
        whileInView="visible"
        viewport={{ once: true, amount: 0.2 }}
        variants={contentVariants}
      >
        <Projects home={true}/>
      </motion.div>

      <motion.div
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.2 }}
        variants={contentVariants}
      >
        <Videos/>
      </motion.div>

      <motion.div
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.2 }}
        variants={contentVariants}
      >
        <InstagramGallery title={'MRKTBox Appearances'} routes={MRKTRoutes}/>
      </motion.div>

      <CustomDivider />

      <motion.div
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.2 }}
        variants={contentVariants}
      >
        <InstagramGallery title={'Film Media'} routes={FilmRoutes}/>
      </motion.div>

      <CustomDivider />

      <motion.div
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.2 }}
        variants={contentVariants}
      >
        <InstagramGallery title={'Digital Media'} routes={DigitalRoutes}/>
      </motion.div>
    </>
  );
}