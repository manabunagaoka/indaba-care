'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';

export default function RootPage() {
  const router = useRouter();

  useEffect(() => {
    // Check auth status and immediately redirect without delay
    const checkAuthStatus = () => {
      // For now, we'll simulate that user is NOT authenticated
      // In real app, this would check localStorage, cookies, or call an API
      const isAuthenticated = false; // Change this to true to test authenticated flow
      const hasCompletedOnboarding = false; // Change this to true to test onboarding skip
      
      if (isAuthenticated) {
        if (hasCompletedOnboarding) {
          // User is fully set up, go to main app
          router.push('/home');
        } else {
          // User is authenticated but needs to complete profile
          router.push('/onboarding');
        }
      } else {
        // User is not authenticated, go to auth flow
        router.push('/auth');
      }
    };

    // Execute immediately with no delay
    checkAuthStatus();
  }, [router]);

  // Return empty div to avoid flash of content - this will be very brief since we redirect immediately
  return null;
}