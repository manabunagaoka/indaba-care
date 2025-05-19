'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { ReactNode } from 'react';
import { MAJOR_TABS } from '../../lib/constants';

interface NavigationLinkProps {
  href: string;
  children: ReactNode;
  className?: string;
  onClick?: () => void;
}

export default function NavigationLink({ 
  href, 
  children, 
  className = '',
  onClick
}: NavigationLinkProps) {
  const pathname = usePathname();
  
  // Determine if this link would be a "back" navigation
  const isBackNavigation = pathname.includes(href) && pathname !== href;
  
  // Check if it's a major tab switch
  const currentBase = `/${pathname.split('/')[1]}`;
  const targetBase = `/${href.split('/')[1]}`;
  const isMajorTabSwitch = 
    (currentBase !== targetBase) && 
    MAJOR_TABS.includes(currentBase) && 
    MAJOR_TABS.includes(targetBase);
  
  const handleClick = (e: React.MouseEvent) => {
    // Store navigation info in sessionStorage
    sessionStorage.setItem('navigationDirection', isBackNavigation ? 'back' : 'forward');
    sessionStorage.setItem('majorTabSwitch', isMajorTabSwitch ? 'true' : 'false');
    
    // Call the provided onClick handler if it exists
    if (onClick) onClick();
  };
  
  return (
    <Link 
      href={href}
      className={className}
      onClick={handleClick}
    >
      {children}
    </Link>
  );
}
