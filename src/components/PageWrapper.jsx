import React from 'react';
import { motion } from 'framer-motion';
import { cn } from '../utils/cn';

const PageWrapper = ({ children, className = "", id = "" }) => {
  return (
    <motion.section
      id={id}
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      viewport={{ once: true, margin: "-100px" }}
      transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
      className={cn("container mx-auto px-4 py-12 md:py-20", className)}
    >
      {children}
    </motion.section>
  );
};

export default PageWrapper;
