import React from 'react';
import { motion } from 'framer-motion';

const pageVariants = {
  initial: {
    opacity: 0,
    scale: 0.8,
    filter: 'blur(10px)',
  },
  animate: {
    opacity: 1,
    scale: 1,
    filter: 'blur(0px)',
    transition: {
      duration: 0.8,
      ease: [0.22, 1, 0.36, 1],
    },
  },
  exit: {
    opacity: 0,
    scale: 2,
    filter: 'blur(20px)',
    transition: {
      duration: 0.6,
      ease: [0.6, 0.05, -0.01, 0.9],
    },
  },
};

const PageTransition = ({ children }) => {
  return (
    <motion.div
      variants={pageVariants}
      initial="initial"
      animate="animate"
      exit="exit"
      style={{ originX: 0.5, originY: 0.5, minHeight: '100vh', width: '100%' }}
    >
      {children}
    </motion.div>
  );
};

export default PageTransition;
