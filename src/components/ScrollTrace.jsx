import React, { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';

const ScrollTrace = () => {
  const { scrollYProgress } = useScroll();

  // We map the scroll progress from 0-1 to a strokeDashoffset from 1 (hidden) to 0 (fully drawn)
  // pathLength is used so 1 means the full length of the path.
  const pathLength = useTransform(scrollYProgress, [0, 1], [0, 1]);
  const opacity = useTransform(scrollYProgress, [0, 0.05], [0, 1]);

  return (
    <div className="fixed top-0 right-4 md:right-8 lg:right-12 bottom-0 w-8 pointer-events-none z-0 hidden sm:flex justify-center">
      {/* Background track */}
      <div className="absolute inset-0 flex justify-center w-full h-full">
        <svg
          viewBox="0 0 24 1000"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          preserveAspectRatio="none"
          className="w-full h-full"
        >
          <path
            d="M 12 0 V 1000"
            stroke="rgba(255, 255, 255, 0.05)"
            strokeWidth="2"
            strokeDasharray="4 8"
          />
        </svg>
      </div>

      {/* Active trace */}
      <motion.div style={{ opacity }} className="absolute inset-0 flex justify-center w-full h-full">
        <svg
          viewBox="0 0 24 1000"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          preserveAspectRatio="none"
          className="w-full h-full drop-shadow-[0_0_8px_rgba(255,107,0,0.8)]"
        >
          <motion.path
            d="M 12 0 V 1000"
            stroke="#ff6b00"
            strokeWidth="3"
            strokeLinecap="round"
            style={{
              pathLength: pathLength
            }}
          />
        </svg>
      </motion.div>
      
      {/* Glow dot that travels at the tip */}
      <motion.div
        className="absolute w-4 h-4 bg-primary rounded-full shadow-[0_0_15px_rgba(255,107,0,1)]"
        style={{
          top: useTransform(scrollYProgress, [0, 1], ['0%', '100%']),
          translateY: '-50%',
          opacity
        }}
      />
    </div>
  );
};

export default ScrollTrace;
