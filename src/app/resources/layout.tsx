'use client';

import { usePathname } from 'next/navigation';
import { useEffect, useState, useRef } from 'react';

export default function ResourcesLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const pathname = usePathname();
  const prevPathnameRef = useRef(pathname);
  const contentRef = useRef(null);
  
  // Handle animations on pathname change
  useEffect(() => {
    // Skip animation for main tab navigation
    if (pathname === '/resources' && sessionStorage.getItem('majorTabSwitch') === 'true') {
      sessionStorage.removeItem('majorTabSwitch');
      return;
    }
    
    const isDetailPage = pathname.split('/').length > 2; // /resources/something
    const wasDetailPage = prevPathnameRef.current.split('/').length > 2;
    
    const container = contentRef.current;
    if (container) {
      // Reset existing animations
      container.classList.remove('slide-in-right', 'slide-in-left');
      
      // Apply the appropriate animation
      requestAnimationFrame(() => {
        if (isDetailPage && !wasDetailPage) {
          // Going deeper - slide from right
          container.classList.add('slide-in-right');
        } else if (!isDetailPage && wasDetailPage) {
          // Going back - slide from left
          container.classList.add('slide-in-left');
        }
      });
    }
    
    // Save the current pathname for the next comparison
    prevPathnameRef.current = pathname;
  }, [pathname]);

  return (
    <div className="resources-layout">
      <div ref={contentRef}>
        {children}
      </div>
    </div>
  );
}
