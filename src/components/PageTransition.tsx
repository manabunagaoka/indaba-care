"use client";

import { ReactNode, useEffect, useState } from 'react';
import { motion } from 'framer-motion';

interface PageTransitionProps {
  children: ReactNode;
  className?: string;
}

// Last updated: 2025-06-10 13:17:23
export default function PageTransition({ children, className = "" }: PageTransitionProps) {
  const [direction, setDirection] = useState<'forward' | 'back'>('forward');
  
  useEffect(() => {
    // Get the stored direction
    const storedDirection = localStorage.getItem('pageTransitionDirection');
    if (storedDirection === 'forward' || storedDirection === 'back') {
      setDirection(storedDirection as 'forward' | 'back');
      
      // Clear storage to prevent issues on refresh
      // Comment this out if you're having issues with the animation
      // localStorage.removeItem('pageTransitionDirection');
    }
  }, []);
  
  // Define slide animations
  const slideVariants = {
    initial: { 
      x: direction === 'forward' ? '100%' : '-100%',
      opacity: 0 
    },
    animate: { 
      x: 0, 
      opacity: 1,
      transition: {
        duration: 0.3,
        ease: "easeInOut"
      }
    },
    exit: {
      x: direction === 'forward' ? '-100%' : '100%',
      opacity: 0,
      transition: {
        duration: 0.3,
        ease: "easeInOut"
      }
    }
  };

  // For debugging
  console.log('Direction:', direction);

  return (
    <motion.div
      initial="initial"
      animate="animate"
      exit="exit"
      variants={slideVariants}
      className={`w-full h-full ${className}`}
    >
      {children}
    </motion.div>
  );
}