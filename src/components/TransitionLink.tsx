"use client";

import { ReactNode } from 'react';
import { useRouter } from 'next/navigation';

interface TransitionLinkProps {
  href: string;
  children: ReactNode;
  className?: string;
  direction?: 'forward' | 'back';
}

export default function TransitionLink({ 
  href, 
  children, 
  className = "", 
  direction = "forward"
}: TransitionLinkProps) {
  const router = useRouter();
  
  const handleClick = (e: React.MouseEvent) => {
    e.preventDefault();
    
    // Set direction for the animation
    localStorage.setItem('pageTransitionDirection', direction);
    
    // Navigate to the target page
    router.push(href);
  };
  
  return (
    <a 
      href={href}
      onClick={handleClick}
      className={className}
    >
      {children}
    </a>
  );
}