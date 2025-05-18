'use client';

import { motion } from 'framer-motion';
import { ReactNode } from 'react';

interface ResourceTransitionProps {
  children: ReactNode;
  // Use a more explicit naming that can't be confused
  isReturningToParent?: boolean;
}

export default function ResourceTransition({ 
  children,
  isReturningToParent = false
}: ResourceTransitionProps) {
  // Simple, clear logic:
  // - When returning to parent (going back): slide in from left
  // - When going to child (going forward): slide in from right
  const variants = {
    initial: {
      x: isReturningToParent ? '-100%' : '100%',
      opacity: 0,
    },
    animate: {
      x: 0,
      opacity: 1,
      transition: {
        duration: 0.3,
        ease: 'easeInOut',
      },
    },
    exit: {
      x: isReturningToParent ? '100%' : '-100%',
      opacity: 0,
      transition: {
        duration: 0.3,
        ease: 'easeInOut',
      },
    },
  };

  return (
    <motion.div
      initial="initial"
      animate="animate"
      exit="exit"
      variants={variants}
      className="w-full h-full"
    >
      {children}
    </motion.div>
  );
}