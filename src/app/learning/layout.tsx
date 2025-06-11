"use client";

import { usePathname, useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import { Home, BookOpen, Play, Settings } from 'lucide-react';

// Last updated: 2025-06-11 22:56:50 by manabunagaoka

// Define Indaba Care color palette
const COLORS = {
  darkGray: "#4D4D4D",
  coralRed: "#FF6B6B",      // Messages
  brightTeal: "#40BFBF",    // Resources
  sunshineYellow: "#FFD166", // Learning
  hubPurple: "#9B59B6"      // Hub
};

export default function LearningLayout({ children }) {
  const router = useRouter();
  const pathname = usePathname();
  const [activeTab, setActiveTab] = useState('learning');
  
  useEffect(() => {
    // Set active tab based on pathname
    if (pathname?.startsWith('/messages')) setActiveTab('messages');
    else if (pathname?.startsWith('/resources')) setActiveTab('resources');
    else if (pathname?.startsWith('/learning')) setActiveTab('learning');
    else if (pathname?.startsWith('/hub')) setActiveTab('hub');
  }, [pathname]);
  
  const navigateToTab = (tab) => {
    setActiveTab(tab);
    
    switch (tab) {
      case 'messages': router.push('/messages'); break;
      case 'resources': router.push('/resources'); break;
      case 'learning': router.push('/learning'); break;
      case 'hub': router.push('/hub'); break;
    }
  };

  return (
    <div className="flex flex-col h-screen max-h-screen overflow-hidden">
      {/* Content Area - With padding at bottom to prevent content being hidden behind nav */}
      <div className="flex-1 overflow-auto pb-16">
        {children}
      </div>
      
      {/* Bottom Navigation - Fixed for Mobile */}
      <div 
        className="bg-[#4D4D4D] flex w-full shadow-lg h-16 border-t border-gray-700"
        style={{
          position: 'fixed',
          bottom: 0,
          left: 0,
          right: 0,
          zIndex: 50
        }}
      >
        {/* Messages Button */}
        <button 
          className="flex flex-col items-center justify-center flex-1 py-3 active:bg-[#3D3D3D]"
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
          className="flex flex-col items-center justify-center flex-1 py-3 active:bg-[#3D3D3D]"
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
          className="flex flex-col items-center justify-center flex-1 py-3 active:bg-[#3D3D3D]"
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
          className="flex flex-col items-center justify-center flex-1 py-3 active:bg-[#3D3D3D]"
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