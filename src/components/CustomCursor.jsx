import React, { useEffect, useState } from 'react';
import { motion, useMotionValue, useSpring } from 'framer-motion';

const CustomCursor = () => {
  const [isHovered, setIsHovered] = useState(false);
  const [isVisible, setIsVisible] = useState(false);
  const [isNyanMode, setIsNyanMode] = useState(false);
  const [isMatrixMode, setIsMatrixMode] = useState(false);
  
  // Motion values for smooth springing
  const cursorX = useMotionValue(-100);
  const cursorY = useMotionValue(-100);
  
  const springConfig = { damping: 25, stiffness: 300, mass: 0.5 };
  const cursorXSpring = useSpring(cursorX, springConfig);
  const cursorYSpring = useSpring(cursorY, springConfig);

  useEffect(() => {
    // Show cursor when mouse moves
    const handleMouseMove = (e) => {
      cursorX.set(e.clientX);
      cursorY.set(e.clientY);
      if (!isVisible) setIsVisible(true);
    };

    // Detect if mouse is over clickable elements
    const handleMouseOver = (e) => {
      const target = e.target;
      // Check if hovering over links, buttons, or custom classes
      const isClickable = 
        target.tagName.toLowerCase() === 'a' ||
        target.tagName.toLowerCase() === 'button' ||
        target.closest('a') ||
        target.closest('button') ||
        target.classList.contains('cursor-pointer');
        
      setIsHovered(!!isClickable);
    };

    const handleMouseLeave = () => {
      setIsVisible(false);
    };
    
    const handleMouseEnter = () => {
      setIsVisible(true);
    };

    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('mouseover', handleMouseOver);
    document.documentElement.addEventListener('mouseleave', handleMouseLeave);
    document.documentElement.addEventListener('mouseenter', handleMouseEnter);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mouseover', handleMouseOver);
      document.documentElement.removeEventListener('mouseleave', handleMouseLeave);
      document.documentElement.removeEventListener('mouseenter', handleMouseEnter);
    };
  }, [cursorX, cursorY, isVisible]);

  useEffect(() => {
    const handleNyanToggle = () => setIsNyanMode(prev => !prev);
    const handleMatrixToggle = (e) => setIsMatrixMode(e.detail);
    window.addEventListener('toggle-nyan-mode', handleNyanToggle);
    window.addEventListener('matrix-mode', handleMatrixToggle);
    return () => {
      window.removeEventListener('toggle-nyan-mode', handleNyanToggle);
      window.removeEventListener('matrix-mode', handleMatrixToggle);
    };
  }, []);

  // Hide default cursor globally
  useEffect(() => {
    document.body.style.cursor = 'none';
    const elements = document.querySelectorAll('a, button, input, textarea');
    elements.forEach(el => el.style.cursor = 'none');
    
    return () => {
      document.body.style.cursor = 'auto';
      const elements = document.querySelectorAll('a, button, input, textarea');
      elements.forEach(el => el.style.cursor = 'pointer');
    };
  }, []);

  if (typeof window === 'undefined') return null;

  return (
    <>
      {/* Outer trailing circle */}
      <motion.div
        className="fixed top-0 left-0 w-8 h-8 rounded-full border border-primary/50 pointer-events-none z-[9999] mix-blend-difference hidden md:block"
        style={{
          x: cursorXSpring,
          y: cursorYSpring,
          translateX: '-50%',
          translateY: '-50%',
        }}
        animate={{
          scale: isHovered ? 2 : 1,
          opacity: isVisible ? 1 : 0,
          backgroundColor: isHovered 
            ? (isMatrixMode ? 'rgba(0, 255, 0, 0.1)' : 'rgba(255, 107, 0, 0.1)') 
            : 'transparent',
          borderColor: isHovered 
            ? (isMatrixMode ? 'rgba(0, 255, 0, 0.8)' : 'rgba(255, 107, 0, 0.8)') 
            : (isMatrixMode ? 'rgba(0, 255, 0, 0.5)' : 'rgba(255, 107, 0, 0.5)'),
        }}
        transition={{ scale: { type: 'spring', stiffness: 300, damping: 20 } }}
      />
      
      {/* Inner solid dot or Nyan Cat */}
      {isNyanMode ? (
        <motion.div
          className="fixed top-0 left-0 text-2xl pointer-events-none z-[10000] hidden md:block"
          style={{
            x: cursorX,
            y: cursorY,
            translateX: '-50%',
            translateY: '-50%',
          }}
          animate={{
            opacity: isVisible ? 1 : 0,
            scale: isHovered ? 1.5 : 1,
          }}
          transition={{ scale: { duration: 0.1 } }}
        >
          🐈
        </motion.div>
      ) : (
        <motion.div
          className="fixed top-0 left-0 w-2 h-2 rounded-full bg-primary pointer-events-none z-[10000] hidden md:block"
          style={{
            x: cursorX,
            y: cursorY,
            translateX: '-50%',
            translateY: '-50%',
          }}
          animate={{
            opacity: isVisible ? 1 : 0,
            scale: isHovered ? 0 : 1,
          }}
          transition={{ scale: { duration: 0.1 } }}
        />
      )}

      {/* Nyan Rainbow Trail */}
      {isNyanMode && (
        <motion.div
          className="fixed top-0 left-0 h-4 rounded-full pointer-events-none z-[9998] hidden md:block"
          style={{
            x: cursorXSpring,
            y: cursorYSpring,
            width: '100px',
            background: 'linear-gradient(90deg, transparent 0%, rgba(255,0,0,0.8) 20%, rgba(255,165,0,0.8) 40%, rgba(255,255,0,0.8) 60%, rgba(0,128,0,0.8) 80%, rgba(0,0,255,0.8) 100%)',
            translateX: '-100%',
            translateY: '-50%',
            filter: 'blur(2px)'
          }}
          animate={{ opacity: isVisible ? 1 : 0 }}
        />
      )}
      
      {/* Background Spotlight Lens */}
      <motion.div
        className="fixed top-0 left-0 w-[600px] h-[600px] rounded-full pointer-events-none z-0 hidden md:block"
        style={{
          x: cursorXSpring,
          y: cursorYSpring,
          translateX: '-50%',
          translateY: '-50%',
          background: isMatrixMode 
            ? 'radial-gradient(circle, rgba(0, 255, 0, 0.08) 0%, rgba(0, 255, 0, 0) 70%)'
            : 'radial-gradient(circle, rgba(255, 107, 0, 0.08) 0%, rgba(255, 107, 0, 0) 70%)',
          mixBlendMode: 'screen',
        }}
        animate={{
          opacity: isVisible ? 1 : 0,
        }}
      />
    </>
  );
};

export default CustomCursor;
