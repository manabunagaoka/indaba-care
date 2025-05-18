'use client';

import { motion } from 'framer-motion';
import { useEffect } from 'react';
import Image from 'next/image';

interface SplashScreenProps {
  onComplete: () => void;
  duration?: number;
}

export default function SplashScreen({ 
  onComplete, 
  duration = 2500 
}: SplashScreenProps) {
  useEffect(() => {
    const timer = setTimeout(() => {
      onComplete();
    }, duration);
    
    return () => clearTimeout(timer);
  }, [onComplete, duration]);

  return (
    <motion.div 
      className="fixed inset-0 flex flex-col items-center justify-center bg-[#2D2D2D] z-50"
      initial={{ opacity: 1 }}
      animate={{ 
        opacity: 0,
        transition: { delay: 2, duration: 0.5 }
      }}
    >
      <motion.div
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{ 
          scale: 1, 
          opacity: 1,
          transition: { duration: 0.5 }
        }}
        className="flex flex-col items-center"
      >
        {/* Using your actual logo */}
        <div className="mb-6">
          <Image 
            src="/images/indabacarelogo.jpg" 
            alt="Indaba Care Logo" 
            width={150} 
            height={150}
            className="object-contain rounded-full"
          />
        </div>
        
        <motion.h1 
          className="text-3xl font-bold text-white mb-2"
          initial={{ opacity: 0, y: 20 }}
          animate={{ 
            opacity: 1, 
            y: 0,
            transition: { delay: 0.3, duration: 0.5 }
          }}
        >
          Indaba Care
        </motion.h1>
        
        <motion.p 
          className="text-[#FF6B6B] text-lg"
          initial={{ opacity: 0 }}
          animate={{ 
            opacity: 1,
            transition: { delay: 0.6, duration: 0.5 }
          }}
        >
          Transforming Childcare, Together.
        </motion.p>
      </motion.div>
    </motion.div>
  );
}