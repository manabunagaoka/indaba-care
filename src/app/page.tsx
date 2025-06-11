'use client';

import { useRouter } from 'next/navigation';
import { useEffect } from 'react';

export default function HomePage() {
  const router = useRouter();
  
  useEffect(() => {
    // Redirect to auth page
    router.push('/auth');
  }, [router]);
  
  // Simple blank page that just redirects
  return <div className="min-h-screen bg-gray-50"></div>;
}