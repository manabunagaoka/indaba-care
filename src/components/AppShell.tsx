"use client";

import { useState, useEffect } from 'react';
import { Home, BookOpen, Play, Settings } from 'lucide-react';
import { useRouter, usePathname } from 'next/navigation';

// Define Indaba Care color palette
const COLORS = {
  darkGray: "#4D4D4D",
  coralRed: "#FF6B6B",      // Messages
  brightTeal: "#40BFBF",    // Resources
  sunshineYellow: "#FFD166", // Learning
  hubPurple: "#9B59B6"      // Hub
};

export default function AppShell({ children }) {
  const router = useRouter();
  const pathname = usePathname();
  const [activeTab, setActiveTab] = useState('messages');
  
  // Set initial active tab based on pathname
  useEffect(() => {
    if (pathname?.startsWith('/messages')) setActiveTab('messages');
    else if (pathname?.startsWith('/resources')) setActiveTab('resources');
    else if (pathname?.startsWith('/learning')) setActiveTab('learning');
    else if (pathname?.startsWith('/hub')) setActiveTab('hub');
  }, [pathname]);
  
  // Function to handle tab navigation without animation
  const navigateToTab = (tab) => {
    if (tab === activeTab) return; // Don't navigate if it's the same tab
    
    // Update active tab immediately for UI feedback
    setActiveTab(tab);
    
    // Navigate immediately without animation
    router.push(`/${tab}`);
  };
  
  return (
    <div className="flex flex-col h-screen">
      {/* Content Area */}
      <main className="flex-1 overflow-auto" style={{ paddingBottom: '60px' }}>
        {children}
      </main>
      
      {/* Bottom Navigation - Fixed with properly defined activeTab state */}
      <div className="fixed bottom-0 left-0 right-0 bg-[#4D4D4D] flex w-full shadow-lg z-10">
        {/* Messages Button */}
        <button 
          className="flex flex-col items-center justify-center flex-1 py-3"
          onClick={() => navigateToTab('messages')}
        >
          <Home 
            size={20} 
            style={{ color: activeTab === 'messages' ? COLORS.coralRed : '#d1d5db' }}
          />
          <span 
            style={{ color: activeTab === 'messages' ? 'white' : '#d1d5db' }}
            className="text-xs mt-1"
          >
            Messages
          </span>
        </button>
        
        {/* Resources Button */}
        <button 
          className="flex flex-col items-center justify-center flex-1 py-3"
          onClick={() => navigateToTab('resources')}
        >
          <Play 
            size={20}
            style={{ color: activeTab === 'resources' ? COLORS.brightTeal : '#d1d5db' }}
          />
          <span 
            style={{ color: activeTab === 'resources' ? 'white' : '#d1d5db' }}
            className="text-xs mt-1"
          >
            Resources
          </span>
        </button>
        
        {/* Learning Button */}
        <button 
          className="flex flex-col items-center justify-center flex-1 py-3"
          onClick={() => navigateToTab('learning')}
        >
          <BookOpen 
            size={20}
            style={{ color: activeTab === 'learning' ? COLORS.sunshineYellow : '#d1d5db' }}
          />
          <span 
            style={{ color: activeTab === 'learning' ? 'white' : '#d1d5db' }}
            className="text-xs mt-1"
          >
            Learning
          </span>
        </button>
        
        {/* Hub Button */}
        <button 
          className="flex flex-col items-center justify-center flex-1 py-3"
          onClick={() => navigateToTab('hub')}
        >
          <Settings 
            size={20} 
            style={{ color: activeTab === 'hub' ? COLORS.hubPurple : '#d1d5db' }}
          />
          <span 
            style={{ color: activeTab === 'hub' ? 'white' : '#d1d5db' }}
            className="text-xs mt-1"
          >
            Hub
          </span>
        </button>
      </div>
    </div>
  );
}