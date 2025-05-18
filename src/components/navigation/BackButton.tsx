'use client';

import { ArrowLeft } from 'lucide-react';
import { useRouter } from 'next/navigation';

interface BackButtonProps {
  href?: string;
}

export default function BackButton({ href }: BackButtonProps) {
  const router = useRouter();
  
  const handleBack = () => {
    if (href) {
      // Navigate to a specific page with left-to-right animation
      router.push(`${href}?direction=left-to-right`);
    } else {
      // Use browser back functionality
      router.back();
    }
  };
  
  return (
    <button 
      onClick={handleBack}
      className="flex items-center text-[#FF6B6B] p-2"
      aria-label="Go back"
    >
      <ArrowLeft size={24} />
      <span className="ml-1">Back</span>
    </button>
  );
}