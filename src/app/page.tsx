'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';

export default function RootPage() {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Simulate checking authentication status
    const checkAuthStatus = () => {
      // For now, we'll simulate that user is NOT authenticated
      // In real app, this would check localStorage, cookies, or call an API
      const isAuthenticated = false; // Change this to true to test authenticated flow
      const hasCompletedOnboarding = false; // Change this to true to test onboarding skip
      
      // Add a small delay to show loading state
      setTimeout(() => {
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
        setIsLoading(false);
      }, 1000); // 1 second delay for better UX
    };

    checkAuthStatus();
  }, [router]);

  // Show loading screen while determining where to redirect
  if (isLoading) {
    return (
      <div className="fixed inset-0 flex flex-col items-center justify-center bg-white">
        <div className="flex flex-col items-center animate-pulse">
          {/* Logo */}
          <div className="mb-6">
            <div className="w-24 h-24 bg-[#FF6B6B] rounded-full flex items-center justify-center">
              <span className="text-white text-3xl font-bold">IC</span>
            </div>
          </div>
          
          <h1 className="text-3xl font-bold text-[#4D4D4D] mb-2">
            Indaba Care
          </h1>
          
          <p className="text-[#FF6B6B] text-lg mb-8">
            Transforming Childcare, Together.
          </p>
          
          {/* Loading indicator */}
          <div className="w-16 h-1 bg-gray-200 rounded-full overflow-hidden">
            <div className="h-full bg-[#FF6B6B] animate-loading-bar"></div>
          </div>
          
          <p className="text-[#4D4D4D] text-sm mt-4 opacity-70">
            Loading your experience...
          </p>
        </div>
        
        <style jsx>{`
          @keyframes loading-bar {
            0% { width: 0%; }
            50% { width: 70%; }
            100% { width: 100%; }
          }
          
          .animate-loading-bar {
            animation: loading-bar 2s ease-in-out infinite;
          }
        `}</style>
      </div>
    );
  }

  // This should rarely be seen since we redirect immediately
  return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-[#FF6B6B]"></div>
    </div>
  );
}