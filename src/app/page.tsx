'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { motion } from 'framer-motion';
import Image from 'next/image';

export default function SplashPage() {
  const router = useRouter();
  const [isRedirecting, setIsRedirecting] = useState(false);
  
  // Redirect after the animation completes
  useEffect(() => {
    const redirectTimer = setTimeout(() => {
      setIsRedirecting(true);
      // Add a small delay for the fade out animation
      setTimeout(() => {
        router.push('/home');
      }, 500);
    }, 2500); // 2.5 seconds for the splash screen
    
    return () => clearTimeout(redirectTimer);
  }, [router]);

  return (
    <motion.div 
      className="fixed inset-0 flex flex-col items-center justify-center bg-white z-50"
      initial={{ opacity: 1 }}
      animate={{ 
        opacity: isRedirecting ? 0 : 1,
        transition: { duration: 0.5 }
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
        {/* Logo */}
        <motion.div className="mb-6">
          <Image 
            src="/images/indabacarelogo.jpg" 
            alt="Indaba Care Logo" 
            width={150} 
            height={150}
            className="object-contain rounded-full"
          />
        </motion.div>
        
        <motion.h1 
          className="text-3xl font-bold text-[#2D2D2D] mb-2"
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
        
        {/* Optional loading indicator */}
        <motion.div 
          className="mt-12 w-16 h-1 bg-gray-200 rounded-full overflow-hidden"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1, duration: 0.5 }}
        >
          <motion.div 
            className="h-full bg-[#FF6B6B]"
            initial={{ width: 0 }}
            animate={{ width: '100%' }}
            transition={{ 
              duration: 2,
              ease: "easeInOut"
            }}
          />
        </motion.div>
      </motion.div>
    </motion.div>
  );
}