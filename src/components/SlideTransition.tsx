'use client';

import { motion } from 'framer-motion';
import { ReactNode } from 'react';

type SlideDirection = 'left-to-right' | 'right-to-left';

interface SlideTransitionProps {
  children: ReactNode;
  direction?: SlideDirection;
  duration?: number;
}

export default function SlideTransition({
  children,
  direction = 'right-to-left',
  duration = 0.3,
}: SlideTransitionProps) {
  const variants = {
    initial: {
      x: direction === 'right-to-left' ? '100%' : '-100%',
      opacity: 0,
    },
    animate: {
      x: 0,
      opacity: 1,
      transition: {
        duration: duration,
        ease: 'easeInOut',
      },
    },
    exit: {
      x: direction === 'right-to-left' ? '-100%' : '100%',
      opacity: 0,
      transition: {
        duration: duration,
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