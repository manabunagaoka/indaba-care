"use client"

import { ReactNode } from 'react';
import { usePathname } from 'next/navigation';

export default function ResourcesLayout({ children }: { children: ReactNode }) {
  const pathname = usePathname();
  
  return (
    <div className="h-full">
      {/* CSS for the animation - always slide in from right for consistent experience */}
      <style jsx global>{`
        /* Animation for all page transitions */
        @keyframes slideInFromRight {
          from { transform: translateX(100%); }
          to   { transform: translateX(0); }
        }
        
        /* Apply animation to all pages in resources section */
        .resources-page {
          animation: slideInFromRight 0.3s forwards;
        }
      `}</style>
      
      {/* Apply same animation class to all pages */}
      <div className="resources-page">
        {children}
      </div>
    </div>
  );
}