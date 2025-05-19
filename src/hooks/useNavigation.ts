'use client';

import { usePathname } from 'next/navigation';
import { useEffect, useState } from 'react';
import { MAJOR_TABS } from '../lib/constants'; // Fixed relative import path

export function useNavigation() {
  const pathname = usePathname();
  const [previousPath, setPreviousPath] = useState<string | null>(null);
  const [isBackNavigation, setIsBackNavigation] = useState(false);
  const [isMajorTabSwitch, setIsMajorTabSwitch] = useState(false);

  useEffect(() => {
    if (previousPath) {
      // Check if it's a major tab switch
      const currentBase = `/${pathname.split('/')[1]}`;
      const previousBase = `/${previousPath.split('/')[1]}`;
      
      const isMajorSwitch = 
        (MAJOR_TABS.includes(currentBase) && MAJOR_TABS.includes(previousBase)) && 
        currentBase !== previousBase;
      
      setIsMajorTabSwitch(isMajorSwitch);

      // Determine if it's back navigation
      // Moving from deeper path to shallower path is likely "back" navigation
      const isBack = previousPath.split('/').length > pathname.split('/').length;
      setIsBackNavigation(isBack);
    }

    // Listen for popstate (browser back/forward buttons)
    const handlePopState = () => {
      setIsBackNavigation(true);
    };

    window.addEventListener('popstate', handlePopState);
    
    return () => {
      // Save current path before changing
      setPreviousPath(pathname);
      window.removeEventListener('popstate', handlePopState);
    };
  }, [pathname, previousPath]);

  return {
    previousPath,
    isBackNavigation,
    isMajorTabSwitch,
  };
}
