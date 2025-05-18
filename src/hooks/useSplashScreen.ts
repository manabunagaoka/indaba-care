'use client';

import { useState, useEffect } from 'react';

interface SplashScreenOptions {
  // Show splash screen only once per browser session
  oncePerSession?: boolean;
  // Show splash screen only once per day
  oncePerDay?: boolean;
  // Always show splash screen on page refresh/reload
  alwaysOnRefresh?: boolean;
}

export default function useSplashScreen({
  oncePerSession = false,
  oncePerDay = false,
  alwaysOnRefresh = true,
}: SplashScreenOptions = {}) {
  const [showSplash, setShowSplash] = useState(true);

  useEffect(() => {
    if (typeof window === 'undefined') return;
    
    // Handle different splash screen visibility strategies
    if (oncePerSession) {
      const hasSeenSplash = sessionStorage.getItem('hasSeenSplash');
      if (hasSeenSplash) {
        setShowSplash(false);
      } else {
        sessionStorage.setItem('hasSeenSplash', 'true');
      }
    } else if (oncePerDay) {
      const lastSplashDate = localStorage.getItem('lastSplashDate');
      const today = new Date().toDateString();
      
      if (lastSplashDate === today) {
        setShowSplash(false);
      } else {
        localStorage.setItem('lastSplashDate', today);
      }
    } else if (!alwaysOnRefresh) {
      // Don't show splash if alwaysOnRefresh is false
      setShowSplash(false);
    }

    // For development: disable splash screen with URL param
    const urlParams = new URLSearchParams(window.location.search);
    if (urlParams.get('skipSplash') === 'true') {
      setShowSplash(false);
    }
  }, [oncePerSession, oncePerDay, alwaysOnRefresh]);

  return { showSplash, setShowSplash };
}