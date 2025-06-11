"use client";

import { usePathname } from 'next/navigation';
import { AnimatePresence, motion } from 'framer-motion';
import { useEffect, useRef } from 'react';
import AppShell from '../../components/AppShell';

// Last updated: 2025-06-11 21:58:36 by manabunagaoka
export default function LearningLayout({ children }) {
  const pathname = usePathname();
  const prevPathRef = useRef(pathname);
  
  // Determine if we're going deeper into a course or back to the list
  // /learning -> /learning/montessori = forward (deeper)
  // /learning/montessori -> /learning = backward (back to list)
  const isForward = pathname?.split('/').length > prevPathRef.current?.split('/').length;
  
  // Update the ref after direction is determined
  useEffect(() => {
    prevPathRef.current = pathname;
  }, [pathname]);
  
  // Define slide variants based on current direction
  const slideVariants = {
    initial: (custom) => ({
      position: "absolute",
      width: "100%",
      height: "100%",
      x: custom ? '100%' : '-100%',
      opacity: 0
    }),
    animate: { 
      position: "absolute",
      width: "100%",
      height: "100%",
      x: 0, 
      opacity: 1,
      transition: {
        duration: 0.3,
        ease: "easeOut"
      }
    },
    exit: (custom) => ({
      position: "absolute",
      width: "100%",
      height: "100%",
      x: custom ? '-100%' : '100%',
      opacity: 0,
      transition: {
        duration: 0.3,
        ease: "easeIn"
      }
    })
  };
  
  return (
    <AppShell>
      <div className="relative w-full h-full overflow-hidden">
        <AnimatePresence initial={false} mode="popLayout" custom={isForward}>
          <motion.div 
            key={pathname}
            initial="initial"
            animate="animate"
            exit="exit"
            variants={slideVariants}
            custom={isForward}
            className="absolute top-0 left-0 w-full h-full bg-gray-50"
          >
            {children}
          </motion.div>
        </AnimatePresence>
      </div>
    </AppShell>
  );
}